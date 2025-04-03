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

import { data, isRouteErrorResponse, Outlet } from 'react-router';
import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import type { Route } from './+types/record';
import { getRecordTitle } from '@/utils/getRecordTitle';
import { getMetaTitleFromError } from '@/errorHandling/getMetaTitleFromError';
import { AxiosError } from 'axios';
import { getIconByHTTPStatus, ErrorPage } from '@/errorHandling/ErrorPage';
import { useTranslation } from 'react-i18next';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';

export const loader = async ({
  request,
  params,
  context,
}: Route.LoaderArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);

  const { recordType, recordId } = params;

  try {
    const record = await getRecordByRecordTypeAndRecordId({
      dependencies: await context.dependencies,
      recordType,
      recordId,
      authToken: auth?.data.token,
    });

    const breadcrumb = getRecordTitle(record) ?? record.id;
    const pageTitle = getRecordTitle(record);

    return { record, breadcrumb, pageTitle };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw data(error?.response?.data, { status: error.status });
    }
    throw error;
  }
};

export const meta = ({ data, error }: Route.MetaArgs) => {
  return [{ title: error ? getMetaTitleFromError(error) : data?.pageTitle }];
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
        technicalInfo={error.data}
      />
    );
  }

  return <UnhandledErrorPage error={error} />;
};

export default function RecordTypeRoute({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>{loaderData.pageTitle}</h1>
      <Outlet />
    </div>
  );
}
