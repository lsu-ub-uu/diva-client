import { extractLinkedRecordIdFromNamedRecordLink } from '@/cora/cora-data/CoraDataTransforms.server';
import { getFirstDataGroupWithNameInData } from '@/cora/cora-data/CoraDataUtils.server';
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import type {
  DataListWrapper,
  RecordWrapper,
} from '@/cora/cora-data/types.server';
import { getSearchResultDataListBySearchType } from '@/cora/getSearchResultDataListBySearchType.server';
import type { DataChangedEvent } from './listenForDataChange';
import { getRecordDataById } from '@/cora/getRecordDataById.server';
import { log } from '@/logging/logger';

/** A map from permissionUnitId map from record id to entry. */
const cache = new Map<string, Map<string, SitemapEntry>>();
let cacheState: 'cold' | 'warming' | 'ready' = 'cold';
const eventBuffer = new Map<string, DataChangedEvent>();

const SEARCH_ROWS = 1000;

export interface SitemapEntry {
  id: string;
  tsUpdated: string;
  permissionUnit: string;
}

export interface GetEntriesParams {
  from?: number;
  entries?: number;
  permissionUnit?: string;
}

export const populateCache = async () => {
  log.info('Populating sitemap cache');
  cacheState = 'warming';
  await searchSitemapEntries();
  for (const event of eventBuffer.values()) {
    await applyDataChangeEvent(event);
  }
  eventBuffer.clear();
  cacheState = 'ready';
  log.info('Finished populating sitemap cache');
};

export const getEntries = ({
  from = 0,
  entries,
  permissionUnit,
}: GetEntriesParams = {}): SitemapEntry[] => {
  const sitemapEntries = permissionUnit
    ? getSitemapEntriesForPermissionUnit(permissionUnit)
    : getAllSitemapEntries();

  if (entries) {
    return sitemapEntries.slice(from, from + entries);
  }

  return sitemapEntries.slice(from);
};

export const handleDataChanged = async (event: DataChangedEvent) => {
  const { id, type } = event;

  if (cacheState !== 'ready') {
    eventBuffer.set(`${type}-${id}`, event);
  } else {
    applyDataChangeEvent(event);
  }
};

const searchSitemapEntries = async () => {
  let moreData = true;
  let start = 1;
  while (moreData) {
    const searchResponse =
      await getSearchResultDataListBySearchType<DataListWrapper>(
        'outputPublicSearch',
        {
          name: 'search',
          children: [
            {
              name: 'include',
              children: [
                {
                  name: 'includePart',
                  children: [
                    {
                      name: 'visibilitySearchTerm',
                      value: 'published',
                    },
                  ],
                },
              ],
            },
            { name: 'start', value: start.toString() },
            { name: 'rows', value: SEARCH_ROWS.toString() },
          ],
        },
      );
    const transformedSearchResult = transformSearchResults(searchResponse.data);
    transformedSearchResult.forEach((entry) => {
      if (!cache.has(entry.permissionUnit)) {
        cache.set(entry.permissionUnit, new Map());
      }
      cache.get(entry.permissionUnit)!.set(entry.id, entry);
    });

    if (searchResponse.data.dataList.data.length < SEARCH_ROWS - 1) {
      moreData = false;
    } else {
      start += SEARCH_ROWS - 1;
    }
  }
};

export const transformSearchResults = (
  divaOutputSearchResults: DataListWrapper,
): SitemapEntry[] => {
  return divaOutputSearchResults.dataList.data.map(
    transformRecordToSitemapEntry,
  );
};

const getSitemapEntriesForPermissionUnit = (permissionUnitId: string) => {
  const entries = cache.get(permissionUnitId);

  if (!entries) {
    return [];
  }

  return Array.from(entries.values());
};

const getAllSitemapEntries = () => {
  return Array.from(cache.values()).flatMap((map) => Array.from(map.values()));
};

const transformRecordToSitemapEntry = (
  recordWrapper: RecordWrapper,
): SitemapEntry => {
  const data = recordWrapper.record.data;

  const recordInfo = getFirstDataGroupWithNameInData(data, 'recordInfo');
  const id = getFirstDataAtomicValueWithNameInData(recordInfo, 'id');
  const updated = getFirstDataGroupWithNameInData(recordInfo, 'updated');
  const tsUpdated = getFirstDataAtomicValueWithNameInData(updated, 'tsUpdated');
  const isoDate = new Date(tsUpdated).toISOString();

  const permissionUnitId = extractLinkedRecordIdFromNamedRecordLink(
    recordInfo,
    'permissionUnit',
  );

  return {
    id,
    tsUpdated: isoDate,
    permissionUnit: permissionUnitId,
  };
};

const applyDataChangeEvent = async ({ id, type, action }: DataChangedEvent) => {
  if (type !== 'diva-output') {
    return;
  }
  switch (action) {
    case 'delete': {
      cache.values().forEach((permissionUnitCache) => {
        permissionUnitCache.delete(id);
      });
      break;
    }
    case 'update':
    case 'create': {
      const recordData = await getRecordDataById<RecordWrapper>(type, id);
      const sitemapEntry = transformRecordToSitemapEntry(recordData.data);

      let permissionUnitCache = cache.get(sitemapEntry.permissionUnit);
      if (!permissionUnitCache) {
        permissionUnitCache = new Map();
        cache.set(sitemapEntry.permissionUnit, permissionUnitCache);
      }
      permissionUnitCache.set(id, sitemapEntry);
      break;
    }
  }
};
