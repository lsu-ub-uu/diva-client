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
  BFFPresentationChildReference,
  BFFPresentationResourceLink,
  BFFResourceLink,
} from '@/cora/transform/bffTypes.server';
import { createCommonParameters } from '@/data/formDefinition/createCommonParameters.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import type {
  FormComponent,
  FormComponentResourceLink,
} from '@/components/FormGenerator/types';
import { createRepeat } from './createRepeat';
import { createPresentationChildReferenceParameters } from '../createPresentationChildReferenceParameters.server';

export const createResourceLink = (
  metadata: BFFResourceLink,
  presentation: BFFPresentationResourceLink,
  metadataChildReference: BFFMetadataChildReference,
  presentationChildReference: BFFPresentationChildReference,
  alternativePresentation: FormComponent | undefined,
): FormComponentResourceLink => {
  const type = metadata.type;
  const outputFormat = presentation.outputFormat;

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
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
    repeat,
    childStyle,
    textStyle,
    gridColSpan,
    alternativePresentation,
    presentationSize,
    title,
    titleHeadlineLevel,
    outputFormat,
  });
};
