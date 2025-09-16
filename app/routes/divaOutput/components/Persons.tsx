import { ShowMoreOrLessButton } from '@/components/CollapsableText/ShowMoreOrLessButton';
import type { BFFOrganisation } from '@/cora/transform/bffTypes.server';
import type { NamePersonalGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { useId, useState } from 'react';
import { Person } from './Person';

interface PersonsProps {
  persons?: NamePersonalGroup[];
  organisations: Record<string, BFFOrganisation>;
}

export const Persons = ({ persons, organisations }: PersonsProps) => {
  const id = useId();
  const language = useLanguage();

  const [expanded, setExpanded] = useState(false);
  if (!persons || persons.length === 0) {
    return null;
  }

  return (
    <div id={id}>
      <dt>{persons?.[0]?.__text[language]}</dt>
      {expanded ? (
        <ExpandedPersons persons={persons} organisations={organisations} />
      ) : (
        <CollapsedPersons persons={persons} organisations={organisations} />
      )}
      <ShowMoreOrLessButton
        onClick={() => setExpanded(!expanded)}
        expanded={expanded}
        aria-controls={id}
      />
    </div>
  );
};

const CollapsedPersons = ({
  persons,
  organisations,
}: {
  persons: NamePersonalGroup[];
  organisations: Record<string, BFFOrganisation>;
}) => {
  const slicedPersons = persons.length > 3 ? persons.slice(0, 3) : persons;

  return (
    <>
      {slicedPersons && (
        <>
          {slicedPersons?.map((person, index) => (
            <dd key={index}>
              <Person
                person={person}
                key={index}
                organisations={organisations}
              />
            </dd>
          ))}
          {slicedPersons.length < persons.length && <dd>et al.</dd>}
        </>
      )}
    </>
  );
};

const ExpandedPersons = ({
  persons,
  organisations,
}: {
  persons: NamePersonalGroup[];
  organisations: Record<string, BFFOrganisation>;
}) => {
  return persons?.map((person, index) => (
    <dd key={index} className='block'>
      <Person
        person={person}
        key={index}
        expanded
        organisations={organisations}
      />
    </dd>
  ));
};
