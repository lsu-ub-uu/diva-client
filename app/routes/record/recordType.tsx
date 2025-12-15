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

import {
  data,
  isRouteErrorResponse,
  Outlet,
  useRouteLoaderData,
} from 'react-router';
import type { Route } from '../record/+types/recordType';
import { getIconByHTTPStatus, ErrorPage } from '@/errorHandling/ErrorPage';
import { useTranslation } from 'react-i18next';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';
import { dependenciesContext } from 'server/depencencies';
import { i18nContext } from 'server/i18n';
import { TopNavigation } from '@/components/Layout/TopNavigation/TopNavigation';

export const loader = async ({ params, context }: Route.LoaderArgs) => {
  const { dependencies } = context.get(dependenciesContext);

  const { t } = context.get(i18nContext);

  if (!dependencies.recordTypePool.has(params.recordType)) {
    throw data('divaClient_errorRecordTypeNotFoundText', { status: 404 });
  }
  const recordType = dependencies.recordTypePool.get(params.recordType);
  return { breadcrumb: t(recordType.textId) };
};

export default function RecordTypeRoute() {
  const { recordTypes, editableMember } = useRouteLoaderData('root');
  return (
    <>
      <aside className='nav-rail'>
        <TopNavigation
          recordTypes={recordTypes}
          editableMember={editableMember}
        />
      </aside>
      <div className='content'>
        <Outlet />
      </div>
    </>
  );
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
