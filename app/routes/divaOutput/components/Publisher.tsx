import type { NameOrganisationPublisherGroup } from '@/generatedTypes/divaTypes';

export const Publisher = ({
  publisher,
}: {
  publisher: NameOrganisationPublisherGroup;
}) => {
  return formatPublisher(publisher);
};

export const formatPublisher = (publisher: NameOrganisationPublisherGroup) => {
  const parts: string[] = [];

  const name = getPublisherName(publisher);
  const imprint = publisher.namePart_type_imprint?.value;
  const place = publisher.place?.placeTerm?.value;

  if (name) {
    parts.push(imprint ? `${name} (${imprint})` : name);
  }

  if (place) {
    parts.push(place);
  }

  return parts.join(', ');
};

const getPublisherName = (publisher: NameOrganisationPublisherGroup) => {
  const linkedName =
    publisher.publisher?.linkedRecord?.publisher?.name_type_corporate?.namePart
      ?.value;

  return linkedName ?? publisher.namePart_type_publisher?.value ?? '';
};
