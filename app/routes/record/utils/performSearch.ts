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

import type { AppLoadContext } from 'react-router';
import type { Auth } from '@/auth/Auth';
import { searchRecords } from '@/data/searchRecords.server';
import { type ObjectSchema, ValidationError } from 'yup';
import { cleanFormData } from '@/utils/cleanFormData';
import { parseFormDataFromSearchParams } from '@/utils/parseFormDataFromSearchParams';

export const performSearch = async (
  request: Request,
  context: AppLoadContext,
  searchId: string,
  auth: Auth | undefined,
  yupSchema: ObjectSchema<Record<string, any>>,
) => {
  const url = new URL(request.url);
  const query = parseFormDataFromSearchParams(url.searchParams);

  try {
    if (isEmptySearch(query)) {
      return { query };
    }
    await yupSchema.validate(query);
    const searchResults = await searchRecords(
      await context.dependencies,
      searchId,
      query,
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

const isEmptySearch = (query: Record<string, any>) => {
  const cleaned = cleanFormData(query);
  const rootKey = Object.keys(query)[0];
  return cleaned[rootKey]?.include === undefined;
};
