import type {
  BFFMetadataGroup,
  BFFMetadataTextVariable,
} from '@/cora/transform/bffTypes.server';
import {
  createFilters,
  type FilterDefinition,
} from './createFilterDefinition.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';

export interface SearchFormDefinition {
  searchRootName: string;
  mainSearchTerm: BFFMetadataTextVariable;
  filters: FilterDefinition[];
}

export const createSearchFormDefinition = (
  searchId: string,
  dependencies: Dependencies,
): SearchFormDefinition => {
  const search = dependencies.searchPool.get(searchId);
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

  const filterSearchTerms = includePartGroup.children
    .slice(1)
    .map((childRef) => dependencies.metadataPool.get(childRef.childId));

  return {
    searchRootName: searchMetadata.nameInData,
    mainSearchTerm,
    filters: createFilters(filterSearchTerms, dependencies),
  };
};
