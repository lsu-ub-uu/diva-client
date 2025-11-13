import type {
  DivaOutputGroup,
  LanguageCollection,
  TitleInfoGroup,
  TitleInfoLangGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { createTitle } from '../utils/createTitle';
import { Term } from './Term';

interface TitleInfoProps {
  titleInfo: TitleInfoLangGroup | TitleInfoGroup | undefined;
}

export const TitleInfo = ({ titleInfo }: TitleInfoProps) => {
  const language = useLanguage();
  if (!titleInfo) return null;
  return (
    <Term
      label={titleInfo?.__text?.[language]}
      value={createTitle(titleInfo)}
      lang={'_lang' in titleInfo ? titleInfo._lang : undefined}
    />
  );
};
