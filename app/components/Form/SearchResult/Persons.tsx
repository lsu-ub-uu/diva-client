import { type PersonType } from '@/routes/divaOutput/components/Person';
import { formatPersonName } from '@/routes/divaOutput/utils/formatPersonName';
import { useId, useState } from 'react';
import { href, Link } from 'react-router';
import styles from './Persons.module.css';

interface PersonsProps {
  persons?: PersonType[];
}

const PERSONS_TO_SHOW_LIMIT = 3;

export const Persons = ({ persons }: PersonsProps) => {
  const id = useId();
  const [expanded, setExpanded] = useState(false);

  if (!persons || persons.length === 0) {
    return null;
  }

  const personsToShow = expanded
    ? persons
    : persons.slice(0, PERSONS_TO_SHOW_LIMIT);

  return (
    <>
      {personsToShow?.map((person, index) => (
        <dd
          key={index}
          id={`person-${id}-${index}`}
          className={styles['person']}
        >
          {renderPersonName(person)}
        </dd>
      ))}
      {personsToShow.length < persons.length && <dd>et al.</dd>}
    </>
  );
};

const renderPersonName = (person: PersonType) => {
  const name = formatPersonName(person);
  const linkedRecordType =
    person.person?.linkedRecord?.person?.recordInfo?.type?.value ??
    'diva-person';
  if (person.person) {
    return (
      <Link
        to={href('/:recordType/:recordId', {
          recordType: linkedRecordType,
          recordId: person.person.value,
        })}
      >
        {name}
      </Link>
    );
  }
  return name;
};
