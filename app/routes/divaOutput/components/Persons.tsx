import { ShowMoreOrLessButton } from '@/components/CollapsableText/ShowMoreOrLessButton';
import { useLanguage } from '@/i18n/useLanguage';
import { useId, useState } from 'react';
import { Person, type PersonType } from './Person';

interface PersonsProps {
  persons?: PersonType[];
}

const PERSONS_TO_SHOW_LIMIT = 3;

export const Persons = ({ persons }: PersonsProps) => {
  const language = useLanguage();
  const id = useId();
  const [expanded, setExpanded] = useState(false);

  if (!persons || persons.length === 0) {
    return null;
  }

  const personsToShow = expanded
    ? persons
    : persons.slice(0, PERSONS_TO_SHOW_LIMIT);

  const expandable =
    persons.length > PERSONS_TO_SHOW_LIMIT || persons.some(hasInfoToExpand);
  return (
    <>
      <dt>{persons?.[0]?.__text[language]}</dt>
      {personsToShow?.map((person, index) => (
        <dd
          key={index}
          id={`person-${id}-${index}`}
          className={!expandable || expanded ? 'block' : ''}
        >
          <Person person={person} key={index} expanded={expanded} />
        </dd>
      ))}
      {personsToShow.length < persons.length && <dd>et al.</dd>}
      {expandable && (
        <dd>
          <ShowMoreOrLessButton
            onClick={() => setExpanded(!expanded)}
            expanded={expanded}
            aria-controls={personsToShow
              .map((_, index) => `person-${id}-${index}`)
              .join(' ')}
          />
        </dd>
      )}
    </>
  );
};

const hasInfoToExpand = (person: PersonType) => {
  const hasAffiliations =
    person.affiliation_otherType_link !== undefined ||
    person.affiliation_otherType_text !== undefined;
  const hasRoles = person.role !== undefined;
  const hasOrcid =
    person.person?.linkedRecord?.person?.nameIdentifier_type_orcid !==
    undefined;

  return hasAffiliations || hasRoles || hasOrcid;
};
