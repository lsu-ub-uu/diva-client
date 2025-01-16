/*
 * Copyright 2023 Uppsala University Library
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

import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import type {
  BFFMetadataGroup,
  BFFPresentationGroup,
} from '@/cora/transform/bffTypes.server';
import type { FormSchema } from '@/components/FormGenerator/types';

import { createDefinitionFromMetadataGroupAndPresentationGroup } from '@/data/formDefinition/createDefinitionFromMetadataGroupAndPresentationGroup.server';

/**
 * Creates a Linked Record definition
 *
 * @remarks
 *
 * Creates the form definition used for linked records based
 * on a metadata group and presentation group.
 *
 * @param dependencies
 * @param metadataGroup
 * @param presentationGroup
 */
export const createLinkedRecordDefinition = (
  dependencies: Dependencies,
  metadataGroup: BFFMetadataGroup,
  presentationGroup: BFFPresentationGroup,
): FormSchema => {
  const form = createDefinitionFromMetadataGroupAndPresentationGroup(
    dependencies,
    metadataGroup,
    presentationGroup,
  );

  return {
    form,
  };
};
