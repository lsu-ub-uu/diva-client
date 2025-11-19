import type {
  NameOrganisationDegreeGrantingInstitutionGroup,
  NameOrganisationGroup,
  NameOrganisationPatentHolderGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { Term } from './Term';
import { OpenInNewIcon } from '@/icons';

export interface OrganisationProps {
  organisation:
    | NameOrganisationGroup
    | NameOrganisationDegreeGrantingInstitutionGroup
    | NameOrganisationPatentHolderGroup;
  expanded?: boolean;
}

export const Organisation = ({ organisation, expanded }: OrganisationProps) => {
  const language = useLanguage();

  if (!expanded) {
    return formatOrganisationName(organisation, language);
  }

  return (
    <div className='expanded-card'>
      <span className='name'>
        {formatOrganisationName(organisation, language)}
      </span>
      {formatOrganisationRoles(organisation, language)}
      <dl>
        {organisation.identifier_type_ror && (
          <Term
            label={organisation.identifier_type_ror.__text?.[language]}
            value={
              <a
                href={`https://ror.org/${organisation.identifier_type_ror.value}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {organisation.identifier_type_ror.value} <OpenInNewIcon />
              </a>
            }
          />
        )}

        {'description' in organisation && organisation.description && (
          <Term
            label={organisation.description.__text?.[language]}
            value={organisation.description.value}
          />
        )}
      </dl>
    </div>
  );
};

export const formatOrganisationName = (
  organisation: OrganisationProps['organisation'],
  language: 'en' | 'sv',
) => {
  if (organisation.namePart?.value) {
    return organisation.namePart.value;
  }

  if ('organisation' in organisation) {
    const displayName = organisation.organisation?.displayName?.[language];
    const linkedRecordSwedishName =
      organisation.organisation?.linkedRecord?.organisation?.authority_lang_swe
        ?.name_type_corporate?.namePart?.value;
    const linkedRecordEnglishName =
      organisation.organisation?.linkedRecord?.organisation?.variant_lang_eng
        ?.name_type_corporate?.namePart?.value;

    if (displayName) {
      return displayName;
    }
    if (language === 'en' && linkedRecordEnglishName) {
      return linkedRecordEnglishName;
    }
    return linkedRecordSwedishName;
  }

  return '';
};

const formatOrganisationRoles = (
  organisation: OrganisationProps['organisation'],
  language: 'en' | 'sv',
) => {
  const roleTerm =
    organisation.role &&
    'roleTerm' in organisation.role &&
    organisation.role?.roleTerm;

  if (Array.isArray(roleTerm) && roleTerm.length > 0) {
    return ` (${roleTerm.map((role) => role.__valueText?.[language]).join(', ')})`;
  }

  return '';
};
