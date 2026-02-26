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
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataRecordLink,
  BFFValidationType,
  Dependencies,
} from '@/cora/bffTypes.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import { determineRepeatMax, type FormMetaData } from './formDefinition.server';

export const createFormMetaData = (
  dependencies: Dependencies,
  validationTypeId: string,
  mode: 'update' | 'create',
): FormMetaData => {
  const { metadataPool, validationTypePool } = dependencies;
  const validationType: BFFValidationType =
    validationTypePool.get(validationTypeId);

  let metadataGroup: BFFMetadataGroup;
  if (mode === 'create') {
    metadataGroup = metadataPool.get(
      validationType.newMetadataGroupId,
    ) as BFFMetadataGroup;
  } else {
    metadataGroup = metadataPool.get(
      validationType.metadataGroupId,
    ) as BFFMetadataGroup;
  }

  const formRootReference = createBFFMetadataReference(metadataGroup.id);
  return createMetaDataFromChildReference(formRootReference, metadataPool);
};

export const createViewMetadata = (
  dependencies: Dependencies,
  recordTypeId: string,
) => {
  const { recordTypePool, metadataPool } = dependencies;
  const recordType = recordTypePool.get(recordTypeId);
  const metadataGroup = metadataPool.get(
    recordType.metadataId,
  ) as BFFMetadataGroup;

  const formRootReference = createBFFMetadataReference(metadataGroup.id);
  return createMetaDataFromChildReference(formRootReference, metadataPool);
};

export const createMetaDataFromChildReference = (
  metadataChildReference: BFFMetadataChildReference,
  metadataPool: Dependencies['metadataPool'],
): FormMetaData => {
  const metadata = metadataPool.get(metadataChildReference.childId);
  const repeatMin = parseInt(metadataChildReference.repeatMin);
  const repeatMax = determineRepeatMax(metadataChildReference.repeatMax);
  let children;
  let linkedRecordType;
  let finalValue;
  if ('finalValue' in metadata) {
    finalValue = metadata.finalValue;
  }

  if (metadata.type === 'group') {
    const metadataGroup = metadata as BFFMetadataGroup;
    children = metadataGroup.children.map((childRef) => {
      return createMetaDataFromChildReference(childRef, metadataPool);
    });
  }

  if (metadata.type === 'recordLink') {
    const metadataRecordLink = metadata as BFFMetadataRecordLink;
    linkedRecordType = metadataRecordLink.linkedRecordType;
  }
  return removeEmpty({
    name: metadata.nameInData,
    type: metadata.type,
    attributes: createAttributes(metadataPool, metadata),
    repeat: {
      repeatMin,
      repeatMax,
    },
    children,
    linkedRecordType,
    finalValue,
  } as FormMetaData);
};

export const createBFFMetadataReference = (
  childId: string,
  repeatMax = '1',
  repeatMin = '1',
): BFFMetadataChildReference => ({
  childId,
  repeatMax,
  repeatMin,
});

const createAttributes = (
  metadataPool: Dependencies['metadataPool'],
  metadata: BFFMetadata,
) => {
  if (
    'attributeReferences' in metadata &&
    metadata.attributeReferences !== undefined
  ) {
    const attributeEntries = metadata.attributeReferences
      .map(
        (ref) =>
          metadataPool.get(
            ref.refCollectionVarId,
          ) as BFFMetadataCollectionVariable,
      )
      .filter((collectionVar) => collectionVar.finalValue)
      .map((collectionVar) => [
        collectionVar.nameInData,
        collectionVar.finalValue,
      ]);

    if (attributeEntries.length === 0) {
      return undefined;
    }

    return Object.fromEntries(attributeEntries);
  }
};
