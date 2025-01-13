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

import { getSearchForm } from '@/.server/data/getSearchForm';
import { getValidationTypes } from '@/.server/data/getValidationTypes';
import { HomePage } from '@/pages';
import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';
import {
  data,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import type { ErrorBoundaryComponent } from '@remix-run/react/dist/routeModules';
import { RouteErrorBoundary } from '@/components/DefaultErrorBoundary/RouteErrorBoundary';
import { getResponseInitWithSession } from '@/utils/redirectAndCommitSession';
import { useLoaderData } from '@remix-run/react';
import { useNotificationSnackbar } from '@/utils/useNotificationSnackbar';
import { parseFormDataFromSearchParams } from '@/utils/parseFormDataFromSearchParams';
import { searchRecords } from '@/.server/data/searchRecords';
import { isEmpty } from 'lodash-es';

export const ErrorBoundary: ErrorBoundaryComponent = RouteErrorBoundary;

export async function loader({ request, context }: LoaderFunctionArgs) {
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);
  const { t } = context.i18n;
  const title = `DiVA | ${t('divaClient_HomePageTitleText')}`;
  const validationTypes = auth
    ? getValidationTypes(auth.data.token)
    : Promise.resolve(null);

  const notification = session.get('notification');

  const searchForm = getSearchForm(
    context.dependencies,
    'diva-outputSimpleSearch',
  );

  const query = parseFormDataFromSearchParams(request);

  const searchResults = !isEmpty(query)
    ? await searchRecords(
        context.dependencies,
        'diva-outputSimpleSearch',
        query,
        auth,
      )
    : null;

  return data(
    {
      validationTypes,
      query,
      searchForm,
      searchResults,
      title,
      notification,
    },
    await getResponseInitWithSession(session),
  );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.title }];
};

export default function IndexRoute() {
  const { notification } = useLoaderData<typeof loader>();
  useNotificationSnackbar(notification);
  return <HomePage />;
}
