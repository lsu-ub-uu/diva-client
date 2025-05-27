import { href, Link } from 'react-router';
import type {
  NameOrganisationDegreeGrantingInstitutionGroup,
  NameOrganisationGroup,
} from '@/generatedTypes/divaTypes';

interface OrganisationProps {
  organisation:
    | NameOrganisationGroup
    | NameOrganisationDegreeGrantingInstitutionGroup;
}

export const Organisation = ({ organisation }: OrganisationProps) => {
  if (organisation.organisation) {
    return (
      <Link
        to={href('/:recordType/:recordId', {
          recordType: 'diva-organisation',
          recordId: organisation.organisation?.value,
        })}
      >
        <span>{organisation.namePart?.value}</span>
      </Link>
    );
  }

  return <span>{organisation.namePart?.value}</span>;
};
