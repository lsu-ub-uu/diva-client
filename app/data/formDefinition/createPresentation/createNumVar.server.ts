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
  FormComponent,
  FormComponentNumVar,
} from '@/components/FormGenerator/types';
import type {
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataNumberVariable,
  BFFPresentationBase,
  BFFPresentationChildReference,
} from '@/cora/transform/bffTypes.server';
import { createCommonParameters } from '@/data/formDefinition/createCommonParameters.server';
import { createNumberVariableValidation } from '@/data/formDefinition/formValidation.server';
import type { Lookup } from '@/utils/structs/lookup';
import { createPresentationChildReferenceParameters } from '../createPresentationChildReferenceParameters.server';
import { createAttributes } from './createAttributes';
import { createRepeat } from './createRepeat.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';

export const createNumVar = (
  metadataPool: Lookup<string, BFFMetadata>,
  metadata: BFFMetadataNumberVariable,
  presentation: BFFPresentationBase,
  metadataChildReference: BFFMetadataChildReference,
  presentationChildReference: BFFPresentationChildReference,
  alternativePresentation: FormComponent | undefined,
): FormComponentNumVar => {
  const validation = createNumberVariableValidation(metadata);
  const finalValue = metadata.finalValue;
  const type = metadata.type;
  const attributes = createAttributes(
    metadata,
    metadataPool,
    undefined,
    presentation.mode,
  );

  const repeat = createRepeat(
    presentationChildReference,
    metadataChildReference,
  );

  const {
    childStyle,
    textStyle,
    gridColSpan,
    presentationSize,
    title,
    titleHeadlineLevel,
  } = createPresentationChildReferenceParameters(presentationChildReference);

  const {
    name,
    placeholder,
    mode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
  } = createCommonParameters(metadata, presentation);

  return removeEmpty({
    presentationId: presentation.id,
    name,
    placeholder,
    mode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
    type,
    validation,
    finalValue,
    attributes,
    repeat,
    childStyle,
    textStyle,
    gridColSpan,
    alternativePresentation,
    presentationSize,
    title,
    titleHeadlineLevel,
  });
};
