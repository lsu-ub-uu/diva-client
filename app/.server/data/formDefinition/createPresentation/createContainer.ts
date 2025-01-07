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
  BFFPresentationContainer,
} from '@/.server/cora/transform/bffTypes';
import { createComponentsFromChildReferences } from '@/.server/data/formDefinition/createPresentation/createDetailedPresentationBasedOnPresentationType';
import { convertStylesToShortName } from '@/.server/cora/cora-data/CoraDataUtilsPresentations';
import type { Dependencies } from '@/.server/data/formDefinition/formDefinitionsDep';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import { createRContainer } from '@/.server/data/formDefinition/createPresentation/createRContainer';
import { createSContainer } from '@/.server/data/formDefinition/createPresentation/createSContainer';

export const createContainer = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentation: BFFPresentationContainer,
) => {
  const name = presentation.id; // container does not have a nameInData so use id instead.
  const { type, mode } = presentation;
  const containerType = getContainerType(presentation);
  const presentationStyle = convertStylesToShortName(
    presentation.presentationStyle ?? '',
  );
  let showLabel;
  if (presentation.showLabel && presentation.showLabel === 'false') {
    showLabel = false;
  }

  let definitionFilteredChildRefs: BFFMetadataChildReference[] = [];

  if (containerType === 'surrounding') {
    definitionFilteredChildRefs = createSContainer(
      presentation,
      metadataChildReferences,
      dependencies,
    );
  } else if (containerType === 'repeating') {
    definitionFilteredChildRefs = createRContainer(
      presentation,
      metadataChildReferences,
    );
  }

  const commonParameters = { type, name, mode };
  const components = createComponentsFromChildReferences(
    dependencies,
    definitionFilteredChildRefs,
    presentation.children,
  );

  return removeEmpty({
    ...commonParameters,
    showLabel,
    presentationStyle,
    containerType,
    components,
  });
};

const getContainerType = (presentationContainer: BFFPresentationContainer) => {
  return presentationContainer.repeat === 'children'
    ? 'surrounding'
    : 'repeating';
};
