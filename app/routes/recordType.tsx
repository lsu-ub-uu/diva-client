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
import type { Route } from './+types/recordType';
import { isRouteErrorResponseWithHandledStatus } from '@/errorHandling/utils';
import { RouteErrorPage } from '@/errorHandling/RouteErrorPage';

export const loader = async ({ params, context }: Route.LoaderArgs) => {
  const dependencies = await context.dependencies;
  if (!dependencies.recordTypePool.has(params.recordType)) {
    throw data(null, { status: 404 });
  }
  const recordType = dependencies.recordTypePool.get(params.recordType);
  return { breadcrumb: context.i18n.t(recordType.textId) };
};

export default function RecordTypeRoute() {
  return <Outlet />;
}

export const ErrorBoundary = ({ error, params }: Route.ErrorBoundaryProps) => {
  if (isRouteErrorResponseWithHandledStatus(error)) {
    console.log({ error });
    return (
      <RouteErrorPage
        status={error.status}
        recordType={'recordType'}
        recordId={params.recordType}
        coraMessage={error.data}
      />
    );
  }

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
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
