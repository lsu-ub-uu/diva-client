import type { LanguageCollection } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { createTitle } from '../utils/createTitle';
import { Term } from './Term';

interface TitleInfoProps {
  titleInfo:
    | {
        title: { value: string; __text: { sv: string; en: string } };
        subtitle?: { value: string; __text: { sv: string; en: string } };
        _lang?: LanguageCollection;
        __text: { sv: string; en: string };
      }
    | undefined;
}

export const TitleInfo = ({ titleInfo }: TitleInfoProps) => {
  const language = useLanguage();
  if (!titleInfo) return null;
  return (
    <Term
      label={titleInfo?.__text?.[language]}
      value={createTitle(titleInfo)}
      lang={titleInfo._lang}
    />
  );
};
