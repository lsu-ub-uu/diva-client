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

import type { BFFOrganisation } from '@/cora/transform/bffTypes.server';
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
  organisations: Record<string, BFFOrganisation>;
  expanded?: boolean;
}

export const Person = ({
  person,
  expanded = false,
  organisations,
}: PersonProps) => {
  const language = useLanguage();

  return (
    <span className='person'>
      {renderPersonName(person)}
      {formatPersonRoles(person, language)}
      {expanded && person.affiliation && person.affiliation.length > 0 && (
        <ul>
          {person.affiliation.map((affiliation, index) => (
            <li key={index}>{renderAffiliation(affiliation, organisations)}</li>
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

const renderAffiliation = (
  affiliation: AffiliationPersonalGroup,
  organisations: Record<string, BFFOrganisation>,
) => {
  const affiliationName = formatAffiliationName(affiliation, organisations);
  const linkedOrganisationId = affiliation.organisation?.value;
  //const orgnation = organisationPool.get(linkedOrganisation || '');
  const linkedRecordType =
    affiliation.organisation?.linkedRecord?.organisation?.recordInfo?.type
      ?.value ?? 'diva-organisation';

  if (linkedOrganisationId) {
    return (
      <Link
        to={href('/:recordType/:recordId', {
          recordType: linkedRecordType,
          recordId: linkedOrganisationId,
        })}
      >
        {affiliationName}
      </Link>
    );
  }
  return affiliationName;
};

const formatAffiliationName = (
  affiliation: AffiliationPersonalGroup,
  organisations: Record<string, BFFOrganisation>,
) => {
  const affiliationName = affiliation.name_type_corporate?.namePart?.value;
  const linkedOrganisationId = affiliation.organisation?.value;
  if (affiliationName) {
    return affiliationName;
  }
  if (linkedOrganisationId) {
    return formatLinkedOrganisationName(linkedOrganisationId, organisations);
  }
  return '';
};

const formatLinkedOrganisationName = (
  linkedOrganisationId: string,
  organisations: Record<string, BFFOrganisation>,
): string => {
  const linkedOrganisation = organisations[linkedOrganisationId];

  if (linkedOrganisation.parentOrganisationId) {
    return `${linkedOrganisation.name.sv}, ${formatLinkedOrganisationName(
      linkedOrganisation.parentOrganisationId,
      organisations,
    )}`;
  }

  return linkedOrganisation.name.sv;
};
