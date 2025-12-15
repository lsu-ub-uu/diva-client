import type { Auth } from '@/auth/Auth';
import {
  getFirstDataAtomicWithNameInData,
  getFirstDataGroupWithNameInData,
  hasChildWithNameInData,
} from '@/cora/cora-data/CoraDataUtils.server';
import type { DataGroup, RecordWrapper } from '@/cora/cora-data/types.server';
import { updateRecordDataById } from '@/cora/updateRecordDataById.server';

export const trashRecord = async (
  recordId: string,
  recordData: DataGroup,
  recordType: string,
  auth: Auth | undefined,
) => {
  const updatedRecordData = updateRecordToBeTrashed(recordData);
  return updateRecordDataById<RecordWrapper>(
    recordId,
    updatedRecordData,
    recordType,
    auth?.data.token,
  );
};

export const updateRecordToBeTrashed = (record: DataGroup): DataGroup => {
  const updatedRecord = structuredClone(record);
  const recordInfo = getFirstDataGroupWithNameInData(
    updatedRecord,
    'recordInfo',
  );
  if (hasChildWithNameInData(recordInfo, 'inTrashBin')) {
    const trashBin = getFirstDataAtomicWithNameInData(recordInfo, 'inTrashBin');
    if (trashBin) {
      trashBin.value = 'true';
    }
  } else {
    recordInfo.children.push({ name: 'inTrashBin', value: 'true' });
  }
  return updatedRecord;
};
