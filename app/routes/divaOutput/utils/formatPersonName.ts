import type { PersonType } from '../components/Person';

export const formatPersonName = (person: PersonType) => {
  const familyName = person.namePart_type_family?.value || '';
  const givenName = person.namePart_type_given?.value || '';

  const linkedFamilyName =
    person.person?.linkedRecord?.person?.authority?.name_type_personal
      ?.namePart_type_family?.value;
  const linkedGivenName =
    person.person?.linkedRecord?.person?.authority?.name_type_personal
      ?.namePart_type_given?.value;

  if (!familyName && !givenName && (linkedFamilyName || linkedGivenName)) {
    return [linkedGivenName, linkedFamilyName].filter(Boolean).join(' ');
  }

  return [givenName, familyName].filter(Boolean).join(' ');
};
