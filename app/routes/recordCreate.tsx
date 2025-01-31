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

import { data } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { getValidatedFormData } from 'remix-hook-form';
import { createRecord } from '@/data/createRecord.server';
import type { BFFDataRecordData } from '@/types/record';
import {
  getSessionFromCookie,
  requireAuthentication,
} from '@/auth/sessions.server';
import {
  getResponseInitWithSession,
  redirectAndCommitSession,
} from '@/utils/redirectAndCommitSession';
import { RouteErrorBoundary } from '@/components/DefaultErrorBoundary/RouteErrorBoundary';
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId.server';
import { Alert, AlertTitle, Stack } from '@mui/material';
import { createNotificationFromAxiosError } from '@/utils/createNotificationFromAxiosError';
import { NavigationPanel } from '@/components/NavigationPanel/NavigationPanel';
import { linksFromFormSchema } from '@/components/NavigationPanel/utils';
import { RecordForm } from '@/components/Form/RecordForm';
import { SidebarLayout } from '@/components/Layout/SidebarLayout/SidebarLayout';
import { useNotificationSnackbar } from '@/utils/useNotificationSnackbar';
import { invariant } from '@/utils/invariant';

import type { Route } from './+types/recordCreate';

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const session = await getSessionFromCookie(request);
  const notification = session.get('notification');
  const { t } = context.i18n;

  const url = new URL(request.url);
  const validationTypeId = url.searchParams.get('validationType');
  invariant(validationTypeId, 'Missing validationTypeId param');

  const formDefinition = await getFormDefinitionByValidationTypeId(
    context.dependencies,
    validationTypeId,
    'create',
  );

  // Skapa ny {validationType}
  const createTitleText = t('divaClient_CreatePageTitleText', {
    validationType: t(formDefinition.form.label as string),
  });

  const title = `${createTitleText} | DiVA`;

  return data(
    { formDefinition, notification, title },
    await getResponseInitWithSession(session),
  );
};

export const action = async ({ context, request }: Route.ActionArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = await requireAuthentication(session);

  const url = new URL(request.url);
  const validationTypeId = url.searchParams.get('validationType');

  invariant(validationTypeId, 'Missing validationTypeId param');

  const formDefinition = await getFormDefinitionByValidationTypeId(
    context.dependencies,
    validationTypeId,
    'create',
  );
  const yupSchema = generateYupSchemaFromFormSchema(formDefinition);
  const resolver = yupResolver(yupSchema);
  const {
    errors,
    data: validatedFormData,
    receivedValues: defaultValues,
  } = await getValidatedFormData(request, resolver);
  if (errors) {
    return { errors, defaultValues };
  }

  try {
    const { recordType, id } = await createRecord(
      context.dependencies,
      formDefinition,
      validatedFormData as BFFDataRecordData,
      auth,
    );
    session.flash('notification', {
      severity: 'success',
      summary: `Record was successfully created ${id}`,
    });
    return redirectAndCommitSession(`/update/${recordType}/${id}`, session);
  } catch (error) {
    console.error(error);

    session.flash('notification', createNotificationFromAxiosError(error));

    return data({}, await getResponseInitWithSession(session));
  }
};

export const meta = ({ data }: Route.MetaArgs) => {
  return [{ title: data.title }];
};

export const ErrorBoundary = RouteErrorBoundary;

export default function CreateRecordRoute({
  loaderData,
}: Route.ComponentProps) {
  const { formDefinition, notification } = loaderData;

  useNotificationSnackbar(notification);

  return (
    <SidebarLayout
      sidebarContent={
        <NavigationPanel
          links={
            formDefinition ? linksFromFormSchema(formDefinition) || [] : []
          }
        />
      }
    >
      <Stack spacing={2}>
        {notification && notification.severity === 'error' && (
          <Alert severity={notification.severity}>
            <AlertTitle>{notification.summary}</AlertTitle>
            {notification.details}
          </Alert>
        )}
        <RecordForm formSchema={formDefinition} />
      </Stack>
    </SidebarLayout>
  );
}
