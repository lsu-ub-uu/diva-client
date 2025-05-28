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

import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';
import { searchRecords } from '@/data/searchRecords.server';

import { parseFormDataFromSearchParams } from '@/utils/parseFormDataFromSearchParams';
import type { Route } from '../resourceRoutes/+types/autocompleteSearch';

export const loader = async ({
  params,
  request,
  context,
}: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const query = parseFormDataFromSearchParams(url.searchParams);
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);

  try {
    const result = await searchRecords(
      await context.dependencies,
      params.searchType,
      query,
      auth,
    );
    return { result: result.data };
  } catch (error) {
    console.error(error);
    return { result: [] };
  }
};
