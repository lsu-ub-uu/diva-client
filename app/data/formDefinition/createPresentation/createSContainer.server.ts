/*
 * Copyright 2025 Uppsala University Library
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
  BFFMetadataBase,
  BFFMetadataChildReference,
  BFFPresentationContainer,
  BFFPresentationSurroundingContainer,
} from '@/cora/transform/bffTypes.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import type { Lookup } from '@/utils/structs/lookup';
import { findMetadataChildReferenceByNameInDataAndAttributes } from '@/data/formDefinition/findMetadataChildReferenceByNameInDataAndAttributes.server';

export const createSContainer = (
  presentation: BFFPresentationContainer,
  metadataChildReferences: BFFMetadataChildReference[],
  dependencies: Dependencies,
) => {
  const presentationMetadataIds =
    (presentation as BFFPresentationSurroundingContainer).presentationsOf ?? [];
  return metadataChildReferences.filter((definitionChildRef) => {
    if (
      checkIfPresentationIncludesMetadataId(
        presentationMetadataIds,
        definitionChildRef,
      )
    ) {
      return true;
    }

    return matchPresentationWithMetadata(
      dependencies.metadataPool,
      presentationMetadataIds,
      definitionChildRef,
    );
  });
};

const checkIfPresentationIncludesMetadataId = (
  presentationMetadataIds: string[],
  definitionChildRef: BFFMetadataChildReference,
) => {
  return presentationMetadataIds.includes(definitionChildRef.childId);
};

const matchPresentationWithMetadata = (
  metadataPool: Lookup<string, BFFMetadataBase>,
  presentationMetadataIds: string[],
  definitionChildRef: BFFMetadataChildReference,
) => {
  const metadataFromCurrentPresentation = metadataPool.get(
    presentationMetadataIds[0],
  );

  return findMetadataChildReferenceByNameInDataAndAttributes(
    metadataPool,
    [definitionChildRef],
    metadataFromCurrentPresentation,
  );
};
