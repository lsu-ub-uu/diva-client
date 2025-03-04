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

import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId.server';
import { RouteErrorBoundary } from '@/components/DefaultErrorBoundary/RouteErrorBoundary';

import { getRecordTitle } from '@/utils/getRecordTitle';
import { SidebarLayout } from '@/components/Layout/SidebarLayout/SidebarLayout';
import { NavigationPanel } from '@/components/NavigationPanel/NavigationPanel';
import {
  linksFromFormSchema,
  removeComponentsWithoutValuesFromSchema,
} from '@/components/NavigationPanel/utils';
import { ReviewForm } from '@/components/Form/ReviewForm';
import { invariant } from '@/utils/invariant';

import type { Route } from './+types/recordView';
import styles from '@/routes/record.module.css';
import { useTranslation } from 'react-i18next';
import { fakeRecords } from '@/__mocks__/prototypeFakeData';
import { redirect } from 'react-router';
import { redirectAndCommitSession } from '@/utils/redirectAndCommitSession';

export const loader = async ({
  request,
  params,
  context,
}: Route.LoaderArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);

  const { recordType, recordId } = params;

  const record = fakeRecords.find((record) => record.id === recordId);
  /*const record = await getRecordByRecordTypeAndRecordId({
    dependencies: await context.dependencies,
    recordType,
    recordId,
    authToken: auth?.data.token,
  });*/

  const title = `${getRecordTitle(record)} | DiVA`;

  invariant(record.validationType, 'Record has no validation type');
  const formDefinition = await getFormDefinitionByValidationTypeId(
    await context.dependencies,
    record.validationType,
    'view',
  );

  return { record, formDefinition, title };
};

export const action = async ({ request, params }) => {
  const session = await getSessionFromCookie(request);
  session.flash('notification', {
    severity: 'success',
    summary: `Posten markerad som bibliografiskt granskad`,
  });

  return redirectAndCommitSession(
    `/${params.recordType}/${params.recordId}`,
    session,
  );
};

export const meta = ({ data }: Route.MetaArgs) => {
  return [{ title: data?.title ?? data.record.id }];
};

export const ErrorBoundary = RouteErrorBoundary;

export default function ReviewRecordRoute({
  loaderData,
}: Route.ComponentProps) {
  const { record, formDefinition } = loaderData;
  const { t } = useTranslation();
  return (
    <SidebarLayout
      sidebarContent={
        <NavigationPanel
          links={linksFromFormSchema(
            removeComponentsWithoutValuesFromSchema(formDefinition, record),
          )}
        />
      }
    >
      <div className={styles['record-wrapper']}>
        <ReviewForm record={record} formSchema={formDefinition} />
      </div>
    </SidebarLayout>
  );
}
