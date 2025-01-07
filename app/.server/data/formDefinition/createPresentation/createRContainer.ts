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
  BFFMetadataChildReference,
  BFFPresentationContainer,
} from '@/.server/cora/transform/bffTypes';

export const createRContainer = (
  presentation: BFFPresentationContainer,
  metadataChildReferences: BFFMetadataChildReference[],
) => {
  const metadataId = presentation.presentationOf;
  const metaDataChildRef = findMetadataChildReferenceById(
    metadataId,
    metadataChildReferences,
  );
  return [metaDataChildRef];
};

const findMetadataChildReferenceById = (
  childId: string,
  metadataChildReferences: BFFMetadataChildReference[],
) => {
  const metaDataChildRef = metadataChildReferences.find(
    (reference) => reference.childId === childId,
  );
  if (metaDataChildRef === undefined) {
    throw new Error(`Child reference with childId [${childId}] does not exist`);
  }
  return metaDataChildRef;
};
