import type {
  BFFMetadataBase,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataItemCollection,
  Dependencies,
} from '@/cora/bffTypes.server';
import type { Repeat } from '@/data/formDefinition/createPresentation/createPresentationComponent';

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
  repeat: Repeat;
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
  subjectLinkedRecordIdSearchTerm: {
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
  filterMetadataRefs: BFFMetadataChildReference[],
  dependencies: Dependencies,
): FilterDefinition[] => {
  return filterMetadataRefs
    .map((metadata) => createFilter(metadata, dependencies))
    .filter(Boolean) as FilterDefinition[];
};

const createFilter = (
  filterMetadataRef: BFFMetadataChildReference,
  depencencies: Dependencies,
): FilterDefinition | undefined => {
  const metadata = depencencies.metadataPool.get(
    filterMetadataRef.childId,
  ) as BFFMetadataBase;
  const commonValues = {
    id: metadata.id,
    name: metadata.nameInData,
    textId: metadata.textId,
    placeholderTextId: metadata.defTextId,
    repeat: {
      repeatMin: Number.parseInt(filterMetadataRef.repeatMin),
      repeatMax:
        filterMetadataRef.repeatMax === 'X'
          ? Number.MAX_VALUE
          : Number.parseInt(filterMetadataRef.repeatMax),
    },
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
