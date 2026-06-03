import type { BFFSweEngText } from '../bffTypes.server';
import { getFirstDataAtomicWithNameInData } from '../cora-data/CoraDataUtils.server';
import type { DataGroup } from '../cora-data/types.server';

export const transformSweEngText = (data: DataGroup): BFFSweEngText => {
  return {
    sv: getFirstDataAtomicWithNameInData(data, 'text', {
      lang: 'swe',
    }).value,
    en: getFirstDataAtomicWithNameInData(data, 'text', {
      lang: 'eng',
    }).value,
    cimode: `${data.name}Text`,
  };
};
