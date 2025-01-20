import type {
  BFFMetadata,
  BFFMetadataChildReference,
} from '@/cora/transform/bffTypes.server';
import {
  type BFFMetadataTypes,
  getAttributesByAttributeReferences,
} from '@/data/formDefinition/formDefinition.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';

export const findMetadataChildReferenceByNameInDataAndAttributes = (
  metadataPool: Dependencies['metadataPool'],
  metadataChildReferences: BFFMetadataChildReference[],
  metadataFromCurrentPresentation: BFFMetadata,
): BFFMetadataChildReference | undefined => {
  return metadataChildReferences.find((metadataChildReferenceCandidate) => {
    const metadataCandidate = metadataPool.get(
      metadataChildReferenceCandidate.childId,
    );
    return doesMetadataAndPresentationMatch(
      metadataPool,
      metadataCandidate,
      metadataFromCurrentPresentation,
    );
  });
};

export const doesMetadataAndPresentationMatch = (
  metadataPool: Dependencies['metadataPool'],
  metadata: BFFMetadata,
  metadataFromPresentation: BFFMetadata,
) => {
  if (differentNameInData(metadata, metadataFromPresentation)) {
    return false;
  }

  if (differentNumberOfAttributes(metadata, metadataFromPresentation)) {
    return false;
  }

  if (noAttributesToCompare(metadata)) {
    return true;
  }

  return attributesMatch(metadataPool, metadata, metadataFromPresentation);
};

const differentNameInData = (
  metadataCandidate: BFFMetadata,
  metadataFromCurrentPresentation: BFFMetadata,
) => {
  return (
    metadataCandidate.nameInData !== metadataFromCurrentPresentation.nameInData
  );
};

const isMetadatataWithAttributes = (
  metadata: BFFMetadata,
): metadata is BFFMetadataTypes => {
  return 'attributeReferences' in metadata;
};

const differentNumberOfAttributes = (
  metadataCandidate: BFFMetadata,
  metadataFromCurrentPresentation: BFFMetadata,
) => {
  if (
    !isMetadatataWithAttributes(metadataCandidate) ||
    !isMetadatataWithAttributes(metadataFromCurrentPresentation)
  ) {
    return false;
  }

  return (
    metadataCandidate.attributeReferences?.length !==
    metadataFromCurrentPresentation.attributeReferences?.length
  );
};

const noAttributesToCompare = (metadataCandidate: BFFMetadata) => {
  if (!isMetadatataWithAttributes(metadataCandidate)) {
    return true;
  }

  return (
    metadataCandidate.attributeReferences?.length === undefined ||
    metadataCandidate.attributeReferences?.length === 0
  );
};

const attributesMatch = (
  metadataPool: Dependencies['metadataPool'],
  metadataCandidate: BFFMetadata,
  metadataFromCurrentPresentation: BFFMetadata,
) => {
  if (
    !isMetadatataWithAttributes(metadataCandidate) ||
    !isMetadatataWithAttributes(metadataFromCurrentPresentation)
  ) {
    return false;
  }

  const currentPresentationAttributes = getAttributesByAttributeReferences(
    metadataPool,
    metadataFromCurrentPresentation.attributeReferences,
  );
  const candidateAttributes = getAttributesByAttributeReferences(
    metadataPool,
    metadataCandidate.attributeReferences,
  );
  return firstAttributesExistsInSecond(
    candidateAttributes,
    currentPresentationAttributes,
  );
};

export const firstAttributesExistsInSecond = (
  inAttributes1: Record<string, string[]> | undefined,
  inAttributes2: Record<string, string[]> | undefined,
) => {
  const attributes1 = inAttributes1 ?? {};
  const attributes2 = inAttributes2 ?? {};

  const attributeKeys1 = Object.keys(attributes1);
  const attributeKeys2 = Object.keys(attributes2);

  if (attributeKeys1.length !== attributeKeys2.length) {
    return false;
  }
  if (attributeKeys1.length === 0) {
    return true;
  }

  return existingFirstAttributesExistsInSecond(attributes1, attributes2);
};

const existingFirstAttributesExistsInSecond = (
  attributes1: Record<string, string[]>,
  attributes2: Record<string, string[]>,
) => {
  const attributeKeys1 = Object.keys(attributes1);
  const checkAttributeExistsInAttributes2 = createCheckFunction(
    attributes1,
    attributes2,
  );
  return attributeKeys1.every(checkAttributeExistsInAttributes2);
};

const createCheckFunction = (
  attributes1: Record<string, string[]>,
  attributes2: Record<string, string[]>,
) => {
  return (attributeKey: string) => {
    const attributeValues1 = attributes1[attributeKey];
    const attributeValues2 = attributes2[attributeKey];
    if (attributeValues2 === undefined) {
      return false;
    }
    const functionAttribute2ContainsValue =
      createValueCheckFunction(attributeValues2);
    return attributeValues1.every(functionAttribute2ContainsValue);
  };
};

const createValueCheckFunction = (attributeValues2: string[]) => {
  return (attributeValue: string) => {
    return attributeValues2.indexOf(attributeValue) > -1;
  };
};
