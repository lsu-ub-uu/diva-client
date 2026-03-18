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
  FormComponentRecordLink,
} from '@/components/FormGenerator/types';
import type {
  BFFMetadataRecordLink,
  BFFPresentationRecordLink,
  Dependencies,
} from '@/cora/bffTypes.server';
import { convertChildStylesToGridColSpan } from '@/cora/cora-data/CoraDataUtilsPresentations.server';
import { type CommonParameters } from '@/data/formDefinition/utils/createCommonParameters.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import type {
  PresentationChildReferenceData,
  Repeat,
} from './createPresentationComponent';
import { createRecordLinkSearchPresentation } from './createRecordLinkSearchPresentation.server';

export const createRecordLink = (
  dependencies: Dependencies,
  metadata: BFFMetadataRecordLink,
  presentation: BFFPresentationRecordLink,
  attributes: FormAttributeCollection[] | undefined,
  repeat: Repeat,
  presentationChildReferenceData: PresentationChildReferenceData,
  commonParameters: CommonParameters,
): FormComponentRecordLink => {
  const finalValue = metadata.finalValue;
  const recordLinkType = metadata.linkedRecordType;
  const type = metadata.type;
  let searchPresentation;
  if (presentation.search !== undefined) {
    searchPresentation = createRecordLinkSearchPresentation(
      dependencies,
      presentation.search,
    );
  }
  let linkedRecordPresentation;
  if (presentation.linkedRecordPresentations !== undefined) {
    linkedRecordPresentation = presentation.linkedRecordPresentations[0];
  }
  const presentationRecordLinkId = presentation.id;

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
    recordLinkType,
    searchPresentation,
    linkedRecordPresentation,
    presentationRecordLinkId,
    presentAs: presentation.presentAs,
    finalValue,
    attributes,
    repeat,
    childStyle,
    textStyle,
    gridColSpan,
    presentationSize,
    title,
    titleHeadlineLevel,
    addText,
  });
};
