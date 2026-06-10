/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import {
  extractIdFromRecordInfo,
  extractLinkedRecordIdFromNamedRecordLink,
} from '@/cora/cora-data/CoraDataTransforms.server';
import {
  containsChildWithNameInData,
  getAllChildrenWithNameInData,
  getFirstDataGroupWithNameInData,
  hasChildWithNameInData,
} from '@/cora/cora-data/CoraDataUtils.server';
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import type {
  CoraData,
  CoraRecord,
  DataAtomic,
  DataGroup,
  DataListWrapper,
  RecordLink,
  RecordWrapper,
  ResourceLink,
} from '@/cora/cora-data/types.server';

import type {
  BFFDataRecord,
  BFFDataResourceLink,
  BFFUpdate,
  BFFUserRight,
  Metadata,
} from '@/types/record';
import { createFieldNameWithAttributes } from '@/utils/createFieldNameWithAttributes';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import type {
  BFFMetadata,
  BFFMetadataBase,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFRecordType,
  Dependencies,
  FormDefinitionMode,
} from '../bffTypes.server';
import { log } from '@/logging/logger.server.';

/**
 * Transforms records
 * @param dependencies
 * @param dataListWrapper
 */
export const transformRecords = (
  dependencies: Dependencies,
  dataListWrapper: DataListWrapper,
  mode: FormDefinitionMode,
): any[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecords = dataListWrapper.dataList.data;
  return coraRecords.map((recordWrapper) =>
    transformRecord(dependencies, recordWrapper, mode),
  );
};

/**
 * Transform Record
 * @param dependencies
 * @param recordWrapper
 */
export const transformRecord = (
  dependencies: Dependencies,
  recordWrapper: RecordWrapper,
  mode: FormDefinitionMode,
): BFFDataRecord => {
  let createdAt;
  let createdBy;
  const id = extractIdFromRecordInfo(recordWrapper.record.data);
  const recordInfo = extractRecordInfoDataGroup(recordWrapper.record.data);

  const recordTypeId = extractLinkedRecordIdFromNamedRecordLink(
    recordInfo,
    'type',
  );
  const validationTypeId = extractLinkedRecordIdFromNamedRecordLink(
    recordInfo,
    'validationType',
  );

  if (containsChildWithNameInData(recordInfo, 'tsCreated')) {
    createdAt = getFirstDataAtomicValueWithNameInData(recordInfo, 'tsCreated');
  }

  if (containsChildWithNameInData(recordInfo, 'createdBy')) {
    createdBy = extractLinkedRecordIdFromNamedRecordLink(
      recordInfo,
      'createdBy',
    );
  }
  const updated = extractRecordUpdates(recordInfo);

  const data = transformRecordDataGroup(
    recordWrapper.record.data,
    mode,
    dependencies,
  );

  const coraRecord = recordWrapper.record;
  const recordType = dependencies.recordTypePool.get(recordTypeId);

  return removeEmpty({
    id,
    recordType: recordTypeId,
    validationType: validationTypeId,
    createdAt,
    createdBy,
    updated,
    userRights: createUserRights(recordType, coraRecord),
    actionLinks: coraRecord.actionLinks,
    data,
  });
};

const transformRecordDataGroup = (
  dataRecordGroup: DataGroup,
  mode: FormDefinitionMode,
  dependencies: Dependencies,
) => {
  const rootMetadataGroup = getRootMetadataGroup(
    mode,
    dataRecordGroup,
    dependencies,
  );
  return transformRecordData(dataRecordGroup, rootMetadataGroup, dependencies);
};

const getRootMetadataGroup = (
  mode: FormDefinitionMode,
  dataRecordGroup: DataGroup,
  dependencies: Dependencies,
) => {
  const { recordTypePool, metadataPool, validationTypePool } = dependencies;
  const recordInfo = extractRecordInfoDataGroup(dataRecordGroup);

  if (mode === 'view' || mode === 'list') {
    const recordTypeId = extractLinkedRecordIdFromNamedRecordLink(
      recordInfo,
      'type',
    );
    const recordType = recordTypePool.get(recordTypeId);
    return metadataPool.get(recordType.metadataId) as BFFMetadataGroup;
  }

  const validationTypeId = extractLinkedRecordIdFromNamedRecordLink(
    recordInfo,
    'validationType',
  );
  const validationType = validationTypePool.get(validationTypeId);

  if (mode === 'create') {
    return metadataPool.get(
      validationType.newMetadataGroupId,
    ) as BFFMetadataGroup;
  }
  return metadataPool.get(validationType.metadataGroupId) as BFFMetadataGroup;
};

