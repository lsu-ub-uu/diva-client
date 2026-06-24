import type {
  BFFMetadataGroup,
  BFFMetadataTextVariable,
  BFFSearch,
} from '@/cora/bffTypes.server';
import {
  createFilters,
  type FilterDefinition,
} from './createFilterDefinition.server';
import type { Dependencies } from '@/cora/bffTypes.server';

export interface SearchFormDefinition {
  searchRootName: string;
  mainSearchTerm: BFFMetadataTextVariable;
  filters: FilterDefinition[];
}

export const createSearchFormDefinition = (
  search: BFFSearch,
  dependencies: Dependencies,
): SearchFormDefinition => {
  const searchMetadata = dependencies.metadataPool.get(
    search.metadataId,
  ) as BFFMetadataGroup;
  const includeGroup = dependencies.metadataPool.get(
    searchMetadata.children[0].childId,
  ) as BFFMetadataGroup;
  const includePartGroup = dependencies.metadataPool.get(
    includeGroup.children[0].childId,
  ) as BFFMetadataGroup;

  const mainSearchTerm = dependencies.metadataPool.get(
    includePartGroup.children[0].childId,
  ) as BFFMetadataTextVariable;

  const filterSearchTermRefs = includePartGroup.children.slice(1);

  return {
    searchRootName: searchMetadata.nameInData,
    mainSearchTerm,
    filters: createFilters(filterSearchTermRefs, dependencies),
  };
};
