import type { BFFMetadataChildReference } from '@/.server/cora/transform/bffTypes';
import {
  type BFFMetadataTypes,
  firstAttributesExistsInSecond,
  getAttributesByAttributeReferences,
} from '@/.server/data/formDefinition/formDefinition';

export const findMetadataChildReferenceByNameInDataAndAttributes = (
  metadataPool: any,
  metadataChildReferences: BFFMetadataChildReference[],
  metadataFromCurrentPresentation: any,
): BFFMetadataChildReference | undefined => {
  return metadataChildReferences.find((metadataChildReferenceCandidate) => {
    const metadataCandidate = metadataPool.get(
      metadataChildReferenceCandidate.childId,
    );
    if (
      differentNameInData(metadataCandidate, metadataFromCurrentPresentation)
    ) {
      return false;
    }

    if (
      differentNumberOfAttributes(
        metadataCandidate,
        metadataFromCurrentPresentation,
      )
    ) {
      return false;
    }

    if (noAttributesToCompare(metadataCandidate)) {
      return true;
    }

    return attributesMatch(
      metadataPool,
      metadataCandidate,
      metadataFromCurrentPresentation,
    );
  });
};

const differentNameInData = (
  metadataCandidate: BFFMetadataTypes,
  metadataFromCurrentPresentation: BFFMetadataTypes,
) => {
  return (
    metadataCandidate.nameInData !== metadataFromCurrentPresentation.nameInData
  );
};

const differentNumberOfAttributes = (
  metadataCandidate: BFFMetadataTypes,
  metadataFromCurrentPresentation: BFFMetadataTypes,
) => {
  return (
    metadataCandidate.attributeReferences?.length !==
    metadataFromCurrentPresentation.attributeReferences?.length
  );
};

const noAttributesToCompare = (metadataCandidate: BFFMetadataTypes) => {
  return (
    metadataCandidate.attributeReferences?.length === undefined ||
    metadataCandidate.attributeReferences?.length === 0
  );
};

const attributesMatch = (
  metadataPool: any,
  metadataCandidate: any,
  metadataFromCurrentPresentation: any,
) => {
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
