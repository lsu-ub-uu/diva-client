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
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import { createRouteErrorResponse } from '@/errorHandling/createRouteErrorResponse.server';
import { ErrorPage, getIconByHTTPStatus } from '@/errorHandling/ErrorPage';
import { getMetaTitleFromError } from '@/errorHandling/getMetaTitleFromError';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';
import { getRecordTitle } from '@/utils/getRecordTitle';
import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, Link, Outlet } from 'react-router';
import { dependenciesContext } from 'server/depencencies';
import type { Route } from '../record/+types/record';
import css from './record.css?url';

export const loader = async ({ params, context }: Route.LoaderArgs) => {
  const { auth } = context.get(sessionContext);
  const { dependencies } = context.get(dependenciesContext);
  const { recordType, recordId } = params;

  try {
    const record = await getRecordByRecordTypeAndRecordId({
      dependencies,
      recordType,
      recordId,
      authToken: auth?.data.token,
    });

    const breadcrumb = getRecordTitle(record) ?? record.id;
    const pageTitle = getRecordTitle(record);

    return { record, breadcrumb, pageTitle };
  } catch (error) {
    throw createRouteErrorResponse(error);
  }
};

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: css },
];

export const meta = ({ loaderData, error }: Route.MetaArgs) => {
  return [
    { title: error ? getMetaTitleFromError(error) : loaderData?.pageTitle },
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

export default function RecordTypeRoute() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
