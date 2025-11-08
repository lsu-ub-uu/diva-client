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
import { OpenInNewIcon } from '@/icons';
import { useId } from 'react';
import { href, Link } from 'react-router';
import { formatPersonName } from '../utils/formatPersonName';
import { Term } from './Term';

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
  const id = useId();

  if (!expanded) {
    return renderPersonName(person);
  }

  return (
    <div className='expanded-card' aria-labelledby={id}>
      <span className='name' id={id}>
        {renderPersonName(person)}
      </span>
      {formatPersonRoles(person, language)}
      {person.affiliation?.map((affiliation, index) => {
        if (affiliation.organisation !== undefined) {
          return <LinkedAffiliation key={index} affiliation={affiliation} />;
        }
        return <TextAffiliation key={index} affiliation={affiliation} />;
      })}
      {person.person?.linkedRecord?.person?.nameIdentifier_type_orcid && (
        <dl>
          {/*  TODO: Add publication ORCID when its in the model*/}

          {person.person?.linkedRecord?.person?.nameIdentifier_type_orcid?.map(
            (orcid) => (
              <Term
                key={orcid.value}
                label={orcid.__text?.[language]}
                value={
                  <a
                    href={`https://orcid.org/${orcid.value}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {orcid.value}
                    <OpenInNewIcon />
                  </a>
                }
              />
            ),
          )}
        </dl>
      )}
    </div>
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

const formatTextAffiliationName = (
  affiliation: AffiliationPersonalGroup,
  language: 'sv' | 'en',
) => {
  return [
    affiliation.name_type_corporate?.namePart?.value,
    affiliation.country?.__valueText?.[language],
  ]
    .filter(Boolean)
    .join(', ');
};

const formatLinkedAffiliationName = (
  affiliation: AffiliationPersonalGroup,
  language: 'sv' | 'en',
) => {
  const linkedOrganisationDisplayName =
    affiliation.organisation?.displayName?.[language];
  const linkedRecordSwedishName =
    affiliation.organisation?.linkedRecord?.organisation?.authority_lang_swe
      ?.name_type_corporate?.namePart?.value;
  const linkedRecordEnglishName =
    affiliation.organisation?.linkedRecord?.organisation?.variant_lang_eng
      ?.name_type_corporate?.namePart?.value;

  if (linkedOrganisationDisplayName) {
    return linkedOrganisationDisplayName;
  }
  if (language === 'en' && linkedRecordEnglishName) {
    return linkedRecordEnglishName;
  }
  if (linkedRecordSwedishName) {
    return linkedRecordSwedishName;
  }
  return '';
};

const LinkedAffiliation = ({
  affiliation,
}: {
  affiliation: AffiliationPersonalGroup;
}) => {
  const language = useLanguage();
  return (
    <>
      <div className='affiliation'>
        <span>{formatLinkedAffiliationName(affiliation, language)}</span>
        <dl className='affiliation inline-definitions'>
          {affiliation.organisation?.linkedRecord.organisation
            .identifier_type_ror && (
            <Term
              label={
                affiliation.organisation.linkedRecord.organisation
                  .identifier_type_ror.__text?.[language]
              }
              value={
                affiliation.organisation.linkedRecord.organisation
                  .identifier_type_ror.value
              }
            />
          )}
        </dl>
      </div>
    </>
  );
};

const TextAffiliation = ({
  affiliation,
}: {
  affiliation: AffiliationPersonalGroup;
}) => {
  const language = useLanguage();
  return (
    <>
      <div className='affiliation'>
        <span>{formatTextAffiliationName(affiliation, language)}</span>

        <dl className='inline-definitions'>
          {affiliation.identifier_type_ror && (
            <Term
              label={affiliation.identifier_type_ror.__text?.[language]}
              value={affiliation.identifier_type_ror.value}
            />
          )}
          {affiliation.description && (
            <Term
              label={affiliation.description.__text?.[language]}
              value={affiliation.description.value}
            />
          )}
        </dl>
      </div>
    </>
  );
};
