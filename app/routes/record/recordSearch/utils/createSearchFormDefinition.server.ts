import type {
  BFFMetadataGroup,
  BFFMetadataTextVariable,
  BFFPresentationGroup,
} from '@/cora/bffTypes.server';
import {
  createFilters,
  type FilterDefinition,
} from './createFilterDefinition.server';
import type { Dependencies } from '@/cora/bffTypes.server';
import {
  createDefinitionFromMetadataGroupAndPresentationGroup,
  createFormDefinition,
} from '@/data/formDefinition/createFormDefinition.server';
import type {
  FormComponentGroup,
  FormComponentTextVar,
} from '@/components/FormGenerator/types';

export interface SearchFormDefinition {
  searchRootName: string;
  mainSearchTerm: FormComponentTextVar;
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
  const searchPresentation = dependencies.presentationPool.get(
    search.presentationId,
  ) as BFFPresentationGroup;

  const formDefinition = createDefinitionFromMetadataGroupAndPresentationGroup(
    dependencies,
    searchMetadata,
    searchPresentation,
  );

  const include = formDefinition.components?.find(
    (c) => c.name === 'include',
  ) as FormComponentGroup;
  const includePart = include.components?.find(
    (c) => c.name === 'includePart',
  ) as FormComponentGroup;

  const includeGroup = dependencies.metadataPool.get(
    searchMetadata.children[0].childId,
  ) as BFFMetadataGroup;
  const includePartGroup = dependencies.metadataPool.get(
    includeGroup.children[0].childId,
  ) as BFFMetadataGroup;

  const mainSearchTerm = includePart.components?.[0] as FormComponentTextVar;

  const filterSearchTermRefs = includePartGroup.children.slice(1);

  return {
    searchRootName: searchMetadata.nameInData,
    mainSearchTerm,
    filters: createFilters(filterSearchTermRefs, dependencies),
  };
};
