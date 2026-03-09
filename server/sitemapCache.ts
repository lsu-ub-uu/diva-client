import { extractLinkedRecordIdFromNamedRecordLink } from '@/cora/cora-data/CoraDataTransforms.server';
import { getFirstDataGroupWithNameInData } from '@/cora/cora-data/CoraDataUtils.server';
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import type { DataListWrapper } from '@/cora/cora-data/types.server';
import { getSearchResultDataListBySearchType } from '@/cora/getSearchResultDataListBySearchType.server';

/** A map from permissionUnitId map from record id to entry. */
const cache = new Map<string, Map<string, SitemapEntry>>();

const SEARCH_ROWS = 1000;

export const populateCache = async () => {
  console.info('Populating sitemap cache');
  let moreData = true;
  let start = 1;
  while (moreData) {
    console.log(`Fetching data for sitemap cache, start=${start}`);
    const searchResponse =
      await getSearchResultDataListBySearchType<DataListWrapper>(
        'diva-outputSearch',
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
                      name: 'recordIdSearchTerm',
                      value: '**',
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

    console.log('number of results', searchResponse.data.dataList.data.length);
    if (searchResponse.data.dataList.data.length < SEARCH_ROWS - 1) {
      console.log('got all data!!!');
      moreData = false;
    } else {
      start += SEARCH_ROWS - 1;
      console.log('getting more data, start=', start);
    }
    console.log('totalNo', searchResponse.data.dataList.totalNo);
    console.log('toNo', searchResponse.data.dataList.toNo);
  }
  console.info('Finished populating sitemap cache');
};

export const getEntries = (
  from: number,
  entries: number,
  permissionUnit?: string,
): SitemapEntry[] => {
  if (!permissionUnit) {
    return Array.from(cache.values())
      .flatMap((map) => Array.from(map.values()))
      .slice(from, from + entries);
  }
  return Array.from(cache.get(permissionUnit)?.values() ?? []).slice(
    from,
    from + entries,
  );
};

export interface SitemapEntry {
  id: string;
  tsUpdated: string;
  permissionUnit: string;
}

export const transformSearchResults = (
  divaOutputSearchResults: DataListWrapper,
): SitemapEntry[] => {
  return divaOutputSearchResults.dataList.data.map((recordWrapper) => {
    const data = recordWrapper.record.data;

    const recordInfo = getFirstDataGroupWithNameInData(data, 'recordInfo');
    const id = getFirstDataAtomicValueWithNameInData(recordInfo, 'id');
    const updated = getFirstDataGroupWithNameInData(recordInfo, 'updated');
    const tsUpdated = getFirstDataAtomicValueWithNameInData(
      updated,
      'tsUpdated',
    );
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
  });
};

/*
 cache: { "nordiskamuseet": { "1": { id: "1", tsupdated: "123" }, "2": { id: "2", updated: "124" }}}
  populateSitemap: Promise<void>
    sök diva-output id ** rows=1000
    transformSearchResults -
    > transform to sitemap entries
    put in cache based on permissionUnit
    while more data to get, repeat

handleDataChanged(DataChangeEvent): void
  if delete -> delete from cache
  if create or update
    fetch record
    transform to entry
    cache[permissionUnit][id] = entry

getNumberOfEntries(permissionUnit?: string): int
  cache[persmissionUnit].values().size()

getEntries(start: int, numberOfEntries: int, permissionUnit?: string): { entries: SitemapEntry[] }
  cache[permissionUnit].value()



 /sitemap-index.xml
    get permission unit from url
    pages = cache.getNumberOfEntries(permissionUnit) / 10000
    construct xml 
  
 /sitemap-base.xml
    hårdkodad xml


 /sitemap-records-{page}.xml.gz
    get permission unit from url
    entries = cache.getEntries(start=page * 10000 - 1, 10000, permissionUnit)
    construct xml
    return zip
*/
