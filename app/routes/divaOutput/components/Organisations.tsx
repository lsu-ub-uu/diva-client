import { ShowMoreOrLessButton } from '@/components/CollapsableText/ShowMoreOrLessButton';
import { useLanguage } from '@/i18n/useLanguage';
import { useId, useState } from 'react';
import { Organisation, type OrganisationProps } from './Organisation';

interface OrganisationsProps {
  organisations?: OrganisationProps['organisation'][];
}

export const Organisations = ({ organisations }: OrganisationsProps) => {
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const language = useLanguage();

  if (!organisations || organisations.length === 0) {
    return null;
  }

  const expandable = organisations.length > 3 || organisations.some(hasDetails);
  const organisationsToShow = expanded
    ? organisations
    : organisations.slice(0, 3);
  return (
    <>
      <dt>{organisations?.[0]?.__text?.[language]}</dt>
      {organisationsToShow?.map((organisation, index) => (
        <dd
          key={index}
          className={expanded ? 'block' : ''}
          id={`organisation-${id}-${index}`}
        >
          <Organisation organisation={organisation} expanded={expanded} />
        </dd>
      ))}
      {expandable && (
        <dd>
          <ShowMoreOrLessButton
            expanded={expanded}
            onClick={() => setExpanded(!expanded)}
            aria-controls={organisationsToShow
              .map((_, index) => `organisation-${id}-${index}`)
              .join(' ')}
          />
        </dd>
      )}
    </>
  );
};

const hasDetails = (organisation: OrganisationProps['organisation']) => {
  return (
    !!organisation.role ||
    !!organisation.identifier_type_ror ||
    ('description' in organisation && !!organisation.description)
  );
};
