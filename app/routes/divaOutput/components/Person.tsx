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

interface PersonProps {
  person:
    | NamePersonalGroup
    | NamePersonalDegreeSupervisorGroup
    | NamePersonalThesisAdvisorGroup
    | NamePersonalOpponentGroup;
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
        <span>
          {person.namePart_type_given?.value}
          {person.namePart_type_family?.value}
        </span>
      </Link>
    );
  }

  return (
    <span>
      {person.namePart_type_given?.value} {person.namePart_type_family?.value}
    </span>
  );
};
