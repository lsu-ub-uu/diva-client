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
import {
  getAuth,
  getNotification,
  getSessionFromCookie,
} from '@/auth/sessions.server';
import { Await, data } from 'react-router';
import { RouteErrorBoundary } from '@/errorHandling/RouteErrorBoundary';
import { getResponseInitWithSession } from '@/utils/redirectAndCommitSession';
import { SidebarLayout } from '@/components/Layout/SidebarLayout/SidebarLayout';
import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';
import { AsyncErrorBoundary } from '@/errorHandling/AsyncErrorBoundary';
import { CreateRecordMenu } from '@/components/CreateRecordMenu/CreateRecordMenu';
import { NotificationSnackbar } from '@/utils/NotificationSnackbar';
import type { Route } from './+types/recordSearch';
import styles from './home.module.css';
import { Alert } from '@/components/Alert/Alert';
import { SkeletonLoader } from '@/components/Loader/SkeletonLoader';
import { RecordSearch } from '@/components/RecordSearch/RecordSearch';
import { performSearch } from '@/routes/routeUtils/performSearch';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);
  const { t } = context.i18n;

  const dependencies = await context.dependencies;

  const recordType = dependencies.recordTypePool.get(params.recordType);

  if (!recordType.searchId) {
    throw data('Record type has no search', { status: 404 });
  }

  const searchForm = getSearchForm(
    await context.dependencies,
    recordType.searchId,
  );

  const yupSchema = generateYupSchemaFromFormSchema(searchForm);

  const { query, searchResults, errors } = await performSearch(
    request,
    context,
    recordType.searchId,
    auth,
    yupSchema,
  );

  const validationTypes = getValidationTypes(
    params.recordType,
    auth?.data.token,
  );

  return data(
    {
      searchId: recordType.searchId,
      recordTypeTextId: recordType.textId,
      validationTypes,
      query,
      searchForm,
      searchResults,
      title: `DiVA | ${t(recordType.textId)}`,
      notification: getNotification(session),
      errors,
    },
    await getResponseInitWithSession(session),
  );
}

export const meta = ({ data }: Route.MetaArgs) => {
  return [{ title: data?.title }];
};

export const ErrorBoundary = RouteErrorBoundary;

export default function OutputSearchRoute({
  loaderData,
}: Route.ComponentProps) {
  const {
    searchId,
    recordTypeTextId,
    searchForm,
    validationTypes,
    searchResults,
    query,
    notification,
  } = loaderData;
  const { t } = useTranslation();

  return (
    <SidebarLayout
      sidebarContent={
        <Alert severity='warning'>{t('divaClient_metadataWarningText')}</Alert>
      }
    >
      <NotificationSnackbar notification={notification} />
      <div className={styles['search-wrapper']}>
        <div className={styles['search-extras']}>
          <h1>
            {t('divaClient_searchText', {
              type: t(recordTypeTextId).toLowerCase(),
            })}
          </h1>

          <Suspense
            fallback={
              <SkeletonLoader height='var(--input-height)' width='10rem' />
            }
          >
            <Await
              resolve={validationTypes}
              errorElement={<AsyncErrorBoundary />}
            >
              {(validationTypes) => (
                <CreateRecordMenu
                  validationTypes={validationTypes}
                  recordTypeTextId={recordTypeTextId}
                />
              )}
            </Await>
          </Suspense>
        </div>

        <Suspense
          fallback={
            <div style={{ display: 'flex', gap: '1rem' }}>
              <SkeletonLoader height='var(--input-height)' width='88%' />
              <SkeletonLoader height='var(--input-height)' width='12%' />
            </div>
          }
        >
          <Await resolve={searchForm} errorElement={<AsyncErrorBoundary />}>
            {(searchForm) => (
              <RecordSearch
                key={searchId}
                searchForm={searchForm}
                query={query}
                searchResults={searchResults}
              />
            )}
          </Await>
        </Suspense>
      </div>
    </SidebarLayout>
  );
}