export const transformRecordData = (
  dataRecordGroup: DataGroup,
  metadataGroup: BFFMetadataGroup,
  dependencies: Dependencies,
) => {
  return {
    [createDataName(dataRecordGroup, metadataGroup, dependencies)]: {
      ...transformDataGroup(dataRecordGroup, metadataGroup, dependencies),
      ...transformAttributes(dataRecordGroup),
    },
  };
};

export const transformDataGroup = (
  dataGroup: DataGroup,
  metadataGroup: BFFMetadataGroup,
  dependencies: Dependencies,
): Metadata => {
  const init = { fromStorage: true } as Metadata;
  return dataGroup.children.reduce<Metadata>((group, dataChild) => {
    const matchingMetadataChildRef = findMatchingMetadataChildRef(
      dataChild,
      metadataGroup,
      dependencies,
    );

    if (!matchingMetadataChildRef) {
      log.warn(`Failed to find matching metadata for ${dataChild.name}`);
      return group;
    }

    const matchingMetadata = dependencies.metadataPool.get(
      matchingMetadataChildRef.childId,
    ) as BFFMetadata;

    const name = createDataName(dataChild, matchingMetadata, dependencies);

    const transformedChild = {
      ...transformData(dataChild, matchingMetadata, dependencies),
      ...transformAttributes(dataChild),
    };

    if (isRequired(matchingMetadataChildRef)) {
      transformedChild.required = true;
    }
    const repeating = isRepeating(matchingMetadataChildRef);

    if (repeating) {
      group[name] ??= [];
      transformedChild.repeatId = dataChild.repeatId;
      group[name].push(transformedChild);
    } else {
      group[name] = transformedChild;
    }
    return group;
  }, init);
};

const createDataName = (
  data: CoraData,
  metadata: BFFMetadata,
  dependencies: Dependencies,
) => {
  const { metadataPool } = dependencies;

  if (!('attributeReferences' in metadata)) {
    return metadata.nameInData;
  }

  const metadataAttributes = (metadata.attributeReferences ?? [])
    ?.map(
      (attributeReference) =>
        metadataPool.get(
          attributeReference.refCollectionVarId,
        ) as BFFMetadataCollectionVariable,
    )
    .filter((collVar) => collVar.finalValue)
    .map((collVar) => ({
      name: collVar.nameInData,
      value: collVar.finalValue,
    }));
  return createFieldNameWithAttributes(data.name, metadataAttributes);
};

const transformData = (
  data: CoraData,
  metadata: BFFMetadata,
  dependencies: Dependencies,
) => {
  if (metadata.type === 'group') {
    return transformDataGroup(
      data as DataGroup,
      metadata as BFFMetadataGroup,
      dependencies,
    );
  }

  if (metadata.type === 'recordLink' || metadata.type === 'anyTypeRecordLink') {
    return transformRecordLink(data as RecordLink, dependencies);
  }

  if (
    ['collectionVariable', 'numberVariable', 'textVariable'].includes(
      metadata.type,
    )
  ) {
    return transformDataAtomic(data as DataAtomic, metadata);
  }

  if (metadata.type === 'resourceLink') {
    return transformResourceLink(data as ResourceLink);
  }

  log.warn(`Unhandled metadata type ${metadata.type}`);
  return transformDataAtomic(data as DataAtomic, metadata);
};

