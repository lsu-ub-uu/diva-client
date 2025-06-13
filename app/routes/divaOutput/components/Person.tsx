/*
 * Copyright 2025 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import type {
  NamePersonalDegreeSupervisorGroup,
  NamePersonalGroup,
  NamePersonalOpponentGroup,
  NamePersonalThesisAdvisorGroup,
} from '@/generatedTypes/divaTypes';
import { href, Link } from 'react-router';

type Person =
  | NamePersonalGroup
  | NamePersonalDegreeSupervisorGroup
  | NamePersonalThesisAdvisorGroup
  | NamePersonalOpponentGroup;

interface PersonProps {
  person: Person;
}

export const Person = ({ person }: PersonProps) => {
  // TODO show affiliation and role
  if (person.person) {
    return (
      <Link
        to={href('/:recordType/:recordId', {
          recordType: 'diva-person',
          recordId: person.person.value,
        })}
      >
        <span>{formatPersonName(person)}</span>
      </Link>
    );
  }

  return <span>{formatPersonName(person)}</span>;
};

function formatPersonName(person: Person): string {
  const linkedName =
    person.person?.linkedRecord?.person?.authority?.name_type_personal;

  const givenName =
    person.namePart_type_given?.value ?? linkedName?.namePart_type_given?.value;

  const familyName =
    person.namePart_type_family?.value ??
    linkedName?.namePart_type_family?.value;

  return [givenName, familyName].filter(Boolean).join(' ');
}
