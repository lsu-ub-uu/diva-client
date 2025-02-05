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

import {
  commitSession,
  getNotification,
  getSessionFromCookie,
  requireAuth,
} from '@/auth/sessions.server';
import { data } from 'react-router';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId.server';
import { getValidatedFormData } from 'remix-hook-form';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateRecord } from '@/data/updateRecord.server';
import type { BFFDataRecord } from '@/types/record';
import { getResponseInitWithSession } from '@/utils/redirectAndCommitSession';
import { createDefaultValuesFromFormSchema } from '@/components/FormGenerator/defaultValues/defaultValues';
import { RouteErrorBoundary } from '@/components/DefaultErrorBoundary/RouteErrorBoundary';

import { getRecordTitle } from '@/utils/getRecordTitle';
import { createNotificationFromAxiosError } from '@/utils/createNotificationFromAxiosError';
import { SidebarLayout } from '@/components/Layout/SidebarLayout/SidebarLayout';
import { NavigationPanel } from '@/components/NavigationPanel/NavigationPanel';
import { linksFromFormSchema } from '@/components/NavigationPanel/utils';
import { RecordForm } from '@/components/Form/RecordForm';
import { Alert, AlertTitle } from '@mui/material';
import { useNotificationSnackbar } from '@/utils/useNotificationSnackbar';
import { invariant } from '@/utils/invariant';

import type { Route } from './+types/recordUpdate';

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const session = await getSessionFromCookie(request);
  const auth = await requireAuth(session);
  const { t } = context.i18n;

  const notification = getNotification(session);

  const { recordType, recordId } = params;

  const record = await getRecordByRecordTypeAndRecordId({
    dependencies: context.dependencies,
    recordType,
    recordId,
    authToken: auth.data.token,
  });

  const title = `${t('divaClient_UpdatingPageTitleText')} ${getRecordTitle(record)} | DiVA`;

  if (record?.validationType == null) {
    throw new Error();
  }
  const formDefinition = await getFormDefinitionByValidationTypeId(
    context.dependencies,
    record.validationType,
    'update',
  );

  const defaultValues = createDefaultValuesFromFormSchema(
    formDefinition,
    record,
  );

  return data(
    { record, formDefinition, defaultValues, notification, title },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  );
}

export const action = async ({
  request,
  params,
  context,
}: Route.ActionArgs) => {
  const { recordType, recordId } = params;

  const session = await getSessionFromCookie(request);
  const auth = await requireAuth(session);
  const formData = await request.formData();

  const { validationType } = await getRecordByRecordTypeAndRecordId({
    dependencies: context.dependencies,
    recordType,
    recordId,
    authToken: auth.data.token,
  });

  invariant(validationType, 'Failed to get validation type from record');

  const formDefinition = await getFormDefinitionByValidationTypeId(
    context.dependencies,
    validationType,
    'update',
  );
  const resolver = yupResolver(generateYupSchemaFromFormSchema(formDefinition));
  const {
    errors,
    data: validatedFormData,
    receivedValues: defaultValues,
  } = await getValidatedFormData(formData, resolver);

  if (errors) {
    return { errors, defaultValues };
  }

  try {
    await updateRecord(
      context.dependencies,
      validationType,
      recordId,
      validatedFormData as unknown as BFFDataRecord,
      auth,
    );
    session.flash('notification', {
      severity: 'success',
      summary: `Record was successfully updated`,
    });
  } catch (error) {
    console.error(error);
    session.flash('notification', createNotificationFromAxiosError(error));
  }

  return data({}, await getResponseInitWithSession(session));
};

export const meta = ({ data }: Route.MetaArgs) => {
  return [{ title: data?.title }];
};

export const ErrorBoundary = RouteErrorBoundary;

export default function UpdateRecordRoute({
  loaderData,
}: Route.ComponentProps) {
  const { record, formDefinition, notification } = loaderData;
  useNotificationSnackbar(notification);

  const lastUpdate =
    record?.updated && record.updated[record.updated?.length - 1].updateAt;
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
      {notification && notification.severity === 'error' && (
        <Alert severity={notification.severity}>
          <AlertTitle>{notification.summary}</AlertTitle>
          {notification.details}
        </Alert>
      )}
      <RecordForm
        key={lastUpdate}
        record={record}
        formSchema={formDefinition}
      />
    </SidebarLayout>
  );
}
