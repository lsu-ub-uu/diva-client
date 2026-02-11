import type { BFFMember } from '@/cora/transform/bffTypes.server';
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
          recordIdSearchTerm: { value: '**' },
          trashBinSearchTerm: { value: 'false' },
          permissionUnitSearchTerm: {
            value: member?.memberPermissionUnit
              ? `permissionUnit_${member?.memberPermissionUnit}`
              : '',
          },
          [searchFormDefinition.mainSearchTerm.nameInData]: {
            value: q || '**',
          },
          ...activeFilters.reduce((acc, filter) => {
            return { ...acc, [filter.name]: { value: filter.value } };
          }, {}),
        },
      },
      start: { value: start.toString() },
      rows: { value: rows.toString() },
    },
  };
};
