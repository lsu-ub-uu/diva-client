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
  FormComponentGroup,
} from '@/components/FormGenerator/types';
import type {
  BFFMetadataGroup,
  BFFPresentationGroup,
  Dependencies,
} from '@/cora/bffTypes.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import {
  type PresentationChildReferenceData,
  type Repeat,
} from './createPresentationComponent';
import type { CommonParameters } from '../utils/createCommonParameters.server';
import { convertChildStylesToGridColSpan } from '@/cora/cora-data/CoraDataUtilsPresentations.server';
import { createChildComponents } from './createChildComponents.server';
import { createHiddenComponents } from './createHiddenComponents.server';

export const createGroup = (
  dependencies: Dependencies,
  metadata: BFFMetadataGroup,
  presentation: BFFPresentationGroup,
  attributes: FormAttributeCollection[] | undefined,
  repeat: Repeat,
  presentationChildReferenceData: PresentationChildReferenceData,
  commonParameters: CommonParameters,
): FormComponentGroup => {
  const type = metadata.type;
  const presentationStyle = presentation.presentationStyle;
  const presentAs = presentation.presentAs;

  const components = createChildComponents(
    dependencies,
    metadata.children,
    presentation.children,
  );

  const hiddenComponents =
    presentation.mode === 'input'
      ? createHiddenComponents(
          dependencies,
          metadata.children,
          presentation.children,
        )
      : [];

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
    type,
    name,
    placeholder,
    mode: presentation.mode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
    presentationStyle,
    attributes,
    components: [...components, ...hiddenComponents],
    repeat,
    childStyle,
    gridColSpan,
    textStyle,
    presentationSize,
    title,
    titleHeadlineLevel,
    presentAs,
    addText,
  });
};
