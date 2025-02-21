import { getRecordDataById } from '@/cora/getRecordDataById.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import type { RecordWrapper } from '@/cora/cora-data/types.server';
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import { extractLinkedRecordIdFromNamedRecordLink } from '@/cora/cora-data/CoraDataTransforms.server';
import { getAllDataAtomicsWithNameInData } from '@/cora/cora-data/CoraDataUtils.server';
import { useFetcher } from 'react-router';
import type { loader } from '@/routes/getRecord';

export interface Theme {
  backgroundColor: string;
  textColor: string;
  links?: { displayLabel: string; url: string }[];
  logoUrl: string;
}

export const getThemeById = async (
  dependencies: Dependencies,
  themeId: string,
) => {
  const response = await getRecordDataById<RecordWrapper>(
    'diva-theme',
    themeId,
  );
  const record = transformTheme(response.data);

  return record;
};

export const transformTheme = async (recordWrapper: RecordWrapper): Theme => {
  const { load } = useFetcher<typeof loader>();
  const data = recordWrapper.record.data;
  const backgroundColor = getFirstDataAtomicValueWithNameInData(
    data,
    'backgroundColor',
  );
  const textColor = getFirstDataAtomicValueWithNameInData(data, 'textColor');
  const binaryId = extractLinkedRecordIdFromNamedRecordLink(data, 'logo');
  const links = getAllDataAtomicsWithNameInData(data, 'link');

  const logoUrl = '';
  return {
    backgroundColor,
    textColor,
    logoUrl,
  };
};
