import { useLanguage } from '@/i18n/useLanguage';

interface Data {
  __text?: { sv: string; en: string };
}

interface DataTextProps {
  data: Data | Data[];
}

export const DataText = ({ data }: DataTextProps) => {
  const language = useLanguage();

  const text = Array.isArray(data) ? data[0].__text : data.__text;

  if (!text) {
    return null;
  }

  return <>{text[language]}</>;
};
