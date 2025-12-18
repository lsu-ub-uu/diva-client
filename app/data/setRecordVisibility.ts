import type { Auth } from '@/auth/Auth';
import {
  getFirstDataAtomicWithNameInData,
  getFirstDataGroupWithNameInData,
  hasChildWithNameInData,
} from '@/cora/cora-data/CoraDataUtils.server';
import type { DataGroup, RecordWrapper } from '@/cora/cora-data/types.server';
import { updateRecordDataById } from '@/cora/updateRecordDataById.server';

interface SetRecordTrashParams {
  recordId: string;
  recordData: DataGroup;
  recordType: string;
  visibility: 'published' | 'unpublished';
  auth: Auth | undefined;
}

export const setRecordVisibility = async ({
  recordId,
  recordData,
  recordType,
  visibility,
  auth,
}: SetRecordTrashParams) => {
  const updatedRecordData = updateRecordWithNewVisibility(
    recordData,
    visibility,
  );
  return updateRecordDataById<RecordWrapper>(
    recordId,
    updatedRecordData,
    recordType,
    auth?.data.token,
  );
};

export const updateRecordWithNewVisibility = (
  record: DataGroup,
  newValue: 'published' | 'unpublished',
): DataGroup => {
  const updatedRecord = structuredClone(record);
  const recordInfo = getFirstDataGroupWithNameInData(
    updatedRecord,
    'recordInfo',
  );

  if (hasChildWithNameInData(recordInfo, 'visibility')) {
    const visibility = getFirstDataAtomicWithNameInData(
      recordInfo,
      'visibility',
    );
    if (visibility) {
      visibility.value = newValue;
    }
  }

  return updatedRecord;
};
