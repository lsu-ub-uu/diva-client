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
  BFFPresentationResourceLink,
  BFFResourceLink,
} from '@/cora/transform/bffTypes.server';
import { createCommonParameters } from '@/data/formDefinition/createCommonParameters.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import type { FormComponentResourceLink } from '@/components/FormGenerator/types';

export const createResourceLink = (
  metadata: BFFResourceLink,
  presentation: BFFPresentationResourceLink,
) => {
  const outputFormat = presentation.outputFormat;
  const commonParameters = createCommonParameters(metadata, presentation);
  return removeEmpty({
    ...commonParameters,
    outputFormat,
  }) as FormComponentResourceLink;
};
