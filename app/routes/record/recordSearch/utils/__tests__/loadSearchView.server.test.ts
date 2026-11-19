import type {
  BFFMetadataGroup,
  BFFMetadataTextVariable,
  BFFPresentation,
  BFFPresentationGroup,
  BFFPresentationTextVar,
  BFFRecordType,
  BFFSearch,
  Dependencies,
} from '@/cora/bffTypes.server';
import type { TFunction } from 'i18next';
import { listToPool } from 'server/dependencies/util/listToPool';
import { describe, expect, it, vi } from 'vitest';
import { loadSearchView } from '../loadSearchView.server';
import { performSearch } from '../performSearch.server';

vi.mock('../performSearch.server');

describe('loadSearchView', () => {
  it('loads search view for without search params', async () => {
    const mockSearchResult = {
      data: [],
      fromNo: 0,
      toNo: 0,
      totalNo: 0,
      containDataOfType: 'mixed',
      alert: undefined,
    };
    vi.mocked(performSearch).mockResolvedValue(mockSearchResult);
    vi.stubEnv('CORA_EXTERNAL_SYSTEM_URL', 'https://cora.example.com');
    const dependencies = createMockDependencies();

    const recordType = {
      id: 'someRecordTypeId',
      searchId: 'someSearchId',
    } as BFFRecordType;
    const searchParams = new URLSearchParams();
    const auth = undefined;
    const language = 'sv';
    const member = undefined;
    const t = ((key: string) => key) as TFunction;

    const searchView = await loadSearchView({
      dependencies,
      recordType,
      searchParams,
      auth,
      language,
      member,
      t,
    });
    expect(searchView).toBeDefined();
    const {
      searchFormDefinition,
      searchId,
      query,
      start,
      rows,
      searchResults,
      activeFilters,
      validationErrors,
      apiUrl,
    } = searchView!;

    expect(searchFormDefinition.searchRootName).toBe('searchRoot');
    expect(searchFormDefinition.mainSearchTerm.name).toBe(
      'mainSearchTerm',
    );
    expect(searchFormDefinition.filters.length).toBe(2);
    expect(searchFormDefinition.filters[0].name).toBe('filter1');
    expect(searchFormDefinition.filters[1].name).toBe('filter2');
    expect(searchId).toBe('someSearchId');
    expect(query).toBe('');
    expect(start).toBe(1);
    expect(rows).toBe(20);
    expect(searchResults).toEqual(mockSearchResult);
    expect(activeFilters).toEqual([]);
    expect(validationErrors.size).toBe(0);
    expect(apiUrl).toBe(
      'https://cora.example.com/rest/record/searchResult/someSearchId?searchData=%7B%22name%22:%22searchRoot%22,%22children%22:%5B%5D%7D',
    );
  });

  it('loads search view with search params', async () => {
    const mockSearchResult = {
      data: [],
      fromNo: 0,
      toNo: 0,
      totalNo: 0,
      containDataOfType: 'mixed',
      alert: undefined,
    };
    vi.mocked(performSearch).mockResolvedValue(mockSearchResult);
    vi.stubEnv('CORA_EXTERNAL_SYSTEM_URL', 'https://cora.example.com');
    const dependencies = createMockDependencies();

    const recordType = {
      id: 'someRecordTypeId',
      searchId: 'someSearchId',
    } as BFFRecordType;
    const searchParams = new URLSearchParams();
    searchParams.set('q', 'test');
    searchParams.set('start', '5');
    searchParams.set('rows', '10');
    searchParams.set('filter1', 'value1');
    searchParams.set('filter2', 'value2');
    const auth = undefined;
    const language = 'sv';
    const member = undefined;
    const t = ((key: string) => key) as TFunction;

    const searchView = await loadSearchView({
      dependencies,
      recordType,
      searchParams,
      auth,
      language,
      member,
      t,
    });

    expect(searchView).toBeDefined();

    const {
      searchFormDefinition,
      searchId,
      query,
      start,
      rows,
      searchResults,
      activeFilters,
      validationErrors,
      apiUrl,
    } = searchView!;

    expect(searchFormDefinition.searchRootName).toBe('searchRoot');
    expect(searchFormDefinition.mainSearchTerm.name).toBe(
      'mainSearchTerm',
    );
    expect(searchFormDefinition.filters.length).toBe(2);
    expect(searchFormDefinition.filters[0].name).toBe('filter1');
    expect(searchFormDefinition.filters[1].name).toBe('filter2');
    expect(searchId).toBe('someSearchId');
    expect(query).toBe('test');
    expect(start).toBe(5);
    expect(rows).toBe(10);
    expect(searchResults).toEqual(mockSearchResult);
    expect(activeFilters).toEqual([
      {
        name: 'filter1',
        textId: 'filter1TextId',
        value: 'value1',
        valueTextId: 'value1',
      },
      {
        name: 'filter2',
        textId: 'filter2TextId',
        value: 'value2',
        valueTextId: 'value2',
      },
    ]);
    expect(validationErrors.size).toBe(0);
    expect(apiUrl).toBe(
      'https://cora.example.com/rest/record/searchResult/someSearchId?searchData=%7B%22name%22:%22searchRoot%22,%22children%22:%5B%5D%7D',
    );
  });

  it('loads search view when validation errors', async () => {
    const mockSearchResult = {
      data: [],
      fromNo: 0,
      toNo: 0,
      totalNo: 0,
      containDataOfType: 'mixed',
      alert: undefined,
    };
    vi.mocked(performSearch).mockResolvedValue(mockSearchResult);
    vi.stubEnv('CORA_EXTERNAL_SYSTEM_URL', 'https://cora.example.com');
    const dependencies = createMockDependencies();

    const recordType = {
      id: 'someRecordTypeId',
      searchId: 'someSearchId',
    } as BFFRecordType;
    const searchParams = new URLSearchParams();
    searchParams.set('q', 'invalid$$$$');
    const auth = undefined;
    const language = 'sv';
    const member = undefined;
    const t = ((key: string) => key) as TFunction;

    const searchView = await loadSearchView({
      dependencies,
      recordType,
      searchParams,
      auth,
      language,
      member,
      t,
    });

    expect(searchView).toBeDefined();
    const {
      searchFormDefinition,
      searchId,
      query,
      searchResults,
      validationErrors,
    } = searchView!;

    expect(searchFormDefinition.searchRootName).toBe('searchRoot');
    expect(searchFormDefinition.mainSearchTerm.name).toBe(
      'mainSearchTerm',
    );

    expect(searchId).toBe('someSearchId');
    expect(query).toBe('invalid$$$$');
    expect(vi.mocked(performSearch)).not.toHaveBeenCalled();
    expect(searchResults).toEqual({
      data: [],
      fromNo: 0,
      toNo: 0,
      totalNo: 0,
      containDataOfType: 'mixed',
    });
    expect(validationErrors.size).toBe(1);
  });

  it('returns undefined when record type has no searchId', async () => {
    const dependencies = createMockDependencies();

    const recordType = {
      id: 'someRecordTypeId',
      searchId: undefined,
    } as BFFRecordType;
    const searchParams = new URLSearchParams();
    const auth = undefined;
    const language = 'sv';
    const member = undefined;
    const t = ((key: string) => key) as TFunction;

    const searchView = await loadSearchView({
      dependencies,
      recordType,
      searchParams,
      auth,
      language,
      member,
      t,
    });

    expect(searchView).toBeUndefined();
  });

  it('returns undefined when searchGroup is not public search', async () => {
    const dependencies = createMockDependencies('autocomplete');
    const recordType = {
      id: 'someRecordTypeId',
      searchId: 'someSearchId',
    } as BFFRecordType;
    const searchParams = new URLSearchParams();
    const auth = undefined;
    const language = 'sv';
    const member = undefined;
    const t = ((key: string) => key) as TFunction;

    const searchView = await loadSearchView({
      dependencies,
      recordType,
      searchParams,
      auth,
      language,
      member,
      t,
    });

    expect(searchView).toBeUndefined();
  });
});

