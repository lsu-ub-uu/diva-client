import type { ReactNode } from 'react';
import type { LanguageCollection } from '@/generatedTypes/divaTypes';
import { mapISO639_2b_to_ISO639_1 } from '@/utils/mapLanguageCode';

interface TermProps {
  label?: string;
  value?: ReactNode;
  lang?: LanguageCollection;
}

export const Term = ({ label, value, lang }: TermProps) => {
  if (!label || !value) {
    return null;
  }

  return (
    <>
      <dt>{label}</dt>
      <dd {...(lang && { lang: mapISO639_2b_to_ISO639_1(lang) })} dir='auto'>
        {value}
      </dd>
    </>
  );
};
