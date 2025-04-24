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
  FormComponentContainer,
} from '@/components/FormGenerator/types';
import type {
  BFFMetadataChildReference,
  BFFPresentationChildReference,
  BFFPresentationContainer,
} from '@/cora/transform/bffTypes.server';
import { createComponentsFromChildReferences } from '@/data/formDefinition/createPresentation/createGroupOrComponent';
import { createRContainer } from '@/data/formDefinition/createPresentation/createRContainer.server';
import { createSContainer } from '@/data/formDefinition/createPresentation/createSContainer.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { createPresentationChildReferenceParameters } from '../createPresentationChildReferenceParameters.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';

export const createContainer = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentation: BFFPresentationContainer,
  presentationChildReference: BFFPresentationChildReference,
  alternativePresentation: FormComponent | undefined,
): FormComponentContainer => {
  const name = presentation.id; // container does not have a nameInData so use id instead.
  const { type, mode } = presentation;
  const containerType = getContainerType(presentation);
  const presentationStyle = presentation.presentationStyle;

  let metadataChildReferencecs: BFFMetadataChildReference[] = [];

  if (containerType === 'surrounding') {
    metadataChildReferencecs = createSContainer(
      presentation,
      metadataChildReferences,
      dependencies,
    );
  } else if (containerType === 'repeating') {
    metadataChildReferencecs = createRContainer(
      presentation,
      metadataChildReferences,
    );
  }

  const components = createComponentsFromChildReferences(
    dependencies,
    metadataChildReferencecs,
    presentation.children,
    false,
  );

  const {
    childStyle,
    textStyle,
    gridColSpan,
    presentationSize,
    title,
    titleHeadlineLevel,
  } = createPresentationChildReferenceParameters(presentationChildReference);

  const container: FormComponentContainer = {
    type,
    name,
    mode,
    presentationStyle,
    containerType,
    components,
    childStyle,
    gridColSpan,
    textStyle,
    alternativePresentation,
    presentationSize,
    title,
    titleHeadlineLevel,
  };

  return removeEmpty(container);
};

const getContainerType = (presentationContainer: BFFPresentationContainer) => {
  return presentationContainer.repeat === 'children'
    ? 'surrounding'
    : 'repeating';
};
