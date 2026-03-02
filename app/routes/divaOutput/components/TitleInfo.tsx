import type {
  TitleInfoGroup,
  TitleInfoLangGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { Term } from './Term';
import { getTitleFromTitleInfo } from '@/utils/getRecordTitle';

interface TitleInfoProps {
  titleInfo: TitleInfoLangGroup | TitleInfoGroup | undefined;
}

export const TitleInfo = ({ titleInfo }: TitleInfoProps) => {
  const language = useLanguage();
  if (!titleInfo) return null;
  return (
    <Term
      label={titleInfo?.__text?.[language]}
      value={getTitleFromTitleInfo(titleInfo)}
      lang={'_lang' in titleInfo ? titleInfo._lang : undefined}
    />
  );
};
