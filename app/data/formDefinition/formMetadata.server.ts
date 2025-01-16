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
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataRecordLink,
  BFFValidationType,
} from '@/cora/transform/bffTypes.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import type { Dependencies } from './formDefinitionsDep.server';
import type { FormMetaData } from './formDefinition.server';
import { determineRepeatMax } from './formDefinition.server';
import type { dependencies } from '@/data/pool.server';

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

export const createMetaDataFromChildReference = (
  metadataChildReference: BFFMetadataChildReference,
  metadataPool: typeof dependencies.metadataPool,
): FormMetaData => {
  const metadata = metadataPool.get(metadataChildReference.childId);
  const repeatMin = parseInt(metadataChildReference.repeatMin);
  const repeatMax = determineRepeatMax(metadataChildReference.repeatMax);
  let children;
  let linkedRecordType;
  let attributes;
  let finalValue;
  if ('finalValue' in metadata) {
    finalValue = metadata.finalValue;
  }
  if (
    'attributeReferences' in metadata &&
    metadata.attributeReferences !== undefined
  ) {
    metadata.attributeReferences.map((ref: any) => {
      const attributeCollectionVar = metadataPool.get(
        ref.refCollectionVarId,
      ) as BFFMetadataCollectionVariable;
      if (attributeCollectionVar.finalValue) {
        attributes = {
          [attributeCollectionVar.nameInData]:
            attributeCollectionVar.finalValue,
        };
      }
    });
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
    attributes,
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