const transformRecordLink = (data: RecordLink, dependencies: Dependencies) => {
  const recordLinkId = getFirstDataAtomicValueWithNameInData(
    data,
    'linkedRecordId',
  );
  const linkedRecordType = getFirstDataAtomicValueWithNameInData(
    data,
    'linkedRecordType',
  );

  const linkedRecord = hasChildWithNameInData(data, 'linkedRecord')
    ? transformLinkedRecord(data, dependencies)
    : undefined;

  let displayName;
  if (linkedRecordType === 'diva-organisation' && linkedRecord) {
    const svName = formatLinkedOrganisationName(
      recordLinkId,
      'sv',
      dependencies,
    );
    const enName = formatLinkedOrganisationName(
      recordLinkId,
      'en',
      dependencies,
    );

    if (svName && enName) {
      displayName = {
        sv: svName,
        en: enName,
      };
    }
  }

  return removeEmpty({
    value: recordLinkId,
    linkedRecordType: linkedRecordType,
    linkedRecord,
    displayName,
  });
};

const formatLinkedOrganisationName = (
  linkedOrganisationId: string,
  lang: 'sv' | 'en',
  dependencies: Dependencies,
): string | undefined => {
  if (!dependencies.organisationPool.has(linkedOrganisationId)) {
    return undefined;
  }
  const linkedOrganisation =
    dependencies.organisationPool.get(linkedOrganisationId);

  const organisationName = linkedOrganisation.name[lang];

  if (linkedOrganisation.parentOrganisationId) {
    return `${organisationName}, ${formatLinkedOrganisationName(
      linkedOrganisation.parentOrganisationId,
      lang,
      dependencies,
    )}`;
  }

  return organisationName;
};

const transformLinkedRecord = (
  data: RecordLink,
  dependencies: Dependencies,
) => {
  const linkedRecordGroup = getFirstDataGroupWithNameInData(
    data,
    'linkedRecord',
  ).children[0] as DataGroup;
  return transformRecordDataGroup(linkedRecordGroup, 'view', dependencies);
};

const transformDataAtomic = (data: DataAtomic, metadata: BFFMetadata) => {
  if ('finalValue' in metadata && metadata.finalValue) {
    return {
      value: metadata.finalValue,
      final: true,
    };
  }

  return {
    value: data.value,
  };
};

const transformResourceLink = (data: ResourceLink): BFFDataResourceLink => {
  const name = data.name;
  const id = getFirstDataAtomicValueWithNameInData(data, 'linkedRecordId');
  const mimeType = getFirstDataAtomicValueWithNameInData(data, 'mimeType');

  return {
    name,
    mimeType,
    id,
  };
};

const findMatchingMetadataChildRef = (
  data: CoraData,
  metadataParent: BFFMetadataGroup,
  dependencies: Dependencies,
) => {
  return metadataParent.children.find((metadataChildRef) =>
    doesDataMatchMetadataChildRef(data, metadataChildRef, dependencies),
  );
};

const doesDataMatchMetadataChildRef = (
  data: CoraData,
  metadataChildRef: BFFMetadataChildReference,
  dependencies: Dependencies,
) => {
  const { metadataPool } = dependencies;
  const metadata = metadataPool.get(metadataChildRef.childId);

  if (data.name !== metadata.nameInData) {
    return false;
  }

  const metadataAttributes =
    'attributeReferences' in metadata
      ? (metadata.attributeReferences ?? [])
      : [];

  const dataAttributes = Object.entries(data.attributes ?? {}).filter(
    ([key]) => !key.startsWith('_'),
  );

  if (dataAttributes.length !== metadataAttributes?.length) {
    return false;
  }

  return metadataAttributes.every((attributeReference) => {
    const collVar = metadataPool.get(
      attributeReference.refCollectionVarId,
    ) as BFFMetadataCollectionVariable;

    if (collVar.finalValue !== undefined) {
      return collVar.finalValue === data.attributes?.[collVar.nameInData];
    }

    const collection = metadataPool.get(
      collVar.refCollection,
    ) as BFFMetadataItemCollection;
    const collectionItems = collection.collectionItemReferences.map(
      (itemRef) =>
        metadataPool.get(itemRef.refCollectionItemId) as BFFMetadataBase,
    );
    return collectionItems.some(
      (item) => item.nameInData === data.attributes?.[collVar.nameInData],
    );
  });
};

const extractRecordInfoDataGroup = (coraRecordGroup: DataGroup): DataGroup => {
  return getFirstDataGroupWithNameInData(coraRecordGroup, 'recordInfo');
};

