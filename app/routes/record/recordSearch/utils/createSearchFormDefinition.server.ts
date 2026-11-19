import type {
  BFFBase,
  BFFMetadataGroup,
  BFFMetadataTextVariable,
  BFFPresentationGroup,
  BFFPresentationTextVar,
  BFFSearch,
} from '@/cora/bffTypes.server';
import {
  createFilter,
  createFilters,
  type FilterDefinition,
  type TextFilter,
} from './createFilterDefinition.server';
import type { Dependencies } from '@/cora/bffTypes.server';

export interface SearchFormDefinition {
  searchRootName: string;
  mainSearchTerm: TextFilter;
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


  const mainSearchTermPVar = includePartPGroup.children.find(pChildRef => {
    const pChild = dependencies.presentationPool.get(pChildRef.refGroups[0].childId);
    return pChild.type === "pVar";
  })

  const mainSearchTermMetadataChildRef = includeGroup.children.find(childRef => {
    const child = dependencies.metadataPool.get(childRef.childId);
    return mainSearchTermPVar
  })


  const mainSearchTermChildRef = includePartGroup.children[0];
  const mainSearchTermMetadata = dependencies.metadataPool.get(
    mainSearchTermChildRef.childId,
  ) as BFFMetadataTextVariable;
  const mainSearchTermPresentation = includePartPGroup.children.find(pChildRef => {
    const pChild = dependencies.presentationPool.get(pChildRef.refGroups[0].childId);
    return "presentationOf" in pChild && pChild.presentationOf === mainSearchTermMetadataChildRef.id
  })

  const filterSearchTermRefs = includePartGroup.children.slice(1);

  return {
    searchRootName: searchMetadata.nameInData,
    mainSearchTerm: createFilter(mainSearchTer),
    filters: createFilters(filterSearchTermRefs, dependencies),
  };
};