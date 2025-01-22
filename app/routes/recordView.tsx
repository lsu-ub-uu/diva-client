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

import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { getSessionFromCookie, requireAuth } from '@/auth/sessions.server';
import { invariant } from '@remix-run/router/history';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId.server';
import { useLoaderData } from '@remix-run/react';
import type { ErrorBoundaryComponent } from '@remix-run/react/dist/routeModules';
import { RouteErrorBoundary } from '@/components/DefaultErrorBoundary/RouteErrorBoundary';

import { getRecordTitle } from '@/utils/getRecordTitle';
import { SidebarLayout } from '@/components/Layout/SidebarLayout/SidebarLayout';
import { NavigationPanel } from '@/components/NavigationPanel/NavigationPanel';
import {
  linksFromFormSchema,
  removeComponentsWithoutValuesFromSchema,
} from '@/components/NavigationPanel/utils';
import { Stack } from '@mui/material';
import { ReadOnlyForm } from '@/components/Form/ReadOnlyForm';

export const ErrorBoundary: ErrorBoundaryComponent = RouteErrorBoundary;

export const loader = async ({
  request,
  params,
  context,
}: LoaderFunctionArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = await requireAuth(session);

  const { recordType, recordId } = params;
  invariant(recordType, 'Missing recordType param');
  invariant(recordId, 'Missing recordId param');
  const record = await getRecordByRecordTypeAndRecordId({
    dependencies: context.dependencies,
    recordType,
    recordId,
    authToken: auth.data.token,
  });
  const title = `${getRecordTitle(record)} | DiVA`;

  invariant(record.validationType, 'Record has no validation type');
  const formDefinition = await getFormDefinitionByValidationTypeId(
    context.dependencies,
    record.validationType,
    'view',
  );

  return { record, formDefinition, title };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.title }];
};

export default function ViewRecordRoute() {
  const { record, formDefinition } = useLoaderData<typeof loader>();
  return (
    <SidebarLayout
      sidebarContent={
        <NavigationPanel
          links={
            formDefinition
              ? linksFromFormSchema(
                  removeComponentsWithoutValuesFromSchema(
                    formDefinition,
                    record,
                  ),
                ) || []
              : []
          }
        />
      }
    >
      <Stack spacing={2}>
        <ReadOnlyForm
          record={record}
          formSchema={formDefinition}
        />
      </Stack>
    </SidebarLayout>
  );
}
