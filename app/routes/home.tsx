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
import { getValidationTypes } from '@/data/getValidationTypes.server';
import { getAuth, getNotification, getSessionFromCookie } from '@/auth/sessions.server';
import { type AppLoadContext, Await, data } from 'react-router';
import { RouteErrorBoundary } from '@/components/DefaultErrorBoundary/RouteErrorBoundary';
import { getResponseInitWithSession } from '@/utils/redirectAndCommitSession';
import { searchRecords } from '@/data/searchRecords.server';
import { SidebarLayout } from '@/components/Layout/SidebarLayout/SidebarLayout';
import { useTranslation } from 'react-i18next';
import { Alert, Box, Button, Skeleton, Stack } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Suspense } from 'react';
import { AsyncErrorBoundary } from '@/components/DefaultErrorBoundary/AsyncErrorBoundary';
import { CreateRecordMenu } from '@/components/CreateRecordMenu/CreateRecordMenu';
import { RecordSearch } from '@/components/RecordSearch/RecordSearch';
import { useNotificationSnackbar } from '@/utils/useNotificationSnackbar';

import type { Route } from './+types/home';
import type { SearchFormSchema } from '@/components/FormGenerator/types';
import type { Auth } from '@/types/Auth';
import { parseFormDataFromSearchParams } from '@/utils/parseFormDataFromSearchParams';
import { isEmpty } from 'lodash-es';

export async function loader({ request, context }: Route.LoaderArgs) {
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);

  const searchForm = getSearchForm(
    context.dependencies,
    'diva-outputSimpleSearch',
  );

  const { query, searchResults } = await performSearch(
    searchForm,
    request,
    context,
    auth,
  );

  return data(
    {
      validationTypes: getValidationTypes(auth?.data.token),
      query,
      searchForm,
      searchResults,
      title: getPageTitle(context),
      notification: getNotification(session),
    },
    await getResponseInitWithSession(session),
  );
}

export const meta = ({ data }: Route.MetaArgs) => {
  return [{ title: data?.title }];
};

export const ErrorBoundary = RouteErrorBoundary;

export default function Home({ loaderData }: Route.ComponentProps) {
  const { searchForm, validationTypes, searchResults, query, notification } =
    loaderData;
  const { t } = useTranslation();

  useNotificationSnackbar(notification);

  return (
    <SidebarLayout
      sidebarContent={
        <Alert
          icon={<PriorityHighIcon fontSize='inherit' />}
          severity='warning'
        >
          {t('divaClient_metadataWarningText')}
        </Alert>
      }
    >
      <Stack spacing={2}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1>{t('divaClient_searchRecordText')}</h1>

          <Suspense
            fallback={
              <Skeleton>
                <Button>Skapa</Button>
              </Skeleton>
            }
          >
            <Await
              resolve={validationTypes}
              errorElement={<AsyncErrorBoundary />}
            >
              {(validationTypes) => (
                <CreateRecordMenu validationTypes={validationTypes} />
              )}
            </Await>
          </Suspense>
        </Box>

        <Suspense fallback={<Skeleton height={296} />}>
          <Await
            resolve={searchForm}
            errorElement={<AsyncErrorBoundary />}
          >
            {(searchForm) => (
              <RecordSearch
                searchForm={searchForm}
                searchType='diva-outputSimpleSearch'
                query={query}
                searchResults={searchResults}
              />
            )}
          </Await>
        </Suspense>
      </Stack>
    </SidebarLayout>
  );
}

const getPageTitle = (context: AppLoadContext) => {
  const { t } = context.i18n;
  return `DiVA | ${t('divaClient_HomePageTitleText')}`;
};

const performSearch = async (
  searchForm: SearchFormSchema,
  request: Request,
  context: AppLoadContext,
  auth: Auth | undefined,
) => {
  // const resolver = yupResolver(generateYupSchemaFromFormSchema(searchForm));
  const url = new URL(request.url);
  const query = parseFormDataFromSearchParams(url.searchParams);
  /*
  const {
    errors,
    data: query,
    receivedValues: defaultValues,
  } = await getValidatedFormData(request, resolver);*/

  /* if (errors) {
    return { errors, defaultValues, query };
  }*/

  if (isEmpty(query)) {
    return { query };
  }

  const searchResults = await searchRecords(
    context.dependencies,
    'diva-outputSimpleSearch',
    query,
    auth,
  );
  return { query, searchResults };
};
