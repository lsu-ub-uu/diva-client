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

import { sessionContext } from '@/auth/sessionMiddleware.server';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import { TrashAlert } from '@/components/TrashAlert/TrashAlert';
import { externalCoraApiUrl } from '@/cora/helper.server';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import { createRouteErrorResponse } from '@/errorHandling/createRouteErrorResponse.server';
import { ErrorPage, getIconByHTTPStatus } from '@/errorHandling/ErrorPage';
import { getMetaTitleFromError } from '@/errorHandling/getMetaTitleFromError';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';
import { getRecordTitle } from '@/utils/getRecordTitle';
import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, Link, Outlet } from 'react-router';
import { getDependencies } from 'server/dependencies/depencencies';
import { i18nContext } from 'server/i18n';
import type { Route } from '../record/+types/record';
import { RecordActionBar } from './ActionBar/RecordActionBar';
import css from './record.css?url';

export const loader = async ({ params, context }: Route.LoaderArgs) => {
  const { t, language } = context.get(i18nContext);
  const { auth } = context.get(sessionContext);
  const { recordType, recordId } = params;
  const apiUrl = externalCoraApiUrl(`/record/${recordType}/${recordId}`);
  const dependencies = await getDependencies();
  try {
    const record = await getRecordByRecordTypeAndRecordId({
      dependencies,
      recordType,
      recordId,
      authToken: auth?.data.token,
      mode: 'view',
    });

    const breadcrumb = getRecordTitle(record, language) ?? record.id;
    const pageTitle =
      getRecordTitle(record, language) || t('divaClient_missingTitleText');

    return { record, breadcrumb, pageTitle, apiUrl };
  } catch (error) {
    throw createRouteErrorResponse(error);
  }
};

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: css },
];

export const meta = ({ loaderData, error }: Route.MetaArgs) => {
  return [
    {
      title: error
        ? getMetaTitleFromError(error)
        : `${loaderData?.pageTitle} | DiVA`,
    },
  ];
};

export const ErrorBoundary = ({ error, params }: Route.ErrorBoundaryProps) => {
  const { t } = useTranslation();
  const { recordType, recordId } = params;

  if (isRouteErrorResponse(error)) {
    const { status } = error;

    const errorBodyText =
      status === 404
        ? t(`divaClient_errorRecordNotFoundText`, {
            recordType,
            recordId,
          })
        : t(`divaClient_error${status}BodyText`);

    return (
      <ErrorPage
        icon={getIconByHTTPStatus(status)}
        titleText={t(`divaClient_error${status}TitleText`)}
        bodyText={errorBodyText}
        links={
          <Link to={`/${recordType}/search`}>
            {t('divaClient_errorGoToSearchText', { recordType })}
          </Link>
        }
        technicalInfo={error.data}
      />
    );
  }

  return <UnhandledErrorPage error={error} />;
};

export default function RecordTypeRoute({ loaderData }: Route.ComponentProps) {
  const { record, apiUrl } = loaderData;

  function isInTrashBin() {
    const rootGroup = Object.values(record.data)[0];
    return rootGroup.recordInfo?.inTrashBin?.value === 'true';
  }

  return (
    <>
      <div className='grid main-content'>
        {isInTrashBin() && (
          <div className='record-status-bar grid-col-12'>
            <TrashAlert recordType={record.recordType} recordId={record.id} />
          </div>
        )}
        <div className='top-bar grid-col-12'>
          <Breadcrumbs />
          <RecordActionBar record={record} apiUrl={apiUrl} />
        </div>
      </div>
      <Outlet />
    </>
  );
}
