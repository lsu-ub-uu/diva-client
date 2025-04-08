import type {
  DataListWrapper,
  RecordWrapper,
} from '@/cora/cora-data/types.server';
import {
  extractIdFromRecordInfo,
  extractLinkedRecordIdFromNamedRecordLink,
} from '@/cora/cora-data/CoraDataTransforms.server';
import type { BFFRecordType } from './bffTypes.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import {
  containsChildWithNameInData,
  getAllDataAtomicsWithNameInData,
} from '@/cora/cora-data/CoraDataUtils.server';

export const transformCoraRecordTypes = (
  dataListWrapper: DataListWrapper,
): BFFRecordType[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecords = dataListWrapper.dataList.data;
  return coraRecords.map(transformRecordType);
};

export const transformRecordType = (coraRecordWrapper: RecordWrapper) => {
  const coraRecord = coraRecordWrapper.record;
  const dataRecordGroup = coraRecord.data;
  const id = extractIdFromRecordInfo(dataRecordGroup);

  const metadataId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'metadataId',
  );
  const presentationViewId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'presentationViewId',
  );
  const listPresentationViewId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'listPresentationViewId',
  );
  const menuPresentationViewId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'menuPresentationViewId',
  );

  const searchId = containsChildWithNameInData(dataRecordGroup, 'search')
    ? extractLinkedRecordIdFromNamedRecordLink(dataRecordGroup, 'search')
    : undefined;

  const textId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'textId',
  );
  const defTextId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'defTextId',
  );

  // Some recordTypes does not have autocomplete as it seems (?)
  let autocompletePresentationView;
  if (
    containsChildWithNameInData(dataRecordGroup, 'autocompletePresentationView')
  ) {
    autocompletePresentationView = extractLinkedRecordIdFromNamedRecordLink(
      dataRecordGroup,
      'autocompletePresentationView',
    );
  }
  const groupOfRecordType = getAllDataAtomicsWithNameInData(
    dataRecordGroup,
    'groupOfRecordType',
  ).map((data) => data.value);
  return removeEmpty({
    id,
    metadataId,
    presentationViewId,
    listPresentationViewId,
    menuPresentationViewId,
    autocompletePresentationView,
    searchId,
    textId,
    defTextId,
    groupOfRecordType,
  }) satisfies BFFRecordType;
};
