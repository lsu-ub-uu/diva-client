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

export interface TextFilter {
  id: string;
  type: 'text';
  name: string;
  regex: string;
  textId: string;
}

export interface NumberFilter {
  id: string;
  type: 'number';
  name: string;
  min?: number;
  max?: number;
  warningMin?: number;
  warningMax?: number;
  textId: string;
}

export interface CollectionFilter {
  id: string;
  type: 'collection';
  name: string;
  textId: string;
  options: { text: string; value: string }[];
}

export const createFilters = (
  searchMetadata: BFFMetadataGroup,
  dependencies: Dependencies,
): (TextFilter | NumberFilter | CollectionFilter)[] => {
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
    .filter(Boolean) as (TextFilter | NumberFilter | CollectionFilter)[];
};

const createFilter = (
  metadata: BFFMetadata,
  depencencies: Dependencies,
): TextFilter | NumberFilter | CollectionFilter | undefined => {
  if (metadata.nameInData === 'permissionUnitSearchTerm') {
    const members = uniqBy(
      Array.from(depencencies.memberPool.values()),
      (m) => m.id,
    ).filter((m) => m.id !== 'diva');
    return {
      type: 'collection',
      id: metadata.id,
      name: metadata.nameInData,
      textId: metadata.textId,
      options: members.map((m) => ({
        text: m.id,
        value: `permissionUnit_${m.id}`,
      })),
    };
  }

  if (metadata.type === 'textVariable') {
    const textVariable = metadata as BFFMetadataTextVariable;
    return {
      type: 'text',
      id: textVariable.id,
      name: textVariable.nameInData,
      regex: textVariable.regEx,
      textId: textVariable.textId,
    };
  }

  if (metadata.type === 'numberVariable') {
    const numberVariable = metadata as BFFMetadataNumberVariable;
    return {
      type: 'number',
      id: numberVariable.id,
      name: numberVariable.nameInData,
      textId: numberVariable.textId,
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
      type: 'collection',
      id: collectionVariable.id,
      name: collectionVariable.nameInData,
      textId: collectionVariable.textId,
      options,
    };
  }
  return undefined;
};
