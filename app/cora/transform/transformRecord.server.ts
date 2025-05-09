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

import type {
  Attributes,
  CoraData,
  DataAtomic,
  DataGroup,
  DataListWrapper,
  RecordLink,
  RecordWrapper,
  ResourceLink,
} from '@/cora/cora-data/types.server';
import {
  extractIdFromRecordInfo,
  extractLinkedRecordIdFromNamedRecordLink,
} from '@/cora/cora-data/CoraDataTransforms.server';
import {
  containsChildWithNameInData,
  getAllChildrenWithNameInData,
  getFirstDataGroupWithNameInData,
} from '@/cora/cora-data/CoraDataUtils.server';
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import type { FormMetaData } from '@/data/formDefinition/formDefinition.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import { createFormMetaData } from '@/data/formDefinition/formMetadata.server';
import type {
  BFFDataRecord,
  BFFUpdate,
  BFFUserRight,
  Metadata,
} from '@/types/record';
import { mapKeys } from 'lodash-es';
import { createFieldNameWithAttributes } from '@/utils/createFieldNameWithAttributes';

/**
 * Transforms records
 * @param dependencies
 * @param dataListWrapper
 */
export const transformRecords = (
  dependencies: Dependencies,
  dataListWrapper: DataListWrapper,
): any[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecords = dataListWrapper.dataList.data;
  return coraRecords.map((recordWrapper) =>
    transformRecord(dependencies, recordWrapper),
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
): BFFDataRecord => {
  const coraRecord = recordWrapper.record;
  const dataRecordGroup = coraRecord.data;
  let createdAt;
  let createdBy;

  const id = extractIdFromRecordInfo(dataRecordGroup);
  const recordInfo = extractRecordInfoDataGroup(dataRecordGroup);

  const recordType = extractLinkedRecordIdFromNamedRecordLink(
    recordInfo,
    'type',
  );
  const validationType = extractLinkedRecordIdFromNamedRecordLink(
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

  let userRights: BFFUserRight[] = [];
  if (coraRecord.actionLinks !== undefined) {
    userRights = Object.keys(coraRecord.actionLinks) as BFFUserRight[];
  }

  const formMetadata = createFormMetaData(
    dependencies,
    validationType,
    'update',
  );

  const data = transformRecordData(dataRecordGroup, formMetadata);

  return removeEmpty({
    id,
    recordType,
    validationType,
    createdAt,
    createdBy,
    updated,
    userRights,
    actionLinks: coraRecord.actionLinks,
    data,
  });
};

export const transformRecordData = (
  dataRecordGroup: DataGroup,
  formMetadata: FormMetaData,
) => {
  return {
    [dataRecordGroup.name]: {
      ...transformDataGroup(dataRecordGroup, formMetadata),
      ...transformAttributes(dataRecordGroup.attributes),
    },
  };
};

export const transformDataGroup = (
  dataGroup: DataGroup,
  metadataGroup: FormMetaData,
): Metadata => {
  const init = {} as Metadata;
  return dataGroup.children.reduce<Metadata>((group, dataChild) => {
    const matchingMetadata = findMatchingMetadata(dataChild, metadataGroup);

    if (!matchingMetadata) {
      console.warn(`Failed to find matching metadata for ${dataChild.name}`);
      return group;
    }

    const name = createDataName(dataChild, matchingMetadata);

    const transformedChild = {
      ...transformData(dataChild, matchingMetadata),
      ...transformAttributes(dataChild.attributes),
    };
    const repeating = isRepeating(matchingMetadata);
    if (repeating) {
      group[name] ??= [];
      group[name].push(transformedChild);
    } else {
      group[name] = transformedChild;
    }
    return group;
  }, init);
};

const createDataName = (data: CoraData, metadata: FormMetaData) => {
  const metadataAttributes = Object.entries(metadata.attributes ?? {}).map(
    ([name, value]) => ({ name, value }),
  );
  return createFieldNameWithAttributes(data.name, metadataAttributes);
};

const transformData = (data: CoraData, metadata: FormMetaData) => {
  if (metadata.type === 'group') {
    return transformDataGroup(data as DataGroup, metadata);
  }

  if (metadata.type === 'recordLink') {
    return transformRecordLink(data as RecordLink);
  }

  if (
    ['collectionVariable', 'numberVariable', 'textVariable'].includes(
      metadata.type,
    )
  ) {
    return transformDataAtomic(data as DataAtomic);
  }

  if (metadata.type === 'resourceLink') {
    return transformResourceLink(data as ResourceLink);
  }

  console.warn('Unhandled metadata type', metadata.type);
  return transformDataAtomic(data as DataAtomic);
};

const transformRecordLink = (data: RecordLink) => {
  const recordLinkId = getFirstDataAtomicValueWithNameInData(
    data,
    'linkedRecordId',
  );
  return { value: recordLinkId };
};

const transformDataAtomic = (data: DataAtomic) => {
  return { value: data.value };
};

const transformResourceLink = (data: ResourceLink) => {
  return {
    name: data.name,
    mimeType: data.mimeType,
    actionLinks: data.actionLinks,
  };
};

const findMatchingMetadata = (data: CoraData, metadataParent: FormMetaData) => {
  const matchingMetadatas = (metadataParent.children ?? [])
    .filter((metadata) => metadata.name === data.name)
    .filter((metadata) => allAttributesMatchInData(data, metadata));

  if (matchingMetadatas.length === 0) {
    return undefined;
  }

  if (matchingMetadatas.length === 1) {
    return matchingMetadatas[0];
  }

  if (matchingMetadatas.length > 0) {
    return metadataWithMostMatchingAttributes(data, matchingMetadatas);
  }
};

const allAttributesMatchInData = (data: CoraData, metadata: FormMetaData) => {
  return Object.entries(metadata.attributes ?? {}).every(
    ([name, value]) => (data.attributes ?? {})[name] === value,
  );
};

const metadataWithMostMatchingAttributes = (
  data: CoraData,
  metadataCandidates: FormMetaData[],
) => {
  return metadataCandidates.reduce((bestMatchSoFar, candidate) => {
    if (
      getNumberOfMatchingAttributes(data, candidate) >
      getNumberOfMatchingAttributes(data, bestMatchSoFar)
    ) {
      return candidate;
    }
    return bestMatchSoFar;
  }, metadataCandidates[0]);
};

const getNumberOfMatchingAttributes = (
  data: CoraData,
  metadata: FormMetaData,
) => {
  const dataAttributes = Object.entries(data.attributes ?? {});
  const candidateAttributes = metadata.attributes ?? {};

  return dataAttributes.filter(([name, value]) => {
    return candidateAttributes[name] === value;
  }).length;
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

export const transformAttributes = (attributes: Attributes | undefined) => {
  if (attributes === undefined) {
    return {};
  }

  return mapKeys(attributes, (_value, key) => `_${key}`);
};

export const isRepeating = (metadata: FormMetaData) => {
  return metadata.repeat.repeatMin !== 1 || metadata.repeat.repeatMax !== 1;
};
