import type {
  DataListWrapper,
  RecordWrapper,
} from '@/cora/cora-data/CoraData.server';
import {
  extractIdFromRecordInfo,
  extractLinkedRecordIdFromNamedRecordLink,
} from '@/cora/cora-data/CoraDataTransforms.server';
import type { BFFRecordType } from './bffTypes.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import { containsChildWithNameInData } from '@/cora/cora-data/CoraDataUtils.server';

export const transformCoraRecordTypes = (
  dataListWrapper: DataListWrapper,
): BFFRecordType[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecords = dataListWrapper.dataList.data;
  return coraRecords.map(extractIdFromRecord);
};

const extractIdFromRecord = (coraRecordWrapper: RecordWrapper) => {
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
  return removeEmpty({
    id,
    metadataId,
    presentationViewId,
    listPresentationViewId,
    menuPresentationViewId,
    autocompletePresentationView,
  }) as BFFRecordType;
};
