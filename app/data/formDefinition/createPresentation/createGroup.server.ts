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
  BFFMetadataGroup,
  BFFPresentationChildReference,
  BFFPresentationGroup,
} from '@/cora/transform/bffTypes.server';
import { createComponentsFromChildReferences } from '@/data/formDefinition/createPresentation/createGroupOrComponent';
import { createCommonParameters } from '@/data/formDefinition/createCommonParameters.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import { createAttributes } from './createAttributes';
import type {
  FormComponent,
  FormComponentGroup,
} from '@/components/FormGenerator/types';
import { createRepeat } from './createRepeat';
import { createPresentationChildReferenceParameters } from '../createPresentationChildReferenceParameters.server';

export const createGroup = (
  dependencies: Dependencies,
  metadata: BFFMetadataGroup,
  presentation: BFFPresentationGroup,
  metadataChildReference: BFFMetadataChildReference,
  presentationChildReference: BFFPresentationChildReference,
  alternativePresentation: FormComponent | undefined,
): FormComponentGroup => {
  const type = metadata.type;
  const presentationStyle = presentation.presentationStyle;
  const presentAs = presentation.presentAs;

  const attributes = createAttributes(
    metadata,
    dependencies.metadataPool,
    undefined,
    presentation,
  );

  const components = createComponentsFromChildReferences(
    dependencies,
    metadata.children,
    presentation.children,
    false,
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
    type,
    name,
    placeholder,
    mode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
    presentationStyle,
    attributes,
    components,
    repeat,
    childStyle,
    gridColSpan,
    textStyle,
    alternativePresentation,
    presentationSize,
    title,
    titleHeadlineLevel,
    presentAs,
  });
};
