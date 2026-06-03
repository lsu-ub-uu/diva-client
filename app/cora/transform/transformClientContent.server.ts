import type { BFFClientContent, BFFSeverity } from '../bffTypes.server';
import { getFirstDataGroupWithNameInData } from '../cora-data/CoraDataUtils.server';
import { getFirstDataAtomicValueWithNameInData } from '../cora-data/CoraDataUtilsWrappers.server';
import type { DataListWrapper, RecordWrapper } from '../cora-data/types.server';
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
  const globalAlertDataGroup = getFirstDataGroupWithNameInData(
    dataGroup,
    'globalAlert',
  );
  const severity = globalAlertDataGroup.attributes?.severity as BFFSeverity;
  const textDataGroup = getFirstDataGroupWithNameInData(
    globalAlertDataGroup,
    'text',
  );
  return {
    id: getFirstDataAtomicValueWithNameInData(
      getFirstDataGroupWithNameInData(dataGroup, 'recordInfo'),
      'id',
    ),
    globalAlert: { severity, text: transformSweEngText(textDataGroup) },
  };
};
