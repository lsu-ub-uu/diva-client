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
  FormComponentRecordLink,
} from '@/components/FormGenerator/types';
import type {
  BFFMetadataChildReference,
  BFFMetadataRecordLink,
  BFFPresentationChildReference,
  BFFPresentationRecordLink,
} from '@/cora/transform/bffTypes.server';
import { createCommonParameters } from '@/data/formDefinition/createCommonParameters.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import { createPresentationChildReferenceParameters } from '../createPresentationChildReferenceParameters.server';
import type { Dependencies } from '../formDefinitionsDep.server';
import { createAttributes } from './createAttributes';
import { createRecordLinkSearchPresentation } from './createRecordLinkSearchPresentation.server';
import { createRepeat } from './createRepeat.server';

export const createRecordLink = (
  dependencies: Dependencies,
  metadata: BFFMetadataRecordLink,
  presentation: BFFPresentationRecordLink,
  metadataChildReference: BFFMetadataChildReference,
  presentationChildReference: BFFPresentationChildReference,
  alternativePresentation: FormComponent | undefined,
): FormComponentRecordLink => {
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

  const repeat = createRepeat(
    presentationChildReference,
    metadataChildReference,
  );

  const attributes = createAttributes(
    metadata,
    dependencies.metadataPool,
    undefined,
    presentation.mode,
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
    recordLinkType,
    searchPresentation,
    linkedRecordPresentation,
    presentationRecordLinkId,
    presentAs: presentation.presentAs,
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
