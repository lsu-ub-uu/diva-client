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
  FormAttributeCollection,
  FormComponentTextVar,
} from '@/components/FormGenerator/types';
import type {
  BFFMetadataTextVariable,
  BFFPresentationTextVar,
} from '@/cora/bffTypes.server';
import { convertChildStylesToGridColSpan } from '@/cora/cora-data/CoraDataUtilsPresentations.server';
import { type CommonParameters } from '@/data/formDefinition/utils/createCommonParameters.server';
import { createTextVariableValidation } from '@/data/formDefinition/utils/formValidation.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import type {
  PresentationChildReferenceData,
  Repeat,
} from './createPresentationComponent';

export const createTextVar = (
  metadata: BFFMetadataTextVariable,
  presentation: BFFPresentationTextVar,
  attributes: FormAttributeCollection[] | undefined,
  repeat: Repeat,
  presentationChildReferenceData: PresentationChildReferenceData,
  commonParameters: CommonParameters,
): FormComponentTextVar => {
  const validation = createTextVariableValidation(metadata);
  const finalValue = metadata.finalValue;
  const inputFormat = presentation.inputFormat;
  const type = metadata.type;

  const inputType = presentation.inputType;
  const {
    childStyle,
    textStyle,
    presentationSize,
    title,
    titleHeadlineLevel,
    addText,
  } = presentationChildReferenceData;

  const gridColSpan = convertChildStylesToGridColSpan(childStyle ?? []);

  const {
    name,
    placeholder,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
  } = commonParameters;

  return removeEmpty({
    presentationId: presentation.id,
    name,
    placeholder,
    mode: presentation.mode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
    type,
    validation,
    finalValue,
    inputFormat,
    attributes,
    repeat,
    childStyle,
    textStyle,
    gridColSpan,
    presentationSize,
    title,
    titleHeadlineLevel,
    inputType,
    addText,
  });
};
