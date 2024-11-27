/*
 * Copyright 2024 Uppsala University Library
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

import { ViewRecordPage } from '@/pages';
import { LoaderFunctionArgs } from '@remix-run/node';
import { getSessionFromCookie, requireAuthentication } from '@/sessions';
import { invariant } from '@remix-run/router/history';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId';
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId';
import { useLoaderData } from '@remix-run/react';
import { ErrorBoundaryComponent } from '@remix-run/react/dist/routeModules';
import { DefaultErrorBoundary } from '@/components/DefaultErrorBoundary/DefaultErrorBoundary';

export const ErrorBoundary: ErrorBoundaryComponent = DefaultErrorBoundary;

export const loader = async ({
  request,
  params,
  context,
}: LoaderFunctionArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = await requireAuthentication(session);
  const { recordType, recordId } = params;
  invariant(recordType, 'Missing recordType param');
  invariant(recordId, 'Missing recordId param');
  const record = await getRecordByRecordTypeAndRecordId(
    context.dependencies,
    recordType,
    recordId,
    auth.data.token,
  );
  invariant(record.validationType, 'Record has no validation type');
  const formDefinition = await getFormDefinitionByValidationTypeId(
    context.dependencies,
    record.validationType,
    'view',
  );

  return { record, formDefinition };
};

export default function ViewRecordRoute() {
  const { record, formDefinition } = useLoaderData<typeof loader>();
  return (
    <ViewRecordPage
      record={record}
      formDefinition={formDefinition}
    />
  );
}