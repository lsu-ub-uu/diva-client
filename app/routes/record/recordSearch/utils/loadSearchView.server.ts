import type {
  BFFMember,
  BFFRecordType,
  Dependencies,
} from '@/cora/bffTypes.server';
import { createActiveFilters } from './createActiveFilters.server';
import type { TFunction } from 'i18next';
import type { Auth } from '@/auth/Auth';
import { getSearchIdForRecordType } from './getSearchIdForRecorrdType.server';
import { createSearchFormDefinition } from './createSearchFormDefinition.server';
import { validateSearchFormData } from './validateSearchFormData.server';
import { createSearchQuery } from './createSearchQuery.server';
import { performSearch } from './performSearch.server';
import { externalCoraApiUrl } from '@/cora/helper.server';
import { createCoraSearchQuery } from '@/data/searchRecords.server';

interface LoadSearchViewParams {
  dependencies: Dependencies;
  recordType: BFFRecordType;
  searchParams: URLSearchParams;
  auth: Auth | undefined;
  language: 'en' | 'sv';
  member: BFFMember | undefined;
  t: TFunction;
}

export const loadSearchView = async ({
  dependencies,
  recordType,
  searchParams,
  auth,
  language,
  member,
  t,
}: LoadSearchViewParams) => {
  const searchId = getSearchIdForRecordType(recordType, auth);
  const searchFormDefinition = createSearchFormDefinition(
    searchId,
    dependencies,
  );

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

  const searchResults =
    validationErrors.size === 0
      ? await performSearch({
          dependencies,
          searchId,
          searchQuery,
          auth,
          decorated: recordType.id === 'diva-output',
          t,
        })
      : {
          data: [],
          total: 0,
        };

  const apiUrl =
    searchQuery &&
    encodeURI(
      externalCoraApiUrl(
        `/record/searchResult/${recordType.searchId}?searchData=${JSON.stringify(createCoraSearchQuery(dependencies, dependencies.searchPool.get(searchId), searchQuery))}`,
      ),
    );

  return {
    searchFormDefinition,
    searchId,
    query: q,
    start,
    rows,
    searchResults,
    activeFilters,
    validationErrors,
    apiUrl,
  };
};
