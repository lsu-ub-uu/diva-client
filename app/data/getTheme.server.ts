import { getRecordDataById } from '@/cora/getRecordDataById.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import type { RecordWrapper } from '@/cora/cora-data/types.server';

export const getThemeById = async (
  dependencies: Dependencies,
  themeId: string,
) => {
  const response = await getRecordDataById<RecordWrapper>(
    'diva-theme',
    themeId,
  );

  return '';
};
