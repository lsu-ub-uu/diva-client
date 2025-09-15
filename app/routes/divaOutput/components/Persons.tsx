import type { NamePersonalGroup } from '@/generatedTypes/divaTypes';
import { useState } from 'react';
import { Person } from './Person';
import { useLanguage } from '@/i18n/useLanguage';
import { Button } from '@/components/Button/Button';
import { ChevronDownIcon } from '@/icons';

interface PersonsProps {
  persons?: NamePersonalGroup[];
}

export const Persons = ({ persons }: PersonsProps) => {
  const language = useLanguage();

  const [expanded, setExpanded] = useState(false);
  if (!persons || persons.length === 0) {
    return null;
  }

  return (
    <div>
      <dt>{persons?.[0]?.__text[language]}</dt>
      {expanded ? (
        <ExpandedPersons persons={persons} />
      ) : (
        <CollapsedPersons persons={persons} />
      )}
      <Button
        variant='tertiary'
        size='small'
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show Less' : 'Visa mer'}{' '}
        <ChevronDownIcon
          style={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </Button>
    </div>
  );
};

const CollapsedPersons = ({ persons }: { persons: NamePersonalGroup[] }) => {
  const language = useLanguage();

  const slicedPersons = persons.length > 3 ? persons.slice(0, 3) : persons;

  return (
    <>
      {slicedPersons && (
        <>
          {slicedPersons?.map((person, index) => (
            <dd key={index}>
              <Person person={person} key={index} />
            </dd>
          ))}
          {slicedPersons.length < persons.length && <dd>et al.</dd>}
        </>
      )}
    </>
  );
};

const ExpandedPersons = ({ persons }: { persons: NamePersonalGroup[] }) => {
  return persons?.map((person, index) => (
    <dd key={index} className='block'>
      <Person person={person} key={index} expanded />
    </dd>
  ));
};