const extractRecordUpdates = (recordInfo: DataGroup): BFFUpdate[] => {
  const updates = getAllChildrenWithNameInData(recordInfo, 'updated');
  return updates.map((update) => {
    const updatedGroup = update as DataGroup;
    const updatedBy = extractLinkedRecordIdFromNamedRecordLink(
      updatedGroup,
      'updatedBy',
    );
    const updateAt = getFirstDataAtomicValueWithNameInData(
      updatedGroup,
      'tsUpdated',
    );
    return { updateAt, updatedBy };
  });
};

export const transformAttributes = (data: CoraData) => {
  if (data.attributes === undefined) {
    return {};
  }

  const result = Object.entries(data.attributes).reduce(
    (accumulator: any, [key, value]) => {
      if (key.startsWith('_value_')) {
        accumulator['__valueText'] ??= {};
        accumulator['__valueText'][key.replace('_value_', '')] = value;
      } else if (key.startsWith('_')) {
        accumulator['__text'] ??= {};
        accumulator['__text'][key.replace('_', '')] = value;
      } else {
        accumulator[`_${key}`] = value;
      }
      return accumulator;
    },
    {},
  );

  if (result['__text']) {
    result['__text']['cimode'] = `${data.name}Text`;
  }
  if (result['__valueText']) {
    result['__valueText']['cimode'] = `${(data as any).value}ValueText`;
  }

  return result;
};

export const isRepeating = (childRef: BFFMetadataChildReference) => {
  return childRef.repeatMax === 'X' || Number(childRef.repeatMax) > 1;
};

export const isRequired = (childRef: BFFMetadataChildReference) => {
  return Number(childRef.repeatMin) > 0;
};

const createUserRights = (
  recordType: BFFRecordType,
  coraRecord: CoraRecord,
): BFFUserRight[] => {
  let userRights: BFFUserRight[] = [];
  if (coraRecord.actionLinks !== undefined) {
    userRights = Object.keys(coraRecord.actionLinks) as BFFUserRight[];
  }
  if (hasTrashRight(recordType, coraRecord)) {
    userRights.push('trash');
  }

  if (hasUntrashRight(recordType, coraRecord)) {
    userRights.push('untrash');
  }

  if (hasPublishRight(coraRecord)) {
    userRights.push('publish');
  }

  if (hasUnpublishRight(coraRecord)) {
    userRights.push('unpublish');
  }
  return userRights;
};

const hasTrashRight = (
  recordType: BFFRecordType,
  coraRecord: CoraRecord,
): boolean => {
  if (!coraRecord.actionLinks?.update) {
    return false;
  }

  return recordType.useTrashBin && !isInTrashBin(coraRecord);
};

const hasUntrashRight = (
  recordType: BFFRecordType,
  coraRecord: CoraRecord,
): boolean => {
  if (!coraRecord.actionLinks?.update) {
    return false;
  }

  return recordType.useTrashBin && isInTrashBin(coraRecord);
};

const hasPublishRight = (coraRecord: CoraRecord): boolean => {
  if (!coraRecord.actionLinks?.update) {
    return false;
  }

  const recordInfo = getFirstDataGroupWithNameInData(
    coraRecord.data,
    'recordInfo',
  );

  if (!hasChildWithNameInData(recordInfo, 'visibility')) {
    return false;
  }

  const visibility = getFirstDataAtomicValueWithNameInData(
    recordInfo,
    'visibility',
  );

  return !isInTrashBin(coraRecord) && visibility === 'unpublished';
};

const hasUnpublishRight = (coraRecord: CoraRecord): boolean => {
  if (!coraRecord.actionLinks?.update) {
    return false;
  }

  const recordInfo = getFirstDataGroupWithNameInData(
    coraRecord.data,
    'recordInfo',
  );

  if (!hasChildWithNameInData(recordInfo, 'visibility')) {
    return false;
  }

  const visibility = getFirstDataAtomicValueWithNameInData(
    recordInfo,
    'visibility',
  );

  return visibility === 'published';
};

const isInTrashBin = (coraRecord: CoraRecord) => {
  const recordInfo = getFirstDataGroupWithNameInData(
    coraRecord.data,
    'recordInfo',
  );
  return (
    hasChildWithNameInData(recordInfo, 'inTrashBin') &&
    getFirstDataAtomicValueWithNameInData(recordInfo, 'inTrashBin') === 'true'
  );
};
