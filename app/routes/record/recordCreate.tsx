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

import {
  formDefWithOneRecordLinkBeingRequired1_1,
  formDefWithRecordLinkTypeBinary,
} from '@/__mocks__/data/form/recordLink';
import {
  getAuth,
  getNotification,
  getSessionFromCookie,
} from '@/auth/sessions.server';
import { Alert, AlertTitle } from '@/components/Alert/Alert';
import { RecordForm } from '@/components/Form/RecordForm';
import { createDefaultValuesFromFormSchema } from '@/components/FormGenerator/defaultValues/defaultValues';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { SidebarLayout } from '@/components/Layout/SidebarLayout/SidebarLayout';
import { NavigationPanel } from '@/components/NavigationPanel/NavigationPanel';
import { linksFromFormSchema } from '@/components/NavigationPanel/utils';
import { createRecord } from '@/data/createRecord.server';
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId.server';
import { ErrorPage, getIconByHTTPStatus } from '@/errorHandling/ErrorPage';
import { NotFoundError } from '@/errorHandling/NotFoundError';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';
import { getMetaTitleFromError } from '@/errorHandling/getMetaTitleFromError';
import type { BFFDataRecordData } from '@/types/record';
import { NotificationSnackbar } from '@/utils/NotificationSnackbar';
import { createNotificationFromAxiosError } from '@/utils/createNotificationFromAxiosError';
import { assertDefined } from '@/utils/invariant';
import {
  getResponseInitWithSession,
  redirectAndCommitSession,
} from '@/utils/redirectAndCommitSession';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { data, isRouteErrorResponse } from 'react-router';
import { getValidatedFormData } from 'remix-hook-form';
import type { Route } from '../record/+types/recordCreate';

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const t = context.i18n.t;
  const session = await getSessionFromCookie(request);
  const notification = getNotification(session);

  const url = new URL(request.url);
  const validationTypeId = url.searchParams.get('validationType');

  if (validationTypeId === null) {
    throw data('divaClient_missingValidationTypeParamText', { status: 400 });
  }
  let formDefinition;
  try {
    formDefinition = formDefWithRecordLinkTypeBinary;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw data(error.message, { status: error.status });
    }
    throw error;
  }

  const defaultValues = createDefaultValuesFromFormSchema(formDefinition);
  console.log(JSON.stringify(defaultValues, null, 2));

  const rootGroupTitleTextId =
    formDefinition.form.tooltip?.title ?? formDefinition.validationTypeId;

  const title = t('divaClient_createRecordText', {
    rootGroupTitle: t(rootGroupTitleTextId).toLowerCase(),
  });
  const breadcrumb = title;

  return data(
    { formDefinition, defaultValues, notification, title, breadcrumb },
    await getResponseInitWithSession(session),
  );
};

export const action = async ({ context, request }: Route.ActionArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);
  const { t } = context.i18n;

  const url = new URL(request.url);
  const validationTypeId = url.searchParams.get('validationType');

  assertDefined(validationTypeId, 'divaClient_missingValidationTypeIdText');

  const formDefinition = await getFormDefinitionByValidationTypeId(
    await context.dependencies,
    validationTypeId,
    'create',
  );
  const yupSchema = generateYupSchemaFromFormSchema(formDefinition);
  const resolver = yupResolver(yupSchema);
  console.log({ yupSchema });
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
      await context.dependencies,
      formDefinition,
      validatedFormData as BFFDataRecordData,
      auth,
    );
    session.flash('notification', {
      severity: 'success',
      summary: `Record was successfully created ${id}`,
    });
    return redirectAndCommitSession(`/${recordType}/${id}/update`, session);
  } catch (error) {
    session.flash('notification', createNotificationFromAxiosError(t, error));
    console.error(error);
  }

  return data({}, await getResponseInitWithSession(session));
};

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  const { t } = useTranslation();
  if (isRouteErrorResponse(error)) {
    const { status } = error;
    return (
      <ErrorPage
        icon={getIconByHTTPStatus(status)}
        titleText={t(`divaClient_error${status}TitleText`)}
        bodyText={t(`divaClient_error${status}BodyText`)}
        technicalInfo={t(error.data)}
      />
    );
  }

  return <UnhandledErrorPage error={error} />;
};

export const meta = ({ data, error }: Route.MetaArgs) => {
  return [{ title: error ? getMetaTitleFromError(error) : data?.title }];
};

export default function CreateRecordRoute({
  loaderData,
}: Route.ComponentProps) {
  const { formDefinition, notification, defaultValues } = loaderData;

  return (
    <>
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

        <div className='record-wrapper'>
          {notification && notification.severity === 'error' && (
            <Alert severity={notification.severity}>
              <AlertTitle>{notification.summary}</AlertTitle>
              {notification.details}
            </Alert>
          )}
          <RecordForm
            formSchema={formDefinition}
            defaultValues={defaultValues}
          />
        </div>
      </SidebarLayout>
    </>
  );
}
