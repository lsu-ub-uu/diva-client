import type { Auth } from '@/auth/Auth';
import {
  getFirstDataAtomicWithNameInData,
  getFirstDataGroupWithNameInData,
  hasChildWithNameInData,
} from '@/cora/cora-data/CoraDataUtils.server';
import type { DataGroup, RecordWrapper } from '@/cora/cora-data/types.server';
import { updateRecordDataById } from '@/cora/updateRecordDataById.server';

export const setRecordTrash = async (
  recordId: string,
  recordData: DataGroup,
  recordType: string,
  trash: boolean,
  auth: Auth | undefined,
) => {
  const updatedRecordData = updateRecordToBeTrashed(recordData, trash);
  return updateRecordDataById<RecordWrapper>(
    recordId,
    updatedRecordData,
    recordType,
    auth?.data.token,
  );
};

export const updateRecordToBeTrashed = (
  record: DataGroup,
  trash: boolean,
): DataGroup => {
  const newValue = trash ? 'true' : 'false';
  const updatedRecord = structuredClone(record);
  const recordInfo = getFirstDataGroupWithNameInData(
    updatedRecord,
    'recordInfo',
  );
  if (hasChildWithNameInData(recordInfo, 'inTrashBin')) {
    const trashBin = getFirstDataAtomicWithNameInData(recordInfo, 'inTrashBin');
    if (trashBin) {
      trashBin.value = newValue;
    }
  } else {
    recordInfo.children.push({
      name: 'inTrashBin',
      value: newValue,
    });
  }
  return updatedRecord;
};
