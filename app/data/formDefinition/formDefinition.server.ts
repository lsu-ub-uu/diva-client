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
} from '@/cora/transform/bffTypes.server';
import { createCollectionVariableOptions } from '@/data/formDefinition/createPresentation/createGroupOrComponent';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';

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
  metadataPool: Dependencies['metadataPool'],
  attributeReferences: BFFAttributeReference[] | undefined,
): Record<string, string[]> => {
  const attributesArray =
    attributeReferences?.map((attributeReference) => {
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
    }) ?? [];
  return Object.assign({}, ...attributesArray);
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
