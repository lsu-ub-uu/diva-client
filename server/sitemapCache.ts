import { getFirstDataGroupWithNameInData } from '@/cora/cora-data/CoraDataUtils.server';
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import type { DataListWrapper } from '@/cora/cora-data/types.server';
import { getSearchResultDataListBySearchType } from '@/cora/getSearchResultDataListBySearchType.server';

let cache = {};

export const populateCache = async () => {
  const searchResponse = await getSearchResultDataListBySearchType(
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
      ],
    },
  );
  transformSearchResults(searchResponse);
  console.log('search', searchResponse);
};

export const getEntries = (
  from: number,
  entries: number,
  permissionUnit?: string,
): SitemapEntry[] => {
  return [];
};

interface SitemapEntry {
  id: string;
  tsUpdated: string;
}

export const transformSearchResults = async (
  divaOutputSearchResults: DataListWrapper,
): Promise<SitemapEntry[]> => {
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

    return {
      id,
      tsUpdated: isoDate,
    };
  });
};

/*
 cache: { "nordiskamuseet": { "1": { id: "1", tsupdated: "123" }, "2": { id: "2", updated: "124" }}}
  populateSitemap: Promise<void>
    sök diva-output id ** rows=1000
    transformSearchResults -> transform to sitemap entries
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
