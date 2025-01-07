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
  BFFMetadata,
  BFFMetadataCollectionVariable,
  BFFPresentationBase,
} from '@/.server/cora/transform/bffTypes';
import {
  checkForAttributes,
  createCollectionVariableOptions,
} from '@/.server/data/formDefinition/createPresentation/createDetailedPresentationBasedOnPresentationType';
import type { Lookup } from '@/utils/structs/lookup';
import { createCommonParameters } from '@/.server/data/formDefinition/createCommonParameters';

export const createCollVar = (
  metadataPool: Lookup<string, BFFMetadata>,
  metadata: BFFMetadataCollectionVariable,
  presentation: BFFPresentationBase,
) => {
  const finalValue = metadata.finalValue;
  const options = createCollectionVariableOptions(metadataPool, metadata);
  const attributes = checkForAttributes(
    metadata,
    metadataPool,
    undefined,
    presentation,
  );
  const commonParameters = createCommonParameters(metadata, presentation);
  return { ...commonParameters, options, finalValue, attributes };
};
