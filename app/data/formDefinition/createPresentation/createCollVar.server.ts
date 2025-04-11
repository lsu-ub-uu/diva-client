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
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFPresentationBase,
  BFFPresentationChildReference,
} from '@/cora/transform/bffTypes.server';
import { createCollectionVariableOptions } from '@/data/formDefinition/createPresentation/createGroupOrComponent';
import type { Lookup } from '@/utils/structs/lookup';
import { createCommonParameters } from '@/data/formDefinition/createCommonParameters.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import { createAttributes } from './createAttributes';
import { createPresentationChildReferenceParameters } from '../createPresentationChildReferenceParameters.server';
import type {
  FormComponent,
  FormComponentCollVar,
} from '@/components/FormGenerator/types';
import { createRepeat } from './createRepeat';

export const createCollVar = (
  metadataPool: Lookup<string, BFFMetadata>,
  metadata: BFFMetadataCollectionVariable,
  presentation: BFFPresentationBase,
  metadataChildReference: BFFMetadataChildReference,
  presentationChildReference: BFFPresentationChildReference,
  alternativePresentation: FormComponent | undefined,
): FormComponentCollVar => {
  const finalValue = metadata.finalValue;
  const options = createCollectionVariableOptions(metadataPool, metadata);
  const attributes = createAttributes(
    metadata,
    metadataPool,
    undefined,
    presentation,
  );
  const type = metadata.type;
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
    type,
    name,
    placeholder,
    mode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
    options,
    finalValue,
    attributes,
    childStyle,
    textStyle,
    gridColSpan,
    presentationSize,
    title,
    titleHeadlineLevel,
    alternativePresentation,
    repeat,
  });
};
