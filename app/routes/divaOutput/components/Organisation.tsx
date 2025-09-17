import type {
  NameOrganisationDegreeGrantingInstitutionGroup,
  NameOrganisationGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';

interface OrganisationProps {
  organisation:
    | NameOrganisationGroup
    | NameOrganisationDegreeGrantingInstitutionGroup;
}

export const Organisation = ({ organisation }: OrganisationProps) => {
  const language = useLanguage();

  return (
    <span>
      {formatOrganisationName(organisation)}
      {formatOrganisationRoles(organisation, language)}
    </span>
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
