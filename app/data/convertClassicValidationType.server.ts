import {
  containsChildWithNameInData,
  getFirstDataAtomicWithNameInData,
  getFirstDataGroupWithNameInData,
} from '@/cora/cora-data/CoraDataUtils.server';
import type { DataGroup } from '@/cora/cora-data/types.server';

export const convertClassicValidationType = (record: DataGroup): DataGroup => {
  const updatedRecord = structuredClone(record);
  const recordInfo = getFirstDataGroupWithNameInData(updatedRecord, 'recordInfo');
  const validationType = getFirstDataGroupWithNameInData(recordInfo, 'validationType');
  const linkedRecordId = getFirstDataAtomicWithNameInData(validationType, 'linkedRecordId');
  const prefix = 'classic_';

  if (!linkedRecordId.value.startsWith(prefix) || linkedRecordId.value.length === prefix.length) {
    throw new Error('Record does not have a convertible classic validation type');
  }

  linkedRecordId.value = linkedRecordId.value.slice(prefix.length);
  if (containsChildWithNameInData(updatedRecord, 'dataQuality')) {
    getFirstDataAtomicWithNameInData(updatedRecord, 'dataQuality').value = '2026';
  } else {
    updatedRecord.children.push({ name: 'dataQuality', value: '2026' });
  }

  return updatedRecord;
};