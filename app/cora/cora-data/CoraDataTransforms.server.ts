import type { DataGroup, RecordWrapper } from '@/cora/cora-data/types.server';
import { getFirstDataGroupWithNameInData } from './CoraDataUtils.server';
import { getFirstDataAtomicValueWithNameInData } from './CoraDataUtilsWrappers.server';
import { getRecordDataById } from '@/cora/getRecordDataById.server';

export const extractIdFromRecordInfo = (coraRecordGroup: DataGroup) => {
  const recordInfo = getFirstDataGroupWithNameInData(
    coraRecordGroup,
    'recordInfo',
  ) as DataGroup;
  return getFirstDataAtomicValueWithNameInData(recordInfo, 'id');
};

export const extractAttributeValueByName = (
  dataRecordGroup: DataGroup,
  attributeName: string,
): string => {
  if (
    dataRecordGroup.attributes === undefined ||
    dataRecordGroup.attributes[attributeName] === undefined
  ) {
    throw new Error(`Attribute with name [${attributeName}] does not exist`);
  }

  return dataRecordGroup.attributes[attributeName];
};

export const extractLinkedRecordIdFromNamedRecordLink = (
  coraRecordGroup: DataGroup,
  linkName: string,
) => {
  const recordLink = getFirstDataGroupWithNameInData(
    coraRecordGroup,
    linkName,
  ) as DataGroup;
  return getFirstDataAtomicValueWithNameInData(recordLink, 'linkedRecordId');
};

export const fetchLinkedRecordForRecordLinkWithNameInData = async (
  data: DataGroup,
  nameInData: string,
  authToken?: string,
) => {
  const recordLink = getFirstDataGroupWithNameInData(
    data,
    nameInData,
  ) as DataGroup;

  const linkedRecordType = getFirstDataAtomicValueWithNameInData(
    recordLink,
    'linkedRecordType',
  );
  const linkedRecordId = getFirstDataAtomicValueWithNameInData(
    recordLink,
    'linkedRecordId',
  );

  const response = await getRecordDataById<RecordWrapper>(
    linkedRecordType,
    linkedRecordId,
    authToken,
  );

  return response.data;
};
