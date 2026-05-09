import type { Dependencies } from '@/cora/bffTypes.server';
import type { SearchFormDefinition } from './createSearchFormDefinition.server';
import type { Auth } from '@/auth/Auth';
import type {
  AutocompleteFilter,
  FilterDefinition,
} from './createFilterDefinition.server';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import { get } from 'lodash-es';

export interface ActiveFilter {
  name: string;
  value: string;
  textId: string;
  valueTextId?: string;
}

export const createActiveFilters = async (
  searchFormDefinition: SearchFormDefinition,
  searchParams: URLSearchParams,
  dependencies: Dependencies,
  auth: Auth | undefined,
  language: 'sv' | 'en',
) => {
  return await Promise.all(
    searchFormDefinition.filters.map((filter) =>
      createActiveFilter(filter, searchParams, dependencies, auth, language),
    ),
  ).then((results) => results.filter(Boolean) as ActiveFilter[]);
};

const createActiveFilter = async (
  filter: FilterDefinition,
  searchParams: URLSearchParams,
  dependencies: Dependencies,
  auth: Auth | undefined,
  language: 'sv' | 'en',
): Promise<ActiveFilter | undefined> => {
  const value = searchParams.get(filter.name);
  if (!value || value.trim() === '') {
    return undefined;
  }
  return {
    name: filter.name,
    value: value,
    textId: filter.textId,
    valueTextId:
      filter.type === 'collection'
        ? filter.options.find((o) => o.value === value)?.text
        : filter.type === 'autocomplete'
          ? await getValueTextForAutocompleteFilter(
              value,
              filter,
              auth,
              dependencies,
              language,
            )
          : value,
  };
};

const getValueTextForAutocompleteFilter = async (
  value: string,
  filter: AutocompleteFilter,
  auth: Auth | undefined,
  dependencies: Dependencies,
  language: 'sv' | 'en',
) => {
  const [recordType, recordId] = value.split('_');
  if (!recordType || !recordId) {
    return value;
  }
  try {
    const record = await getRecordByRecordTypeAndRecordId({
      dependencies,
      recordType,
      mode: 'view',
      authToken: auth?.data.token,
      recordId,
    });

    return get(record.data, filter.presentationPath[language]);
  } catch {
    return value;
  }
};
