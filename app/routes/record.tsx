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
import { isRouteErrorResponseWithHandledStatus } from '@/errorHandling/utils';
import { RouteErrorPage } from '@/errorHandling/RouteErrorPage';

export const loader = async ({
  request,
  params,
  context,
}: Route.LoaderArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);

  const { recordType, recordId } = params;
  console.log('record loader');

  try {
    const record = await getRecordByRecordTypeAndRecordId({
      dependencies: await context.dependencies,
      recordType,
      recordId,
      authToken: auth?.data.token,
    });

    console.log('record', { record });
    const breadcrumb = getRecordTitle(record) ?? record.id;
    const pageTitle = getRecordTitle(record);

    return { record, breadcrumb, pageTitle };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('CATCH', { error });
      throw data(error?.response?.data, { status: error.status });
    }
    throw error;
  }
};

export const meta = ({ data, error }: Route.MetaArgs) => {
  return [{ title: error ? getMetaTitleFromError(error) : data?.pageTitle }];
};

export const ErrorBoundary = ({ error, params }: Route.ErrorBoundaryProps) => {
  if (isRouteErrorResponseWithHandledStatus(error)) {
    return (
      <RouteErrorPage
        status={error.status}
        recordType={params.recordType}
        recordId={params.recordId}
        coraMessage={error.data}
      />
    );
  }

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          Record.tsx {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Record.tsx Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Record.tsx Unknown Error</h1>;
  }
};

export default function RecordTypeRoute({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>{loaderData.pageTitle}</h1>
      <Outlet />
    </div>
  );
}
