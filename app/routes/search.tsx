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
 */

import { getSearchForm } from '@/data/getSearchForm.server';
import { searchRecords } from '@/data/searchRecords.server';
import type { BFFSearchResult } from '@/types/record';
import { SearchPage } from '@/pages';
import {
  getAuthentication,
  getSessionFromCookie,
} from '@/auth/sessions.server';
import { parseFormDataFromSearchParams } from '@/utils/parseFormDataFromSearchParams';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { invariant } from '@remix-run/router/history';
import type { ErrorBoundaryComponent } from '@remix-run/react/dist/routeModules';
import { RouteErrorBoundary } from '@/components/DefaultErrorBoundary/RouteErrorBoundary';

export const ErrorBoundary: ErrorBoundaryComponent = RouteErrorBoundary;

export const loader = async ({
  request,
  params,
  context,
}: LoaderFunctionArgs) => {
  const { searchType } = params;
  invariant(searchType, 'Missing searchType param');
  const session = await getSessionFromCookie(request);
  const auth = getAuthentication(session);

  const searchForm = getSearchForm(
    context.dependencies,
    'diva-outputSimpleSearch',
  );

  const query = parseFormDataFromSearchParams(request);

  let searchResults: BFFSearchResult | null = null;
  try {
    searchResults = await searchRecords(
      context.dependencies,
      searchType,
      query,
      auth,
    );
  } catch (e) {
    console.error(e);
  }

  return { searchForm, query, searchResults };
};

export default function SearchRoute() {
  return <SearchPage />;
}
