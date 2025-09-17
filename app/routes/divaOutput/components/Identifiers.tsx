import type { OutputUpdateGroup } from '@/generatedTypes/divaTypes';
import { Term } from './Term';
import { useLanguage } from '@/i18n/useLanguage';
import { useTranslation } from 'react-i18next';

interface IdentifiersProps {
  output: OutputUpdateGroup;
}

export const Identifiers = ({ output }: IdentifiersProps) => {
  const { t } = useTranslation();
  const language = useLanguage();
  return (
    <>
      <h2>{t('divaClient_identifierText')}</h2>
      <dl className='inline-definitions'>
        <Term
          label={t('divaClient_divaIdText')}
          value={output.recordInfo.id.value}
        />
        <Term
          label={output.recordInfo.urn?.__text[language]}
          value={output.recordInfo.urn?.value}
        />
        {output.identifier_type_isbn?.map((identifier, index) => (
          <Term
            key={index}
            label={`${output.identifier_type_isbn?.[0]?.__text[language]} (${identifier._displayLabel})`}
            value={identifier.value}
          />
        ))}

        <Term
          label={output.identifier_type_isrn?.__text[language]}
          value={output.identifier_type_isrn?.value}
        />
        {output.identifier_type_ismn?.map((identifier, index) => (
          <Term
            key={index}
            label={`${identifier.__text[language]} (${identifier._displayLabel})`}
            value={identifier.value}
          />
        ))}
        <Term
          label={output.identifier_type_doi?.__text[language]}
          value={output.identifier_type_doi?.value}
        />
        <Term
          label={output.identifier_type_pmid?.__text[language]}
          value={output.identifier_type_pmid?.value}
        />
        <Term
          label={output.identifier_type_wos?.__text[language]}
          value={output.identifier_type_wos?.value}
        />
        <Term
          label={output.identifier_type_scopus?.__text[language]}
          value={output.identifier_type_scopus?.value}
        />
        <Term
          label={output.identifier_type_openAlex?.__text[language]}
          value={output.identifier_type_openAlex?.value}
        />
        <Term
          label={output['identifier_type_se-libr']?.__text[language]}
          value={output['identifier_type_se-libr']?.value}
        />
        {output['identifier_type_localId']?.map((identifier, index) => (
          <Term
            key={index}
            label={output.identifier_type_localId?.[0]?.__text[language]}
            value={identifier.value}
          />
        ))}
        <Term
          label={output.identifier_type_patentNumber?.__text[language]}
          value={output.identifier_type_patentNumber?.value}
        />
      </dl>
    </>
  );
};
