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

import { createUser } from '@/auth/createUser';
import { sessionContext } from '@/auth/sessionMiddleware.server';
import { Alert, AlertTitle } from '@/components/Alert/Alert';
import { ReadOnlyForm } from '@/components/Form/ReadOnlyForm';
import { getMemberFromHostname } from '@/utils/getMemberFromHostname';
import { useDeferredValue, useState } from 'react';
import { dependenciesContext } from 'server/depencencies';
import { i18nContext } from 'server/i18n';
import type { Route } from '../record/+types/recordUpdate';

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const { auth, notification } = context.get(sessionContext);
  const { t } = context.get(i18nContext);
  const { dependencies } = context.get(dependenciesContext);
  const member = getMemberFromHostname(request, dependencies);
  const user = auth && createUser(auth);
  const { recordType, recordId } = params;

  const record = await getRecordByRecordTypeAndRecordId({
    dependencies,
    recordType,
    recordId,
    authToken: auth?.data.token,
    mode: 'update',
  });

  const title = `${t('divaClient_UpdatingPageTitleText')} ${getRecordTitle(record)} | DiVA`;

  if (record?.validationType == null) {
    throw new Error();
  }
  const formDefinition = await getFormDefinitionByValidationTypeId(
    dependencies,
    record.validationType,
    'update',
  );

  const previewFormDefinition = await getFormDefinitionByValidationTypeId(
    dependencies,
    record.validationType,
    'view',
  );

  const defaultValues = createDefaultValuesFromFormSchema(
    formDefinition,
    record.data,
    member,
    user,
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
  const { recordType: recordTypeId, recordId } = params;
  const { t } = context.get(i18nContext);
  const { auth, flashNotification } = context.get(sessionContext);
  const { dependencies } = context.get(dependenciesContext);

  const formData = await request.formData();

  const { validationType } = await getRecordByRecordTypeAndRecordId({
    dependencies,
    recordType: recordTypeId,
    recordId,
    authToken: auth?.data.token,
    mode: 'update',
  });

  const recordType = dependencies.recordTypePool.get(recordTypeId);

  assertDefined(validationType, 'Failed to get validation type from record');

  const formDefinition = await getFormDefinitionByValidationTypeId(
    dependencies,
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
      dependencies,
      validationType,
      recordId,
      validatedFormData as unknown as BFFDataRecord,
      auth,
    );
    flashNotification({
      severity: 'success',
      summary: t('divaClient_recordSuccessfullyUpdatedText', {
        recordType: t(recordType.textId),
        id: recordId,
      }),
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
