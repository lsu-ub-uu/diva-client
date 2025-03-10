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
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { createRecord } from '@/data/createRecord.server';
import type { BFFDataRecordData } from '@/types/record';
import {
  getNotification,
  getSessionFromCookie,
  requireAuth,
} from '@/auth/sessions.server';
import {
  getResponseInitWithSession,
  redirectAndCommitSession,
} from '@/utils/redirectAndCommitSession';
import { RouteErrorBoundary } from '@/components/DefaultErrorBoundary/RouteErrorBoundary';
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId.server';
import { createNotificationFromAxiosError } from '@/utils/createNotificationFromAxiosError';
import { NavigationPanel } from '@/components/NavigationPanel/NavigationPanel';
import { linksFromFormSchema } from '@/components/NavigationPanel/utils';
import { RecordForm } from '@/components/Form/RecordForm';
import { SidebarLayout } from '@/components/Layout/SidebarLayout/SidebarLayout';
import { NotificationSnackbar } from '@/utils/NotificationSnackbar';
import { invariant } from '@/utils/invariant';
import type { Route } from './+types/recordCreate';
import styles from './record.module.css';
import { Alert, AlertTitle } from '@/components/Alert/Alert';
import { useState } from 'react';
import { ReadOnlyForm } from '@/components/Form/ReadOnlyForm';
import { parseFormData } from '@/utils/parseFormData';
import { ValidationError } from 'yup';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import type {
  FormSchema,
  RecordFormSchema,
} from '@/components/FormGenerator/types';
import { parseAndValidateFormData } from '@/utils/parseAndValidateFormData';

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const t = context.i18n.t;
  const session = await getSessionFromCookie(request);
  const notification = getNotification(session);

  const url = new URL(request.url);
  const validationTypeId = url.searchParams.get('validationType');
  invariant(validationTypeId, 'Missing validationTypeId param');

  const formDefinition = await getFormDefinitionByValidationTypeId(
    await context.dependencies,
    validationTypeId,
    'create',
  );

  const previewFormDefinition = await getFormDefinitionByValidationTypeId(
    await context.dependencies,
    validationTypeId,
    'view',
  );

  const title = t('divaClient_createRecordText');
  const breadcrumb = t('divaClient_createRecordText');
  return data(
    {
      formDefinition,
      previewFormDefinition,
      notification,
      title,
      breadcrumb,
    },
    await getResponseInitWithSession(session),
  );
};

export const action = async ({ context, request }: Route.ActionArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = await requireAuth(session);

  const url = new URL(request.url);
  const validationTypeId = url.searchParams.get('validationType');

  invariant(validationTypeId, 'Missing validationTypeId param');

  const formDefinition = await getFormDefinitionByValidationTypeId(
    await context.dependencies,
    validationTypeId,
    'create',
  );

  const { parsedFormData, errors } = await parseAndValidateFormData(
    formDefinition,
    request,
  );

  if (errors) {
    session.flash('notification', {
      severity: 'error',
      summary: 'Valideringsfel',
    });

    return data(
      {
        errors,
        defaultValues: parsedFormData,
      },
      await getResponseInitWithSession(session),
    );
  }

  try {
    const { recordType, id } = await createRecord(
      await context.dependencies,
      validationTypeId,
      parsedFormData,
      auth,
    );
    session.flash('notification', {
      severity: 'success',
      summary: `Record was successfully created ${id}`,
    });
    return redirectAndCommitSession(`/${recordType}/${id}/update`, session);
  } catch (error) {
    console.error(error);

    session.flash('notification', createNotificationFromAxiosError(error));
    return data({}, await getResponseInitWithSession(session));
  }
};

export const ErrorBoundary = RouteErrorBoundary;

export const meta = ({ data }: Route.MetaArgs) => {
  return [{ title: data.title }];
};

export default function CreateRecordRoute({
  loaderData,
}: Route.ComponentProps) {
  const { formDefinition, notification, previewFormDefinition } = loaderData;
  const [previewData, setPreviewData] = useState<FormData | undefined>(
    undefined,
  );

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
      <NotificationSnackbar notification={notification} />

      <div className={styles['record-wrapper']}>
        {notification && notification.severity === 'error' && (
          <Alert severity={notification.severity}>
            <AlertTitle>{notification.summary}</AlertTitle>
            {notification.details}
          </Alert>
        )}
        <div className={styles['form-wrapper']}>
          <RecordForm formSchema={formDefinition} onChange={setPreviewData} />
          <div className={styles['preview']}>
            <ReadOnlyForm
              formSchema={previewFormDefinition}
              data={previewData && parseFormData(previewData)}
            />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
