/*
 * Copyright 2024 Uppsala University Library
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
  BFFMetadataNumberVariable,
  BFFMetadataTextVariable,
} from '@/cora/bffTypes.server';
import type {
  FormNumberValidation,
  FormRegexValidation,
} from '@/components/FormGenerator/types';

export const createTextVariableValidation = (
  textVariable: BFFMetadataTextVariable,
): FormRegexValidation => {
  const pattern = textVariable.regEx;
  return { type: 'regex', pattern };
};

export const createNumberVariableValidation = (
  numberVariable: BFFMetadataNumberVariable,
): FormNumberValidation => {
  const min = parseInt(numberVariable.min);
  const max = parseInt(numberVariable.max);
  const warningMin = parseInt(numberVariable.warningMin);
  const warningMax = parseInt(numberVariable.warningMax);
  const numberOfDecimals = parseInt(numberVariable.numberOfDecimals);

  return { type: 'number', min, max, warningMin, warningMax, numberOfDecimals };
};
