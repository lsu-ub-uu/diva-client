import type { ActiveFilter } from './createActiveFilters.server';
import type { SearchFormDefinition } from './createSearchFormDefinition.server';

export const validateSearchFormData = (
  q: string,
  activeFilters: ActiveFilter[],
  searchFormDefinition: SearchFormDefinition,
): Map<string, string> => {
  const errors: Map<string, string> = new Map();
  if (!validateRegex(q, searchFormDefinition.mainSearchTerm.regEx)) {
    errors.set(
      searchFormDefinition.mainSearchTerm.nameInData,
      'divaClient_invalidSearchTermText',
    );
  }
  if (activeFilters.length > 0) {
    activeFilters.forEach((filter) => {
      const filterDef = searchFormDefinition.filters.find(
        (f) => f.name === filter.name,
      );
      if (filterDef && filterDef.type === 'text') {
        if (!validateRegex(filter.value, filterDef.regEx)) {
          errors.set(filter.name, 'divaClient_invalidFilterValueText');
        }
      }
    });
  }
  return errors;
};

const validateRegex = (value: string, regEx: string) => {
  if (!value) {
    return true;
  }

  return value.match(new RegExp(regEx));
};
