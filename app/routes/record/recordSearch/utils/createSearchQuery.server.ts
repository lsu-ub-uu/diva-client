import type { BFFMember } from '@/cora/bffTypes.server';
import type { SearchFormDefinition } from '@/routes/record/recordSearch/utils/createSearchFormDefinition.server';
import type { ActiveFilter } from './createActiveFilters.server';

export const createSearchQuery = (
  searchFormDefinition: SearchFormDefinition,
  q: string,
  member: BFFMember | undefined,
  activeFilters: ActiveFilter[],
  start: number,
  rows: number,
) => {
  return {
    [searchFormDefinition.searchRootName]: {
      include: {
        includePart: {
          visibilitySearchTerm: { value: 'published' },
          permissionUnitLinkedRecordIdSearchTerm: {
            value: member?.memberPermissionUnit
              ? `permissionUnit_${member?.memberPermissionUnit}`
              : '',
          },
          [searchFormDefinition.mainSearchTerm.nameInData]: {
            value: q || '**',
          },
          ...activeFilters.reduce((acc, filter) => {
            const filterDef = searchFormDefinition.filters.find(
              (f) => f.name === filter.name,
            );
            const value =
              filterDef && filterDef?.repeat.repeatMax > 1
                ? [{ value: filter.value }]
                : { value: filter.value };

            return { ...acc, [filter.name]: value };
          }, {}),
        },
      },
      start: { value: start.toString() },
      rows: { value: rows.toString() },
    },
  };
};
