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

import { createDefaultValuesFromFormSchema } from '@/components/FormGenerator/defaultValues/defaultValues';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId.server';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import { updateRecord } from '@/data/updateRecord.server';
import type { BFFDataRecord, BFFDataRecordData } from '@/types/record';
import { yupResolver } from '@hookform/resolvers/yup';
import { getValidatedFormData } from 'remix-hook-form';

import { RecordForm } from '@/components/Form/RecordForm';
import { SidebarLayout } from '@/components/Layout/SidebarLayout/SidebarLayout';
import { NavigationPanel } from '@/components/NavigationPanel/NavigationPanel';
import { linksFromFormSchema } from '@/components/NavigationPanel/linksFromFormSchema';
import { createNotificationFromAxiosError } from '@/utils/createNotificationFromAxiosError';
import { getRecordTitle } from '@/utils/getRecordTitle';
import { assertDefined } from '@/utils/invariant';

import { authContext } from '@/auth/authMiddleware.server';
import { Alert, AlertTitle } from '@/components/Alert/Alert';
import { ReadOnlyForm } from '@/components/Form/ReadOnlyForm';
import { notificationContext } from '@/notification/notificationMiddleware';
import { useDeferredValue, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Route } from '../record/+types/recordUpdate';

export async function loader({ params, context }: Route.LoaderArgs) {
  const auth = context.get(authContext);
  const { t } = context.i18n;
  const { notification } = context.get(notificationContext);

  const { recordType, recordId } = params;

  const record = await getRecordByRecordTypeAndRecordId({
    dependencies: await context.dependencies,
    recordType,
    recordId,
    authToken: auth?.data.token,
  });

  const title = `${t('divaClient_UpdatingPageTitleText')} ${getRecordTitle(record)} | DiVA`;

  if (record?.validationType == null) {
    throw new Error();
  }
  const formDefinition = await getFormDefinitionByValidationTypeId(
    await context.dependencies,
    record.validationType,
    'update',
  );

  const previewFormDefinition = await getFormDefinitionByValidationTypeId(
    await context.dependencies,
    record.validationType,
    'view',
  );

  const defaultValues = createDefaultValuesFromFormSchema(
    formDefinition,
    record.data,
  );

  const breadcrumb = t('divaClient_UpdatingPageTitleText');

  return {
    record,
    formDefinition,
    previewFormDefinition,
    defaultValues,
    notification,
    title,
    breadcrumb,
  };
}

export const action = async ({
  request,
  params,
  context,
}: Route.ActionArgs) => {
  const { recordType, recordId } = params;
  const { t } = context.i18n;
  const { flashNotification } = context.get(notificationContext);

  const auth = context.get(authContext);
  const formData = await request.formData();

  const { validationType } = await getRecordByRecordTypeAndRecordId({
    dependencies: await context.dependencies,
    recordType,
    recordId,
    authToken: auth?.data.token,
  });

  assertDefined(validationType, 'Failed to get validation type from record');

  const formDefinition = await getFormDefinitionByValidationTypeId(
    await context.dependencies,
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
      await context.dependencies,
      validationType,
      recordId,
      validatedFormData as unknown as BFFDataRecord,
      auth,
    );
    flashNotification({
      severity: 'success',
      summary: `Record was successfully updated`,
    });
  } catch (error) {
    console.error(error);
    flashNotification(createNotificationFromAxiosError(t, error));
  }
};

export const meta = ({ data }: Route.MetaArgs) => {
  return [{ title: data?.title }];
};

export default function UpdateRecordRoute({
  loaderData,
}: Route.ComponentProps) {
  const { t } = useTranslation();
  const {
    record,
    formDefinition,
    previewFormDefinition,
    notification,
    defaultValues,
  } = loaderData;
  const lastUpdate =
    record?.updated && record.updated[record.updated?.length - 1].updateAt;

  const [previewData, setPreviewData] = useState<BFFDataRecordData | null>(
    record.data,
  );
  const deferredPreviewData = useDeferredValue(previewData);

  const handleFormChange = (data: BFFDataRecordData) => {
    setPreviewData(data);
  };

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
        <Alert severity={notification.severity} className='error-alert'>
          <AlertTitle>{notification.summary}</AlertTitle>
          {notification.details}
        </Alert>
      )}
      <div className='record-wrapper'>
        <RecordForm
          key={lastUpdate}
          defaultValues={defaultValues}
          formSchema={formDefinition}
          onChange={handleFormChange}
        />
        {deferredPreviewData && (
          <div className='preview'>
            <h2 className='preview-heading'>
              {t('divaClient_formPreviewHeadingText')}
            </h2>
            <ReadOnlyForm
              recordData={deferredPreviewData}
              formSchema={previewFormDefinition}
            />
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}
