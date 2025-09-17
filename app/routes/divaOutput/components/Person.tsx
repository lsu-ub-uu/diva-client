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
  AffiliationPersonalGroup,
  NamePersonalDegreeSupervisorGroup,
  NamePersonalGroup,
  NamePersonalOpponentGroup,
  NamePersonalThesisAdvisorGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { href, Link } from 'react-router';
import { formatPersonName } from '../utils/formatPersonName';

export type PersonType =
  | NamePersonalGroup
  | NamePersonalDegreeSupervisorGroup
  | NamePersonalThesisAdvisorGroup
  | NamePersonalOpponentGroup;

interface PersonProps {
  person: PersonType;
  expanded?: boolean;
}

export const Person = ({ person, expanded = false }: PersonProps) => {
  const language = useLanguage();

  return (
    <span className='person'>
      {renderPersonName(person)}
      {formatPersonRoles(person, language)}
      {expanded && person.affiliation && person.affiliation.length > 0 && (
        <ul>
          {person.affiliation.map((affiliation, index) => (
            <li key={index}>{formatAffiliationName(affiliation)}</li>
          ))}
        </ul>
      )}
    </span>
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

const formatAffiliationName = (affiliation: AffiliationPersonalGroup) => {
  const affiliationName = affiliation.name_type_corporate?.namePart?.value;
  const linkedOrganisationName = affiliation.organisation?.displayName;

  return affiliationName || linkedOrganisationName || '';
};
