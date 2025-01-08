/*
 * Copyright 2023 Uppsala University Library
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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import type {
  BFFAttributeReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataNumberVariable,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
  BFFPresentationRecordLink,
} from '@/.server/cora/transform/bffTypes';
import { createCollectionVariableOptions } from '@/.server/data/formDefinition/createPresentation/createDetailedPresentationBasedOnPresentationType';

export type BFFMetadataTypes =
  | BFFMetadataCollectionVariable
  | BFFMetadataNumberVariable
  | BFFMetadataTextVariable
  | BFFMetadataRecordLink
  | BFFMetadataGroup;

interface FormMetaDataRepeat {
  repeatMin: number;
  repeatMax: number;
}

export interface FormMetaData {
  type:
    | 'group'
    | 'numberVariable'
    | 'resourceLink'
    | 'recordLink'
    | 'textVariable'
    | 'collectionVariable';
  name: string;
  repeat: FormMetaDataRepeat;
  children?: FormMetaData[];
  linkedRecordType?: string;
  attributes?: {
    [key: string]: string;
  };
  finalValue?: string;
}

/**
 * Gets attributes by attribute references
 * @param metadataPool
 * @param attributeReferences
 */
export const getAttributesByAttributeReferences = (
  metadataPool: any,
  attributeReferences: BFFAttributeReference[],
): Record<string, string[]> => {
  const attributesArray = attributeReferences.map((attributeReference) => {
    const attributeCollectionVar = metadataPool.get(
      attributeReference.refCollectionVarId,
    ) as BFFMetadataCollectionVariable;

    if (attributeCollectionVar.finalValue) {
      return {
        [attributeCollectionVar.nameInData]: [
          attributeCollectionVar.finalValue,
        ],
      };
    }

    const itemCollection = createCollectionVariableOptions(
      metadataPool,
      attributeCollectionVar,
    );
    const itemCollectionValues = itemCollection.map((item) => item.value);
    return { [attributeCollectionVar.nameInData]: itemCollectionValues };
  });
  return Object.assign({}, ...attributesArray);
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

export const determineRepeatMax = (value: string) => {
  const infiniteNumberOfRepeat = 'X';
  if (value === infiniteNumberOfRepeat) {
    return Number.MAX_VALUE;
  }
  return parseInt(value);
};

export const hasLinkedPresentation = (
  rLPresentation: BFFPresentationRecordLink,
): boolean => {
  if (rLPresentation.linkedRecordPresentations === undefined) {
    return false;
  }
  return rLPresentation.linkedRecordPresentations.length > 0;
};
