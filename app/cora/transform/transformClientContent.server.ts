import { removeEmpty } from '@/utils/structs/removeEmpty';
import type { BFFClientContent, BFFSeverity } from '../bffTypes.server';
import {
  getFirstDataGroupWithNameInData,
  hasChildWithNameInData,
} from '../cora-data/CoraDataUtils.server';
import { getFirstDataAtomicValueWithNameInData } from '../cora-data/CoraDataUtilsWrappers.server';
import type {
  DataGroup,
  DataListWrapper,
  RecordWrapper,
} from '../cora-data/types.server';
import { transformSweEngText } from './transformSweEngText.server';

export const transformClientContent = (
  data: DataListWrapper,
): BFFClientContent[] => {
  return data.dataList.data.map((recordWrapper) =>
    transformClientContentRecord(recordWrapper),
  );
};

export const transformClientContentRecord = (
  record: RecordWrapper,
): BFFClientContent => {
  const dataGroup = record.record.data;

  const globalAlert = hasChildWithNameInData(dataGroup, 'globalAlert')
    ? transformGlobalAlert(
        getFirstDataGroupWithNameInData(dataGroup, 'globalAlert'),
      )
    : undefined;

  return removeEmpty({
    id: getFirstDataAtomicValueWithNameInData(
      getFirstDataGroupWithNameInData(dataGroup, 'recordInfo'),
      'id',
    ),
    globalAlert: globalAlert,
  });
};

const transformGlobalAlert = (globalAlertDataGroup: DataGroup) => {
  const severity = globalAlertDataGroup?.attributes?.severity as BFFSeverity;
  const textDataGroup = getFirstDataGroupWithNameInData(
    globalAlertDataGroup,
    'text',
  );
  return { severity, text: transformSweEngText(textDataGroup) };
};
