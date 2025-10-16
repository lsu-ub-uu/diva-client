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

import { sessionContext } from '@/auth/sessionMiddleware.server';
import { Alert, AlertTitle } from '@/components/Alert/Alert';
import { ReadOnlyForm } from '@/components/Form/ReadOnlyForm';
import { RecordForm } from '@/components/Form/RecordForm';
import { createDefaultValuesFromFormSchema } from '@/components/FormGenerator/defaultValues/defaultValues';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { SidebarLayout } from '@/components/Layout/SidebarLayout/SidebarLayout';
import { NavigationPanel } from '@/components/NavigationPanel/NavigationPanel';
import { linksFromFormSchema } from '@/components/NavigationPanel/linksFromFormSchema';
import { createRecord } from '@/data/createRecord.server';
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId.server';
import { ErrorPage, getIconByHTTPStatus } from '@/errorHandling/ErrorPage';
import { NotFoundError } from '@/errorHandling/NotFoundError';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';
import { getMetaTitleFromError } from '@/errorHandling/getMetaTitleFromError';
import type { BFFDataRecordData } from '@/types/record';
import { createNotificationFromAxiosError } from '@/utils/createNotificationFromAxiosError';
import { assertDefined } from '@/utils/invariant';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDeferredValue, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { data, isRouteErrorResponse, redirect } from 'react-router';
import { getValidatedFormData } from 'remix-hook-form';
import { dependenciesContext } from 'server/depencencies';
import type { Route } from '../record/+types/recordCreate';
import css from './record.css?url';
import { i18nContext } from 'server/i18n';
import { getMemberFromHostname } from '@/utils/getMemberFromHostname';
import { createUser } from '@/auth/createUser';

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const { t } = context.get(i18nContext);
  const { notification, auth } = context.get(sessionContext);
  const { dependencies } = context.get(dependenciesContext);
  const url = new URL(request.url);
  const validationTypeId = url.searchParams.get('validationType');
  const member = getMemberFromHostname(request, dependencies);
  const user = auth && createUser(auth);

  if (validationTypeId === null) {
    throw data('divaClient_missingValidationTypeParamText', { status: 400 });
  }

  let formDefinition;
  let previewFormDefinition;
  try {
    formDefinition = await getFormDefinitionByValidationTypeId(
      dependencies,
      validationTypeId,
      'create',
    );

    previewFormDefinition = await getFormDefinitionByValidationTypeId(
      dependencies,
      validationTypeId,
      'view',
    );
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw data(error.message, { status: error.status });
    }
    throw error;
  }

  const defaultValues = createDefaultValuesFromFormSchema(
    formDefinition,
    undefined,
    member,
    user,
  );

  const rootGroupTitleTextId =
    formDefinition.form.tooltip?.title ?? formDefinition.validationTypeId;

  const title = t('divaClient_createRecordText', {
    rootGroupTitle: t(rootGroupTitleTextId).toLowerCase(),
  });
  const breadcrumb = title;

  return {
    formDefinition,
    previewFormDefinition,
    defaultValues,
    notification,
    title,
    breadcrumb,
  };
};

export const action = async ({ context, request }: Route.ActionArgs) => {
  const { auth, flashNotification } = context.get(sessionContext);
  const { t } = context.get(i18nContext);
  const { dependencies } = context.get(dependenciesContext);
  const url = new URL(request.url);
  const validationTypeId = url.searchParams.get('validationType');

  assertDefined(validationTypeId, 'divaClient_missingValidationTypeIdText');

  const formDefinition = await getFormDefinitionByValidationTypeId(
    dependencies,
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
      dependencies,
      formDefinition,
      validatedFormData as BFFDataRecordData,
      auth,
    );
    flashNotification({
      severity: 'success',
      summary: `Record was successfully created ${id}`,
    });
    return redirect(`/${recordType}/${id}/update`);
  } catch (error) {
    flashNotification(createNotificationFromAxiosError(t, error));
    console.error(error);
  }
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

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: css },
];

export default function CreateRecordRoute({
  loaderData,
}: Route.ComponentProps) {
  const { t } = useTranslation();
  const { formDefinition, previewFormDefinition, notification, defaultValues } =
    loaderData;

  const [previewData, setPreviewData] = useState<BFFDataRecordData | null>(
    null,
  );
  const deferredPreviewData = useDeferredValue(previewData);

  const handleFormChange = (data: BFFDataRecordData) => {
    setPreviewData(data);
  };
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
        {notification && notification.severity === 'error' && (
          <Alert severity={notification.severity} className='error-alert'>
            <AlertTitle>{notification.summary}</AlertTitle>
            {notification.details}
          </Alert>
        )}
        <div className='record-wrapper'>
          <RecordForm
            formSchema={formDefinition}
            defaultValues={defaultValues}
            onChange={handleFormChange}
          />

          {deferredPreviewData && (
            <div className='preview'>
              <ReadOnlyForm
                recordData={deferredPreviewData}
                formSchema={previewFormDefinition}
              />
            </div>
          )}
        </div>
      </SidebarLayout>
    </>
  );
}
