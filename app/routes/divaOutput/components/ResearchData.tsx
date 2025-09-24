import type { RelatedItemResearchDataGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { useId } from 'react';
import { Location } from './Location';
import { Term } from './Term';
import { TitleInfo } from './TitleInfo';

interface ResearchDataProps {
  researchData: RelatedItemResearchDataGroup | undefined;
}

export const ResearchData = ({ researchData }: ResearchDataProps) => {
  const id = useId();
  const language = useLanguage();
  if (!researchData) return null;

  return (
    <section aria-labelledby={id}>
      <h2 id={id}>{researchData.__text?.[language]}</h2>
      <dl className='inline-definitions'>
        <TitleInfo titleInfo={researchData.titleInfo} />
        <Term
          label={researchData.identifier_type_doi?.__text[language]}
          value={researchData.identifier_type_doi?.value}
        />
        {researchData.location && (
          <Term
            label={researchData.location?.[0].__text[language]}
            value={researchData.location?.map((location, index) => (
              <Location key={index} location={location} />
            ))}
          />
        )}
      </dl>
    </section>
  );
};
