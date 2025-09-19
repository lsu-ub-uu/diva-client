import type {
  NameOrganisationDegreeGrantingInstitutionGroup,
  NameOrganisationGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { Term } from './Term';

interface OrganisationProps {
  organisation:
    | NameOrganisationGroup
    | NameOrganisationDegreeGrantingInstitutionGroup;
  expanded?: boolean;
}

export const Organisation = ({ organisation, expanded }: OrganisationProps) => {
  const language = useLanguage();

  if (!expanded) {
    return formatOrganisationName(organisation);
  }

  return (
    <div className='expanded-card'>
      <span className='name'>{formatOrganisationName(organisation)}</span>
      {formatOrganisationRoles(organisation, language)}
      <dl>
        {organisation.identifier_type_ror && (
          <Term
            label={organisation.identifier_type_ror.__text[language]}
            value={organisation.identifier_type_ror.value}
          />
        )}

        {'description' in organisation && organisation.description && (
          <Term
            label={organisation.description.__text[language]}
            value={organisation.description.value}
          />
        )}
      </dl>
    </div>
  );
};

const formatOrganisationName = (
  organisation: OrganisationProps['organisation'],
) => {
  if (organisation.namePart?.value) {
    return organisation.namePart.value;
  }
  if (organisation.organisation?.displayName) {
    return organisation.organisation.displayName;
  }
  return '';
};

const formatOrganisationRoles = (
  organisation: OrganisationProps['organisation'],
  language: 'en' | 'sv',
) => {
  const roleTerm = organisation.role?.roleTerm;

  if (Array.isArray(roleTerm) && roleTerm.length > 0) {
    return ` (${roleTerm.map((role) => role.__valueText[language]).join(', ')})`;
  }

  return '';
};
