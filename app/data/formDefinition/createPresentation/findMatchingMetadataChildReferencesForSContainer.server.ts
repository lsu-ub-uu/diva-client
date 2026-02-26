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
} from '@/cora/bffTypes.server';
import type { Dependencies } from '@/cora/bffTypes.server';
import type { Lookup } from 'server/dependencies/util/lookup';
import { findMetadataChildReferenceByNameInDataAndAttributes } from '@/data/formDefinition/findMetadataChildReferenceByNameInDataAndAttributes.server';

export const findMatchingMetadataChildReferencesForSContainer = (
  presentation: BFFPresentationContainer,
  metadataChildReferences: BFFMetadataChildReference[],
  dependencies: Dependencies,
) => {
  const presentationsOf =
    (presentation as BFFPresentationSurroundingContainer).presentationsOf ?? [];

  return presentationsOf
    .map((presentationMetadataId) => {
      return metadataChildReferences.find((metadataChildRef) => {
        // If ID matches, return true
        if (metadataChildRef.childId === presentationMetadataId) {
          return true;
        }

        return matchPresentationWithMetadata(
          dependencies.metadataPool,
          presentationMetadataId,
          metadataChildRef,
        );
      });
    })
    .filter((metadata) => metadata !== undefined);
};

const matchPresentationWithMetadata = (
  metadataPool: Lookup<string, BFFMetadataBase>,
  presentationMetadataId: string,
  definitionChildRef: BFFMetadataChildReference,
) => {
  const metadataFromCurrentPresentation = metadataPool.get(
    presentationMetadataId,
  );

  return findMetadataChildReferenceByNameInDataAndAttributes(
    metadataPool,
    [definitionChildRef],
    metadataFromCurrentPresentation,
  );
};
