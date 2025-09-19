import type { NameOrganisationGroup } from '@/generatedTypes/divaTypes';
import { o } from 'node_modules/react-router/dist/development/context-DohQKLID.mjs';
import { useId, useState } from 'react';
import { Organisation } from './Organisation';
import { useLanguage } from '@/i18n/useLanguage';
import { ShowMoreOrLessButton } from '@/components/CollapsableText/ShowMoreOrLessButton';

interface OrganisationsProps {
  organisations?: NameOrganisationGroup[];
}

export const Organisations = ({ organisations }: OrganisationsProps) => {
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const language = useLanguage();
  if (!organisations || organisations.length === 0) {
    return null;
  }

  return (
    <>
      <dt>{organisations?.[0]?.__text[language]}</dt>
      {organisations?.map((organisation, index) => (
        <dd key={index} className='block' id={`organisation-${id}-${index}`}>
          <Organisation organisation={organisation} expanded={expanded} />
        </dd>
      ))}
      <dd>
        <ShowMoreOrLessButton
          expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          aria-controls={organisations
            .map((_, index) => `organisation-${id}-${index}`)
            .join(' ')}
        />
      </dd>
    </>
  );
};
