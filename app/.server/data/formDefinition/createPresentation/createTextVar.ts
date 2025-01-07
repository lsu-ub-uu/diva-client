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
  BFFMetadataTextVariable,
  BFFPresentationBase,
} from '@/.server/cora/transform/bffTypes';
import { createTextVariableValidation } from '@/.server/data/formDefinition/formValidation';
import { checkForAttributes } from '@/.server/data/formDefinition/createPresentation/createDetailedPresentationBasedOnPresentationType';
import type { Lookup } from '@/utils/structs/lookup';
import { createCommonParameters } from '@/.server/data/formDefinition/createCommonParameters';
import { removeEmpty } from '@/utils/structs/removeEmpty';

export const createTextVar = (
  metadataPool: Lookup<string, BFFMetadata>,
  metadata: BFFMetadataTextVariable,
  presentation: BFFPresentationBase,
) => {
  const validation = createTextVariableValidation(metadata);
  const finalValue = metadata.finalValue;
  const inputFormat = presentation.inputFormat;
  const attributes = checkForAttributes(
    metadata,
    metadataPool,
    undefined,
    presentation,
  );
  const commonParameters = createCommonParameters(metadata, presentation);
  return removeEmpty({
    ...commonParameters,
    validation,
    finalValue,
    inputFormat,
    attributes,
  });
};
