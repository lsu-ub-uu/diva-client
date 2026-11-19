import type {
  BFFMetadataGroup,
  BFFPresentationGroup,
  BFFSearch,
  Dependencies
} from '@/cora/bffTypes.server';
import {
  createFilters,
  type FilterDefinition
} from './createFilterDefinition.server';

export interface SearchFormDefinition {
  searchRootName: string;
  mainSearchTerm: FilterDefinition;
  filters: FilterDefinition[];
}

export const createSearchFormDefinition = (
  search: BFFSearch,
  dependencies: Dependencies,
): SearchFormDefinition => {
  const searchMetadata = dependencies.metadataPool.get(
    search.metadataId,
  ) as BFFMetadataGroup;
  const searchPresentation = dependencies.presentationPool.get(
    search.presentationId,
  ) as BFFPresentationGroup;
  const includeGroup = dependencies.metadataPool.get(
    searchMetadata.children[0].childId,
  ) as BFFMetadataGroup;
  const includePartGroup = dependencies.metadataPool.get(
    includeGroup.children[0].childId,
  ) as BFFMetadataGroup;
  const includePGroup = dependencies.presentationPool.get(
    searchPresentation.children[0].refGroups[0].childId,
  ) as BFFPresentationGroup;
  const includePartPGroup = dependencies.presentationPool.get(
    includePGroup.children[0].refGroups[0].childId,
  ) as BFFPresentationGroup;



  const filterDefinition = createFilters(includePartPGroup.children, includePartGroup.children, dependencies);

  return {
    searchRootName: searchMetadata.nameInData,
    mainSearchTerm: filterDefinition[0],
    filters: filterDefinition.slice(1),
  };
};