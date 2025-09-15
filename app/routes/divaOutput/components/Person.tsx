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
import { useLanguage } from '@/i18n/useLanguage';
import { href, Link } from 'react-router';

type Person =
  | NamePersonalGroup
  | NamePersonalDegreeSupervisorGroup
  | NamePersonalThesisAdvisorGroup
  | NamePersonalOpponentGroup;

interface PersonProps {
  person: Person;
  expanded?: boolean;
}

export const Person = ({ person, expanded = false }: PersonProps) => {
  const language = useLanguage();

  return (
    <span>
      {formatPersonName(person)}
      {formatPersonRoles(person, language)}
    </span>
  );
};

const formatPersonName = (person: Person) => {
  const name = `${person.namePart_type_given?.value} ${person.namePart_type_family?.value}`;
  if (person.person) {
    return (
      <Link
        to={href('/:recordType/:recordId', {
          recordType: 'diva-person',
          recordId: person.person.value,
        })}
      >
        {name}
      </Link>
    );
  }
  return name;
};

const formatPersonRoles = (
  person:
    | NamePersonalGroup
    | NamePersonalDegreeSupervisorGroup
    | NamePersonalThesisAdvisorGroup
    | NamePersonalOpponentGroup,
  language: 'en' | 'sv',
) => {
  const roleTerm = person.role?.roleTerm;

  if (Array.isArray(roleTerm) && roleTerm.length > 0) {
    return ` (${roleTerm.map((role) => role.__valueText[language]).join(', ')})`;
  }

  return '';
};
