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

import { sessionContext } from '@/auth/sessionMiddleware.server';
import { Alert } from '@/components/Alert/Alert';
import { CreateRecordMenu } from '@/components/CreateRecordMenu/CreateRecordMenu';
import { CreateRecordMenuError } from '@/components/CreateRecordMenu/CreateRecordMenuError';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { SkeletonLoader } from '@/components/Loader/SkeletonLoader';
import { RecordSearch } from '@/components/RecordSearch/RecordSearch';
import { externalCoraApiUrl } from '@/cora/helper.server';
import { getSearchForm } from '@/data/getSearchForm.server';
import { getValidationTypes } from '@/data/getValidationTypes.server';
import { createCoraSearchQuery } from '@/data/searchRecords.server';
import { AsyncErrorBoundary } from '@/errorHandling/AsyncErrorBoundary';
import { performSearch } from '@/routes/record/utils/performSearch';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Await, data } from 'react-router';
import type { Route } from '../record/+types/recordSearch';
import css from './recordSearch.css?url';
import { i18nContext } from 'server/i18n';
import { dependenciesContext } from 'server/depencencies';

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const { auth } = context.get(sessionContext);
  const { t } = context.get(i18nContext);

  const { dependencies } = context.get(dependenciesContext);

  const recordType = dependencies.recordTypePool.get(params.recordType);

  if (!recordType.searchId) {
    throw data('Record type has no search', { status: 404 });
  }

  const searchForm = getSearchForm(dependencies, recordType.searchId);

  const yupSchema = generateYupSchemaFromFormSchema(searchForm);
  const { query, searchResults, errors } = await performSearch(
    request,
    dependencies,
    recordType.searchId,
    auth,
    yupSchema,
  );
  const apiUrl =
    query &&
    encodeURI(
      externalCoraApiUrl(
        `/record/searchResult/${recordType.searchId}?searchData=${JSON.stringify(createCoraSearchQuery(dependencies, dependencies.searchPool.get(recordType.searchId), query))}`,
      ),
    );

  const validationTypes = getValidationTypes(
    params.recordType,
    auth?.data.token,
  );

  return {
    searchId: recordType.searchId,
    recordTypeTextId: recordType.textId,
    validationTypes,
    query,
    searchForm,
    searchResults,
    title: `DiVA | ${t(recordType.textId)}`,
    errors,
    apiUrl,
  };
}

export const meta = ({ data }: Route.MetaArgs) => {
  return [{ title: data?.title }];
};
export const links = () => [{ rel: 'stylesheet', href: css }];

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
  } = loaderData;
  const { t } = useTranslation();

  return (
    <div className='search-layout'>
      <main>
        <div className='search-wrapper'>
          <div className='search-extras'>
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
                errorElement={
                  <CreateRecordMenuError recordTypeTextId={recordTypeTextId} />
                }
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
                  apiUrl={loaderData.apiUrl}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </main>
      <aside>
        <h2>{t('divaClient_messagesHeadingText')}</h2>
        <Alert severity='warning'>{t('divaClient_metadataWarningText')}</Alert>
      </aside>
    </div>
  );
}
