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
import type { DataGroup, DataListWrapper } from '@/cora/cora-data/types.server';
import { transformCoraValidationTypes } from '@/cora/transform/transformValidationTypes.server';
import { getSearchResultDataListBySearchType } from '@/cora/getSearchResultDataListBySearchType.server';
import { isAxiosError } from 'axios';

export const getValidationTypes = async (
  recordType: string,
  authToken?: string,
) => {
  if (!authToken) {
    return null;
  }

  const searchQuery: DataGroup = {
    name: 'validationTypeSearch',
    children: [
      {
        name: 'include',
        children: [
          {
            name: 'includePart',
            children: [
              {
                name: 'validatesRecordTypeSearchTerm',
                value: `recordType_${recordType}`,
              },
            ],
          },
        ],
      },
    ],
  };

  try {
    const response = await getSearchResultDataListBySearchType<DataListWrapper>(
      'validationTypeSearch',
      searchQuery,
      authToken,
    );

    const validationTypes = transformCoraValidationTypes(response.data);

    return validationTypes
      .filter((validationType) => !validationType.id.startsWith('classic_'))
      .map(
        (validationType): Option => ({
          value: validationType.id,
          label: validationType.nameTextId,
        }),
      );
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 403) {
      return [];
    }
    throw error;
  }
};
