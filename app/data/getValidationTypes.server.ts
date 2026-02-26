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
 */

import type { Option } from '@/components';
import type { Dependencies } from '@/cora/bffTypes.server';

export const getValidationTypes = (
  recordType: string,
  dependencies: Dependencies,
) => {
  const validationTypes = Array.from(dependencies.validationTypePool.values());

  return validationTypes
    .filter(
      (validationType) => validationType.validatesRecordTypeId === recordType,
    )
    .filter((validationType) => !validationType.id.startsWith('classic_'))
    .map(
      (validationType): Option => ({
        value: validationType.id,
        label: validationType.nameTextId,
      }),
    );
};
