import type {
  BFFMetadataBase,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataItemCollection,
  BFFMetadataTextVariable,
  BFFPresentationChildReference,
  BFFPresentation,
  BFFPresentationOfSingleMetadata,
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
  labelTextId: string | undefined;
  placeholderTextId: string | undefined;
  repeat: Repeat,
}

export interface TextFilter extends BaseFilter {
  type: 'text';
  regEx: string;
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
}

const autocompleteSearchTerms: Record<
  string,
  Omit<AutocompleteFilter, keyof BaseFilter | 'type'>
> = {
  subjectLinkedRecordIdSearchTerm: {
    searchType: 'diva-subjectMinimalSearch',
    recordType: 'diva-subject',
    searchTerm: 'search.include.includePart.topicSearchTerm.0.value',
  },
  permissionUnitLinkedRecordIdSearchTerm: {
    recordType: 'permissionUnit',
    searchType: 'permissionUnitSearch',
    searchTerm:
      'permissionUnitSearch.include.includePart.permissionUnitIdSearchTerm.0.value',
  },
};

const hiddenSearchTerms = [
  'visibilitySearchTerm',
  'permissionUnitLinkedRecordIdSearchTerm',
];

export const createFilters = (
  filterPresentationRefs: BFFPresentationChildReference[],
  filterMetadataRefs: BFFMetadataChildReference[],
  dependencies: Dependencies,
): FilterDefinition[] => {
  return filterPresentationRefs
    .map((presentationRef) => createFilter(presentationRef, filterMetadataRefs, dependencies))
    .filter(Boolean) as FilterDefinition[];
};

export const createFilter = (
  filterPresentationRef: BFFPresentationChildReference,
  filterMetadataRefs: BFFMetadataChildReference[],
  dependencies: Dependencies,
): FilterDefinition | undefined => {
  const presentation = dependencies.presentationPool.get(
    filterPresentationRef.refGroups[0].childId
  )

  if (!isValidFilterPresentation(presentation)) {
    return undefined
  }

  const filterMetadataRef = findMatchingMetadataRef(presentation, filterMetadataRefs, dependencies)
  if (!filterMetadataRef) {
    return undefined;
  }

  const metadata = dependencies.metadataPool.get(
    filterMetadataRef.childId,
  ) as BFFMetadataBase;
  if (hiddenSearchTerms.includes(metadata.nameInData)) {
    return undefined;
  }

  const commonValues = {
    id: metadata.id,
    name: metadata.nameInData,
    labelTextId: metadata.textId,
    placeholderTextId: presentation.emptyTextId,
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
      regEx: (metadata as BFFMetadataTextVariable).regEx,
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
    const collection = dependencies.metadataPool.get(
      collectionVariable.refCollection,
    ) as BFFMetadataItemCollection;
    const options = collection.collectionItemReferences.map((itemRef) => {
      const item = dependencies.metadataPool.get(
        itemRef.refCollectionItemId,
      ) as BFFMetadataBase;
      return { text: item.textId, value: item.nameInData };
    });

    return {
      ...commonValues,
      type: 'collection',
      options: [{ text: '--', value: '' }, ...options],
    };
  }

  return undefined;
};

const findMatchingMetadataRef = (filterPresentation: BFFPresentationOfSingleMetadata, filterMetadataRefs: BFFMetadataChildReference[], dependencies: Dependencies) => {

  return filterMetadataRefs.find(metadataRef => {
    const metadata = dependencies.metadataPool.get(metadataRef.childId);
    return filterPresentation.presentationOf === metadata.id
  })
}

const isValidFilterPresentation = (presentation: BFFPresentation): presentation is BFFPresentationOfSingleMetadata => {
  return presentation.type === 'pVar' || presentation.type === 'pNumVar' || presentation.type === 'pCollVar';
} 