const createMockDependencies = (
  searchGroup: BFFSearch['searchGroup'] = 'publicSearch',
): Dependencies => {
  return {
    searchPool: listToPool([
      {
        id: 'someSearchId',
        metadataId: 'someSearchRootGroupId',
        presentationId: 'someSearchPresentationId',
        searchGroup,
      } as BFFSearch,
    ]),
    metadataPool: listToPool([
      {
        id: 'someSearchRootGroupId',
        nameInData: 'searchRoot',
        children: [{ childId: 'someIncludeGroupId' }],
      } as BFFMetadataGroup,
      {
        id: 'someIncludeGroupId',
        children: [{ childId: 'someIncludePartGroupId' }],
      } as BFFMetadataGroup,
      {
        id: 'someIncludePartGroupId',
        children: [
          { childId: 'someMainSearchTermId', repeatMin: '0', repeatMax: '1' },
          { childId: 'someFilter1Id', repeatMin: '0', repeatMax: '1' },
          { childId: 'someFilter2Id', repeatMin: '0', repeatMax: '1' },
        ],
      } as BFFMetadataGroup,
      {
        id: 'someMainSearchTermId',
        nameInData: 'mainSearchTerm',
        type: 'textVariable',
        textId: 'mainSearchTermTextId',
        regEx: '^[A-z0-9]+$',
      } as BFFMetadataTextVariable,
      {
        id: 'someFilter1Id',
        nameInData: 'filter1',
        type: 'textVariable',
        textId: 'filter1TextId',
      } as BFFMetadataTextVariable,
      {
        id: 'someFilter2Id',
        nameInData: 'filter2',
        type: 'textVariable',
        textId: 'filter2TextId',
      } as BFFMetadataTextVariable,
    ]),
    presentationPool: listToPool<BFFPresentation>([
      {
        id: 'someSearchPresentationId',
        type: 'pGroup',
        presentationOf: 'someSearchRootGroupId',
        mode: 'input',
        children: [
          {
            refGroups: [{ childId: 'someIncludePresentationId', type: 'presentation' }],
          },
        ],
      } as BFFPresentationGroup,
      {
        id: 'someIncludePresentationId',
        type: 'pGroup',
        presentationOf: 'someIncludeGroupId',
        mode: 'input',
        children: [
          {
            refGroups: [{ childId: 'someIncludePartPresentationId', type: 'presentation' }],
          },
        ],
      } as BFFPresentationGroup,
      {
        id: 'someIncludePartPresentationId',
        type: 'pGroup',
        presentationOf: 'someIncludePartGroupId',
        mode: 'input',
        children: [
          {
            refGroups: [{ childId: 'someMainSearchTermPresentationId', type: 'presentation' }],
          },
          {
            refGroups: [{ childId: 'someFilter1PresentationId', type: 'presentation' }],
          },
          {
            refGroups: [{ childId: 'someFilter2PresentationId', type: 'presentation' }],
          },
        ],
      } as BFFPresentationGroup,
      {
        id: 'someMainSearchTermPresentationId',
        type: 'pVar',
        presentationOf: 'someMainSearchTermId',
        mode: 'input',
        inputType: 'input',
      } as BFFPresentationTextVar,
      {
        id: 'someFilter1PresentationId',
        type: 'pVar',
        presentationOf: 'someFilter1Id',
        mode: 'input',
        inputType: 'input',
      } as BFFPresentationTextVar,
      {
        id: 'someFilter2PresentationId',
        type: 'pVar',
        presentationOf: 'someFilter2Id',
        mode: 'input',
        inputType: 'input',
      } as BFFPresentationTextVar,
    ]),
  } as Dependencies;
};
