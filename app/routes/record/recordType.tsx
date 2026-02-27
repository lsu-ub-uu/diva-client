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

import { ErrorPage, getIconByHTTPStatus } from '@/errorHandling/ErrorPage';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';
import { useTranslation } from 'react-i18next';
import { data, isRouteErrorResponse, Outlet } from 'react-router';
import { i18nContext } from 'server/i18n';
import type { Route } from '../record/+types/recordType';
import { dependencies } from 'server/dependencies/depencencies';

export const loader = async ({ params, context }: Route.LoaderArgs) => {
  const { t } = context.get(i18nContext);

  if (!dependencies.recordTypePool.has(params.recordType)) {
    throw data('divaClient_errorRecordTypeNotFoundText', { status: 404 });
  }
  const recordType = dependencies.recordTypePool.get(params.recordType);
  return { breadcrumb: t(recordType.pluralTextId) };
};

export const meta = ({ loaderData }: Route.MetaArgs) => {
  return [{ title: `${loaderData?.breadcrumb} | DiVA` }];
};

export default function RecordTypeRoute() {
  return <Outlet />;
}

export const ErrorBoundary = ({ error, params }: Route.ErrorBoundaryProps) => {
  const { t } = useTranslation();

  if (isRouteErrorResponse(error)) {
    const { status } = error;
    return (
      <ErrorPage
        icon={getIconByHTTPStatus(status)}
        titleText={t(`divaClient_error${status}TitleText`)}
        bodyText={t(`divaClient_error${status}BodyText`)}
        technicalInfo={t(error.data, { recordType: params.recordType })}
      />
    );
  }

  return <UnhandledErrorPage error={error} />;
};
