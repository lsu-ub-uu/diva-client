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
  Attributes,
  CoraData,
  DataAtomic,
  DataGroup,
  DataListWrapper,
  RecordLink,
  RecordWrapper,
  ResourceLink,
} from '@/cora/cora-data/types.server';
import type { FormMetaData } from '@/data/formDefinition/formDefinition.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { createViewMetadata } from '@/data/formDefinition/formMetadata.server';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import type {
  BFFDataRecord,
  BFFDataResourceLink,
  BFFUpdate,
  BFFUserRight,
  Metadata,
} from '@/types/record';
import { createFieldNameWithAttributes } from '@/utils/createFieldNameWithAttributes';
import { removeEmpty } from '@/utils/structs/removeEmpty';

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
export const transformRecord = async (
  dependencies: Dependencies,
  recordWrapper: RecordWrapper,
): Promise<BFFDataRecord> => {
  let createdAt;
  let createdBy;
  const id = extractIdFromRecordInfo(recordWrapper.record.data);
  const recordInfo = extractRecordInfoDataGroup(recordWrapper.record.data);

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

  const data = await transformRecordDataGroup(
    recordWrapper.record.data,
    dependencies,
  );

  const coraRecord = recordWrapper.record;
  let userRights: BFFUserRight[] = [];
  if (coraRecord.actionLinks !== undefined) {
    userRights = Object.keys(coraRecord.actionLinks) as BFFUserRight[];
  }

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

const transformRecordDataGroup = async (
  dataRecordGroup: DataGroup,
  dependencies: Dependencies,
) => {
  const recordInfo = extractRecordInfoDataGroup(dataRecordGroup);

  const recordTypeId = extractLinkedRecordIdFromNamedRecordLink(
    recordInfo,
    'type',
  );

  const formMetadata = createViewMetadata(dependencies, recordTypeId);

  return transformRecordData(dataRecordGroup, formMetadata, dependencies);
};

export const transformRecordData = async (
  dataRecordGroup: DataGroup,
  formMetadata: FormMetaData,
  dependencies: Dependencies,
) => {
  return {
    [dataRecordGroup.name]: {
      ...(await transformDataGroup(
        dataRecordGroup,
        formMetadata,
        dependencies,
      )),
      ...transformAttributes(dataRecordGroup.attributes),
    },
  };
};

export const transformDataGroup = async (
  dataGroup: DataGroup,
  metadataGroup: FormMetaData,
  dependencies: Dependencies,
): Promise<Metadata> => {
  const group = {} as Metadata;

  for (const dataChild of dataGroup.children) {
    const matchingMetadata = findMatchingMetadata(dataChild, metadataGroup);

    if (!matchingMetadata) {
      console.warn(`Failed to find matching metadata for ${dataChild.name}`);
      continue;
    }

    const name = createDataName(dataChild, matchingMetadata);

    const transformedChild = {
      ...(await transformData(dataChild, matchingMetadata, dependencies)),
      ...transformAttributes(dataChild.attributes),
    };
    const repeating = isRepeating(matchingMetadata);
    if (repeating) {
      group[name] ??= [];
      transformedChild.repeatId = dataChild.repeatId;
      group[name].push(transformedChild);
    } else {
      group[name] = transformedChild;
    }
  }

  return group;
};

const createDataName = (data: CoraData, metadata: FormMetaData) => {
  const metadataAttributes = Object.entries(metadata.attributes ?? {}).map(
    ([name, value]) => ({ name, value }),
  );
  return createFieldNameWithAttributes(data.name, metadataAttributes);
};

const transformData = async (
  data: CoraData,
  metadata: FormMetaData,
  dependencies: Dependencies,
) => {
  if (metadata.type === 'group') {
    return transformDataGroup(data as DataGroup, metadata, dependencies);
  }

  if (metadata.type === 'recordLink') {
    return transformRecordLink(data as RecordLink, dependencies);
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

const transformRecordLink = async (
  data: RecordLink,
  dependencies: Dependencies,
) => {
  const recordLinkId = getFirstDataAtomicValueWithNameInData(
    data,
    'linkedRecordId',
  );
  const linkedRecordType = getFirstDataAtomicValueWithNameInData(
    data,
    'linkedRecordType',
  );

  const linkedRecord = transformLinkedRecord(data, dependencies);

  let displayName;
  if (linkedRecordType === 'diva-organisation' && linkedRecord) {
    // fetch organiasation (decorated) and transform result
    /* const svName = formatLinkedOrganisationName(
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
    } */
  }

  return removeEmpty({
    value: recordLinkId,
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
  return transformRecordDataGroup(linkedRecordGroup, dependencies);
};

const getLinkedRecord = async (
  data: RecordLink,
  dependencies: Dependencies,
) => {
  const linkedRecordType = getFirstDataAtomicValueWithNameInData(
    data,
    'linkedRecordType',
  );

  if (hasChildWithNameInData(data, 'linkedRecord')) {
    return getFirstDataGroupWithNameInData(data, 'linkedRecord');
  }

  if (linkedRecordType === 'diva-organisation') {
    const organisation = await getRecordByRecordTypeAndRecordId({
      dependencies,
      recordType: 'diva-organisation',
      recordId: getFirstDataAtomicValueWithNameInData(data, 'linkedRecordId'),
      decorated: true,
    });
    
    return organisation.data.organisation;

  }

const transformDataAtomic = (data: DataAtomic) => {
  return { value: data.value };
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

  return Object.entries(attributes).reduce((accumulator: any, [key, value]) => {
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
  }, {});
};

export const isRepeating = (metadata: FormMetaData) => {
  return metadata.repeat.repeatMax > 1;
};
