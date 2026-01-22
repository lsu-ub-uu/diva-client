import type {
  BFFMetadata,
  BFFMetadataBase,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
} from '@/cora/transform/bffTypes.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';

export type FilterDefinition =
  | TextFilter
  | NumberFilter
  | CollectionFilter
  | AutocompleteFilter;

export interface BaseFilter {
  id: string;
  name: string;
  textId: string;
  placeholderTextId: string;
}

export interface TextFilter extends BaseFilter {
  type: 'text';
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
  recordType: string;
  presentationPath: {
    sv: string;
    en: string;
  };
}

const autocompleteSearchTerms: Record<
  string,
  Omit<AutocompleteFilter, keyof BaseFilter | 'type'>
> = {
  subjectTopicSearchTerm: {
    searchType: 'diva-subjectMinimalSearch',
    recordType: 'diva-subject',
    searchTerm: 'search.include.includePart.topicSearchTerm[0].value',
    presentationPath: {
      sv: 'subject.authority_lang_swe.topic.value',
      en: 'subject.variant_lang_eng.topic.value',
    },
  },
  permissionUnitSearchTerm: {
    recordType: 'permissionUnit',
    searchType: 'permissionUnitSearch',
    searchTerm:
      'permissionUnitSearch.include.includePart.permissionUnitIdSearchTerm[0].value',
    presentationPath: {
      sv: 'permissionUnit.recordInfo.id.value',
      en: 'permissionUnit.recordInfo.id.value',
    },
  },
};

export const createFilters = (
  searchMetadata: BFFMetadataGroup,
  dependencies: Dependencies,
): FilterDefinition[] => {
  const includeGroup = dependencies.metadataPool.get(
    searchMetadata.children[0].childId,
  ) as BFFMetadataGroup;
  const includePartGroup = dependencies.metadataPool.get(
    includeGroup.children[0].childId,
  ) as BFFMetadataGroup;

  const filterSearchTerms = includePartGroup.children.slice(1);

  return filterSearchTerms
    .map((c) => dependencies.metadataPool.get(c.childId))
    .map((metadata) => createFilter(metadata, dependencies))
    .filter(Boolean) as FilterDefinition[];
};

const createFilter = (
  metadata: BFFMetadata,
  depencencies: Dependencies,
): FilterDefinition | undefined => {
  const commonValues = {
    id: metadata.id,
    name: metadata.nameInData,
    textId: metadata.textId,
    placeholderTextId: metadata.defTextId,
  };

  if (autocompleteSearchTerms[metadata.nameInData] !== undefined) {
    return {
      ...commonValues,
      ...autocompleteSearchTerms[metadata.nameInData],
      type: 'autocomplete',
    };
  }

  if (metadata.type === 'textVariable') {
    return {
      ...commonValues,
      type: 'text',
    };
  }

  if (metadata.type === 'numberVariable') {
    return {
      ...commonValues,
      type: 'number',
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
