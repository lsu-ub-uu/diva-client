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

import { UpdateRecordPage } from '@/pages';

import {
  commitSession,
  getSessionFromCookie,
  requireAuth,
} from '@/auth/sessions.server';
import {
  type ActionFunctionArgs,
  data,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import { getRecordByRecordTypeAndRecordId } from '@/.server/data/getRecordByRecordTypeAndRecordId';
import { invariant } from '@remix-run/router/history';
import { getFormDefinitionByValidationTypeId } from '@/.server/data/getFormDefinitionByValidationTypeId';
import { useLoaderData } from '@remix-run/react';
import { getValidatedFormData, parseFormData } from 'remix-hook-form';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateRecord } from '@/.server/data/updateRecord';
import type { BFFDataRecord } from '@/types/record';
import { getResponseInitWithSession } from '@/utils/redirectAndCommitSession';
import { createDefaultValuesFromFormSchema } from '@/components/FormGenerator/defaultValues/defaultValues';
import type { ErrorBoundaryComponent } from '@remix-run/react/dist/routeModules';
import { RouteErrorBoundary } from '@/components/DefaultErrorBoundary/RouteErrorBoundary';

import { getRecordTitle } from '@/utils/getRecordTitle';
import { createNotificationFromAxiosError } from '@/utils/createNotificationFromAxiosError';
import { useNotificationSnackbar } from '@/utils/useNotificationSnackbar';
import { Alert, AlertTitle } from '@mui/material';

export const ErrorBoundary: ErrorBoundaryComponent = RouteErrorBoundary;

export const action = async ({
  request,
  params,
  context,
}: ActionFunctionArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = await requireAuth(session);
  const { recordType, recordId } = params;
  invariant(recordType, 'Missing recordType param');
  invariant(recordId, 'Missing recordId param');
  const formData = await request.formData();
  const parsedFormData = (await parseFormData(formData)) as any;
  const validationType =
    parsedFormData.output?.recordInfo?.validationType?.value;
  invariant(validationType, 'Failed to extract validationType from form data');
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

export async function loader({ request, params, context }: LoaderFunctionArgs) {
  const session = await getSessionFromCookie(request);
  const auth = await requireAuth(session);
  const { t } = context.i18n;

  const notification = session.get('notification');

  const { recordType, recordId } = params;
  invariant(recordType, 'Missing recordType param');
  invariant(recordId, 'Missing recordId param');

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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.title }];
};

export default function UpdateRecordRoute() {
  const { record, formDefinition, notification } =
    useLoaderData<typeof loader>();

  useNotificationSnackbar(notification);

  return (
    <>
      {notification && notification.severity === 'error' && (
        <Alert severity={notification.severity}>
          <AlertTitle>{notification.summary}</AlertTitle>
          {notification.details}
        </Alert>
      )}
      <UpdateRecordPage
        record={record}
        formDefinition={formDefinition}
      />
    </>
  );
}
