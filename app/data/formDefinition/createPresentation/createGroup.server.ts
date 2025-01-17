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
  BFFMetadataGroup,
  BFFPresentationBase,
  BFFPresentationGroup,
} from '@/cora/transform/bffTypes.server';
import {
  checkForAttributes,
  createComponentsFromChildReferences,
  createHiddenComponentsFromMetadataChildReferences,
} from '@/data/formDefinition/createPresentation/createDetailedPresentationBasedOnPresentationType.server';
import { createCommonParameters } from '@/data/formDefinition/createCommonParameters.server';
import { convertStylesToShortName } from '@/cora/cora-data/CoraDataUtilsPresentations.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';

export const createGroup = (
  dependencies: Dependencies,
  metadata: BFFMetadataGroup,
  presentation: BFFPresentationBase,
) => {
  const presentationGroup = dependencies.presentationPool.get(
    presentation.id,
  ) as BFFPresentationGroup;
  const presentationStyle = convertStylesToShortName(
    presentationGroup.presentationStyle ?? '',
  );
  const attributes = checkForAttributes(
    metadata,
    dependencies.metadataPool,
    undefined,
    presentation,
  );

  const components = createComponentsFromChildReferences(
    dependencies,
    metadata.children,
    presentationGroup.children,
  );

  const hiddenComponents = createHiddenComponentsFromMetadataChildReferences(
    dependencies,
    metadata.children,
  );

  const commonParameters = createCommonParameters(metadata, presentation);

  const allComponents = [...components, ...hiddenComponents];
  return removeEmpty({
    ...commonParameters,
    presentationStyle,
    attributes,
    components: allComponents,
  });
};
