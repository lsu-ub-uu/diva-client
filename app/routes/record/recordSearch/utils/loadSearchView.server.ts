import type { Auth } from '@/auth/Auth';
import type {
  BFFMember,
  BFFRecordType,
  Dependencies,
} from '@/cora/bffTypes.server';
import { externalCoraApiUrl } from '@/cora/helper.server';
import { createCoraSearchQuery } from '@/data/searchRecords.server';
import type { TFunction } from 'i18next';
import {
  createActiveFilters,
  type ActiveFilter,
} from './createActiveFilters.server';
import {
  createSearchFormDefinition,
  type SearchFormDefinition,
} from './createSearchFormDefinition.server';
import { createSearchQuery } from './createSearchQuery.server';
import { getPublicSearchForRecordType as getSearchForRecordType } from './getPublicSearchForRecordType';
import {
  performSearch,
  type PerformSearchResult,
} from './performSearch.server';
import { validateSearchFormData } from './validateSearchFormData.server';

interface LoadSearchViewParams {
  dependencies: Dependencies;
  recordType: BFFRecordType;
  searchParams: URLSearchParams;
  auth: Auth | undefined;
  language: 'en' | 'sv';
  member: BFFMember | undefined;
  t: TFunction;
}

export interface SearchView {
  searchFormDefinition: SearchFormDefinition;
  searchId: string;
  query: string;
  start: number;
  rows: number;
  searchResults: PerformSearchResult;
  activeFilters: ActiveFilter[];
  validationErrors: Map<string, string>;
  apiUrl: string;
}

export const loadSearchView = async ({
  dependencies,
  recordType,
  searchParams,
  auth,
  language,
  member,
  t,
}: LoadSearchViewParams): Promise<SearchView | undefined> => {
  const search = getSearchForRecordType(dependencies, recordType, auth);

  if (!search) {
    return undefined;
  }

  const searchFormDefinition = createSearchFormDefinition(search, dependencies);

  const q = searchParams.get('q') ?? '';
  const start = Number(searchParams.get('start')) || 1;
  const rows = Number(searchParams.get('rows')) || 20;

  const activeFilters = await createActiveFilters(
    searchFormDefinition,
    searchParams,
    dependencies,
    auth,
    language,
  );

  const validationErrors = validateSearchFormData(
    q,
    activeFilters,
    searchFormDefinition,
  );

  const searchQuery = createSearchQuery(
    searchFormDefinition,
    q,
    member,
    activeFilters,
    start,
    rows,
  );

  const searchResults: PerformSearchResult =
    validationErrors.size === 0
      ? await performSearch({
          dependencies,
          searchId: search.id,
          searchQuery,
          auth,
          decorated: recordType.id === 'diva-output',
          t,
        })
      : {
          data: [],
          fromNo: 0,
          toNo: 0,
          totalNo: 0,
          containDataOfType: 'mixed',
        };

  const apiUrl =
    searchQuery &&
    encodeURI(
      externalCoraApiUrl(
        `/record/searchResult/${recordType.searchId}?searchData=${JSON.stringify(createCoraSearchQuery(dependencies, dependencies.searchPool.get(search.id), searchQuery))}`,
      ),
    );

  return {
    searchFormDefinition,
    searchId: search.id,
    query: q,
    start,
    rows,
    searchResults,
    activeFilters,
    validationErrors,
    apiUrl,
  };
};
