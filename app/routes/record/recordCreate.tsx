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

import { createUser } from '@/auth/createUser';
import { sessionContext } from '@/auth/sessionMiddleware.server';
import { Alert, AlertTitle } from '@/components/Alert/Alert';
import { RecordForm } from '@/components/Form/RecordForm';
import { createDefaultValuesFromFormSchema } from '@/components/FormGenerator/defaultValues/defaultValues';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import { NavigationPanel } from '@/components/NavigationPanel/NavigationPanel';
import { linksFromFormSchema } from '@/components/NavigationPanel/linksFromFormSchema';
import { OutputPresentation } from '@/components/OutputPresentation/OutputPresentation';
import { ValidationTypePicker } from '@/components/ValidationTypePicker/ValidationTypePicker';
import { transformToRaw } from '@/cora/transform/transformToRaw';
import { createRecord } from '@/data/createRecord.server';
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId.server';
import { getValidationTypes } from '@/data/getValidationTypes.server';
import { ErrorPage, getIconByHTTPStatus } from '@/errorHandling/ErrorPage';
import { NotFoundError } from '@/errorHandling/NotFoundError';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';
import { getMetaTitleFromError } from '@/errorHandling/getMetaTitleFromError';
import type { BFFDataRecordData } from '@/types/record';
import { createNotificationFromAxiosError } from '@/utils/createNotificationFromAxiosError';
import { getMemberFromHostname } from '@/utils/getMemberFromHostname';
import { assertDefined } from '@/utils/invariant';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDeferredValue, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { data, isRouteErrorResponse, redirect } from 'react-router';
import { getValidatedFormData } from 'remix-hook-form';
import { getDependencies } from 'server/dependencies/depencencies';
import { i18nContext } from 'server/i18n';
import type { Route } from '../record/+types/recordCreate';
import css from './record.css?url';
import { cleanFormData } from '@/utils/cleanFormData';
import { InputPresentation } from '@/components/InputPresentation/InputPresentation';
import type { DataGroup } from '@/cora/cora-data/types.server';
import { transformFormDataToCora } from './transformFormDataToCora';
import { postRecordData } from '@/cora/postRecordData.server';
import { validateFormData } from '@/components/InputPresentation/validateFormData';

export const loader = async ({
  request,
  context,
  params,
}: Route.LoaderArgs) => {
  const { t } = context.get(i18nContext);
  const { auth, notification } = context.get(sessionContext);
  const url = new URL(request.url);
  const dependencies = await getDependencies();
  const member = getMemberFromHostname(request, dependencies);
  const user = auth && createUser(auth);

  let validationTypeId = url.searchParams.get('validationType');

  if (!validationTypeId) {
    if (!auth) {
      throw data(null, { status: 401 });
    }
    const validationTypes = getValidationTypes(params.recordType, dependencies);
    if (validationTypes && validationTypes.length === 1) {
      validationTypeId = validationTypes[0].value;
    } else {
      const title = t('divaClient_createRecordText', {
        rootGroupTitle: t(
          dependencies.recordTypePool.get(params.recordType).textId,
        ).toLowerCase(),
      });
      return {
        formDefinition: undefined,
        previewFormDefinition: undefined,
        defaultValues: undefined,
        notification,
        title: title,
        breadcrumb: title,
        validationTypes,
      };
    }
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
    validationTypes: null,
  };
};

export const action = async ({
  context,
  request,
  params,
}: Route.ActionArgs) => {
  const { auth, flashNotification } = context.get(sessionContext);
  const { t } = context.get(i18nContext);
  const url = new URL(request.url);
  const validationTypeId = url.searchParams.get('validationType');
  assertDefined(validationTypeId, 'divaClient_missingValidationTypeIdText');

  const dependencies = await getDependencies();
  const formDefinition = await getFormDefinitionByValidationTypeId(
    dependencies,
    validationTypeId,
    'create',
  );

  const formData = await request.formData();

  console.log('Received form data:', formData);

  const transformedFormData = transformFormDataToCora(formData);

  console.log(
    'Transformed form data:',
    JSON.stringify(transformedFormData, null, 2),
  );

  const { valid, errors } = validateFormData(
    formDefinition,
    transformedFormData,
  );

  console.log('Validation result:', { valid, errors });

  if (!valid) {
    return { validationErrors: errors, data: transformedFormData };
  }

  try {
    await postRecordData(
      transformedFormData,
      params.recordType,
      auth?.data?.token,
    );
    flashNotification({
      severity: 'success',
      summary: 'yess',
    });
  } catch (error) {
    flashNotification(createNotificationFromAxiosError(t, error));
    console.error(error);
  }

  //  { const yupSchema = generateYupSchemaFromFormSchema(formDefinition);
  //   const resolver = yupResolver(yupSchema);

  //   const {
  //     errors,
  //     data: validatedFormData,
  //     receivedValues: defaultValues,
  //   } = await getValidatedFormData(request, resolver);
  //   if (errors) {
  //     return { errors, defaultValues };
  //   }

  //   try {
  //     const { recordType: recordTypeId, id } = await createRecord(
  //       dependencies,
  //       formDefinition,
  //       validatedFormData as BFFDataRecordData,
  //       auth,
  //     );
  //     const recordType = dependencies.recordTypePool.get(recordTypeId);
  //     flashNotification({
  //       severity: 'success',
  //       summary: t('divaClient_recordSuccessfullyCreatedText', {
  //         recordType: t(recordType.textId),
  //         id,
  //       }),
  //     });
  //     return redirect(`/${recordTypeId}/${id}/update`);
  //   } catch (error) {
  //     flashNotification(createNotificationFromAxiosError(t, error));
  //     console.error(error);
  //   }}
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
  return [
    { title: error ? getMetaTitleFromError(error) : `${data?.title} | DiVA` },
  ];
};

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: css },
];

export default function CreateRecordRoute({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { t } = useTranslation();
  const {
    formDefinition,
    previewFormDefinition,
    notification,
    validationTypes,
  } = loaderData;

  const { validationErrors, data } = actionData ?? {};
  const [previewData, setPreviewData] = useState<DataGroup | null>(null);
  const deferredPreviewData = useDeferredValue(previewData);
  console.log('Action data:', actionData);
  if (!formDefinition) {
    return (
      <main>
        <h1>{t('divaClient_selectValidationTypeText')}</h1>
        <ValidationTypePicker validationTypes={validationTypes ?? []} />
      </main>
    );
  }

  const handleFormChange = (data: DataGroup) => {
    setPreviewData(data);
  };

  return (
    <div className='grid main-content'>
      <div className='grid-col-12 top-bar'>
        <Breadcrumbs />
      </div>
      <aside className='navigation-sidebar grid-col-2 grid-col-l-3 grid-col-m-hidden'>
        <NavigationPanel
          links={
            formDefinition ? linksFromFormSchema(formDefinition) || [] : []
          }
        />
      </aside>
      <main className='record-form grid-col-6 grid-col-l-9 grid-col-m-12'>
        {notification && notification.severity === 'error' && (
          <Alert severity={notification.severity} className='error-alert'>
            <AlertTitle>{notification.summary}</AlertTitle>
            {notification.details}
          </Alert>
        )}
        <InputPresentation
          formSchema={formDefinition}
          data={data}
          validationErrors={validationErrors}
          onDataChange={handleFormChange}
        />
      </main>
      <aside className='grid-col-4 grid-col-l-hidden'>
        {deferredPreviewData && (
          <div className='preview'>
            <OutputPresentation
              data={deferredPreviewData}
              formSchema={previewFormDefinition}
            />
          </div>
        )}
      </aside>
    </div>
  );
}
