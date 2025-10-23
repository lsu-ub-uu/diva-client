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
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { searchRecords } from '@/data/searchRecords.server';
import { parseFormDataFromSearchParams } from '@/utils/parseFormDataFromSearchParams';
import { cloneDeep, set } from 'lodash-es';
import { type ObjectSchema, ValidationError } from 'yup';

export const performSearch = async (
  request: Request,
  dependencies: Dependencies,
  searchId: string,
  auth: Auth | undefined,
  yupSchema: ObjectSchema<Record<string, any>>,
) => {
  const url = new URL(request.url);
  const query = parseFormDataFromSearchParams(url.searchParams);

  try {
    await yupSchema.validate(query);
    const searchResults = await searchRecords(
      dependencies,
      searchId,
      addDefaults(query),
      auth,
    );

    return { query, searchResults };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { errors: error.errors, query };
    }
    throw error;
  }
};

function addDefaults(query: Record<string, any>) {
  const clone = cloneDeep(query);
  if (!clone?.search?.include?.includePart?.genericSearchTerm?.value) {
    set(clone, 'search.include.includePart.genericSearchTerm.value', '**');
  } else {
    clone.search.include.includePart.genericSearchTerm.value += '*';
  }
  if (!clone?.search?.rows?.value) {
    set(clone, 'search.rows.value', '10');
  }
  return clone;
}
