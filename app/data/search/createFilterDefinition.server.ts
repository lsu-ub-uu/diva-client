import type {
  BFFMetadata,
  BFFMetadataBase,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataNumberVariable,
  BFFMetadataTextVariable,
} from '@/cora/transform/bffTypes.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { uniqBy } from 'lodash-es';

export type FilterType =
  | TextFilter
  | NumberFilter
  | CollectionFilter
  | AutocompleteFilter;

export interface BaseFilter {
  id: string;
  name: string;
  textId: string;
}

export interface TextFilter extends BaseFilter {
  type: 'text';
  regex: string;
}

export interface NumberFilter extends BaseFilter {
  type: 'number';
  min?: number;
  max?: number;
  warningMin?: number;
  warningMax?: number;
}

export interface CollectionFilter extends BaseFilter {
  type: 'collection';
  options: { text: string; value: string }[];
}

export interface AutocompleteFilter extends BaseFilter {
  type: 'autocomplete';
  searchType: string;
  searchTerm: string;
  presentationPath: {
    sv: string;
    en: string;
  };
}

export const createFilters = (
  searchMetadata: BFFMetadataGroup,
  dependencies: Dependencies,
): FilterType[] => {
  const includeGroup = dependencies.metadataPool.get(
    searchMetadata.children[0].childId,
  ) as BFFMetadataGroup;
  const includePartGroup = dependencies.metadataPool.get(
    includeGroup.children[0].childId,
  ) as BFFMetadataGroup;

  const excludedSearchTerms = ['genericSearchTerm'];
  return includePartGroup.children
    .map((c) => dependencies.metadataPool.get(c.childId))
    .filter((metadata) => !excludedSearchTerms.includes(metadata.nameInData))
    .map((metadata) => createFilter(metadata, dependencies))
    .filter(Boolean) as FilterType[];
};

const createFilter = (
  metadata: BFFMetadata,
  depencencies: Dependencies,
): FilterType | undefined => {
  const commonValues = {
    id: metadata.id,
    name: metadata.nameInData,
    textId: metadata.textId,
  };

  if (metadata.nameInData === 'permissionUnitSearchTerm') {
    const members = uniqBy(
      Array.from(depencencies.memberPool.values()),
      (m) => m.id,
    ).filter((m) => m.id !== 'diva');
    return {
      ...commonValues,
      type: 'collection',
      options: members.map((m) => ({
        text: m.id,
        value: `permissionUnit_${m.id}`,
      })),
    };
  }

  if (metadata.nameInData === 'subjectTopicSearchTerm') {
    return {
      ...commonValues,
      type: 'autocomplete',
      searchType: 'diva-subjectMinimalSearch',
      searchTerm: `search.include.includePart.topicSearchTerm[0].value`,
      presentationPath: {
        sv: 'subject.authority_lang_swe.topic.value',
        en: 'subject.variant_lang_eng.topic.value',
      },
    };
  }

  if (metadata.type === 'textVariable') {
    const textVariable = metadata as BFFMetadataTextVariable;
    return {
      ...commonValues,
      type: 'text',
      regex: textVariable.regEx,
    };
  }

  if (metadata.type === 'numberVariable') {
    const numberVariable = metadata as BFFMetadataNumberVariable;
    return {
      ...commonValues,
      type: 'number',
      min: Number(numberVariable.min),
      max: Number(numberVariable.max),
      warningMin: Number(numberVariable.warningMin),
      warningMax: Number(numberVariable.warningMax),
    };
  }

  if (metadata.type === 'collectionVariable') {
    const collectionVariable = metadata as BFFMetadataCollectionVariable;
    const collection = depencencies.metadataPool.get(
      collectionVariable.refCollection,
    ) as BFFMetadataItemCollection;
    const options = collection.collectionItemReferences.map((itemRef) => {
      const item = depencencies.metadataPool.get(
        itemRef.refCollectionItemId,
      ) as BFFMetadataBase;
      return { text: item.textId, value: item.nameInData };
    });
    return {
      ...commonValues,
      type: 'collection',
      options,
    };
  }

  return undefined;
};
