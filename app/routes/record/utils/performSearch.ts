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
 */

import type { Auth } from '@/auth/Auth';
import type { BFFMember } from '@/cora/transform/bffTypes.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { searchRecords } from '@/data/searchRecords.server';
import { cleanFormData } from '@/utils/cleanFormData';
import { parseFormDataFromSearchParams } from '@/utils/parseFormDataFromSearchParams';
import { merge } from 'lodash-es';
import { type ObjectSchema, ValidationError } from 'yup';

export const performSearch = async (
  request: Request,
  dependencies: Dependencies,
  searchId: string,
  auth: Auth | undefined,
  yupSchema: ObjectSchema<Record<string, any>>,
  decorated = false,
  member: BFFMember | undefined,
) => {
  const url = new URL(request.url);

  const query = createQuery(url.searchParams, member, searchId, dependencies);
  try {
    if (isEmptySearch(query)) {
      return { query };
    }
    await yupSchema.validate(query);
    const searchResults = await searchRecords(
      dependencies,
      searchId,
      query,
      auth,
      decorated,
    );

    return { query, searchResults };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { errors: error.errors, query };
    }
    throw error;
  }
};

const isEmptySearch = (query: Record<string, any>) => {
  const cleaned = cleanFormData(query);
  const rootKey = Object.keys(query)[0];
  return cleaned[rootKey]?.include === undefined;
};

const createQuery = (
  searchParams: URLSearchParams,
  member: BFFMember | undefined,
  searchId: string,
  dependencies: Dependencies,
) => {
  const search = dependencies.searchPool.get(searchId);
  const searchMetadata = dependencies.metadataPool.get(search.metadataId);
  const searchRootName = searchMetadata.nameInData;

  const queryFromSearchParams = parseFormDataFromSearchParams(searchParams);

  const defaultQuery = {
    [searchRootName]: {
      include: {
        includePart: {
          recordIdSearchTerm: { value: '**' },
          trashBinSearchTerm: { value: 'false' },
          permissionUnitSearchTerm: {
            value: member?.memberPermissionUnit
              ? `permissionUnit_${member?.memberPermissionUnit}`
              : '',
          },
        },
      },
      rows: { value: '10' },
    },
  };
  return merge(defaultQuery, queryFromSearchParams);
};
