import type { ReactNode } from 'react';
import type { LanguageCollection } from '@/generatedTypes/divaTypes';
import { mapISO639_2b_to_ISO639_1 } from '@/utils/mapLanguageCode';
import { DataText, type Data } from './DataText';

interface TermProps {
  label?: string | Data;
  value?: ReactNode | ReactNode[];
  lang?: LanguageCollection;
}

export const Term = ({ label, value, lang }: TermProps) => {
  if (!label || !value) {
    return null;
  }

  return (
    <>
      <dt>{typeof label === 'string' ? label : <DataText data={label} />}</dt>
      {Array.isArray(value) ? (
        value.map((val, index) => (
          <dd
            key={index}
            {...(lang && { lang: mapISO639_2b_to_ISO639_1(lang) })}
            dir='auto'
          >
            {val}
          </dd>
        ))
      ) : (
        <dd {...(lang && { lang: mapISO639_2b_to_ISO639_1(lang) })} dir='auto'>
          {value}
        </dd>
      )}
    </>
  );
};
