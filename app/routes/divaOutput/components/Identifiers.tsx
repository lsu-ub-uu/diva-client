import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { useTranslation } from 'react-i18next';
import { formatIsbnIsmnLabel } from '../utils/format';
import { Term } from './Term';

interface IdentifiersProps {
  output: DivaOutputGroup;
}

export const Identifiers = ({ output }: IdentifiersProps) => {
  const { t } = useTranslation();
  const language = useLanguage();
  return (
    <section aria-labelledby='identifiers-heading'>
      <h2 id='identifiers-heading'> {t('divaClient_identifierText')}</h2>
      <dl className='inline-definitions'>
        <Term
          label={t('divaClient_divaIdText')}
          value={output.recordInfo.id.value}
        />
        <Term
          label={output.recordInfo.urn?.__text?.[language]}
          value={output.recordInfo.urn?.value}
        />
        {output.identifier_type_isbn?.map((identifier, index) => (
          <Term
            key={index}
            label={formatIsbnIsmnLabel(identifier, language)}
            value={identifier.value}
          />
        ))}

        <Term
          label={output.identifier_type_isrn?.__text?.[language]}
          value={output.identifier_type_isrn?.value}
        />
        {output.identifier_type_ismn?.map((identifier, index) => (
          <Term
            key={index}
            label={formatIsbnIsmnLabel(identifier, language)}
            value={identifier.value}
          />
        ))}
        <Term
          label={output.identifier_type_doi?.__text?.[language]}
          value={output.identifier_type_doi?.value}
        />
        <Term
          label={output.identifier_type_pmid?.__text?.[language]}
          value={output.identifier_type_pmid?.value}
        />
        <Term
          label={output.identifier_type_wos?.__text?.[language]}
          value={output.identifier_type_wos?.value}
        />
        <Term
          label={output.identifier_type_scopus?.__text?.[language]}
          value={output.identifier_type_scopus?.value}
        />
        <Term
          label={output.identifier_type_openAlex?.__text?.[language]}
          value={output.identifier_type_openAlex?.value}
        />
        <Term
          label={output['identifier_type_se-libr']?.[0]?.__text?.[language]}
          value={output['identifier_type_se-libr']?.map((libr) => libr.value)}
        />
        <Term
          label={output.identifier_type_archiveNumber?.__text?.[language]}
          value={output.identifier_type_archiveNumber?.value}
        />

        <Term
          label={output.identifier_type_localId?.[0]?.__text?.[language]}
          value={output.identifier_type_localId?.map((libr) => libr.value)}
        />
        <Term
          label={output.identifier_type_patentNumber?.__text?.[language]}
          value={output.identifier_type_patentNumber?.value}
        />
      </dl>
    </section>
  );
};
