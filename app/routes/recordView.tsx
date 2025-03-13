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
  getSessionFromCookie,
  getAuth,
  getNotification,
} from '@/auth/sessions.server';
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId.server';
import { RouteErrorBoundary } from '@/components/DefaultErrorBoundary/RouteErrorBoundary';

import { getRecordTitle } from '@/utils/getRecordTitle';
import { SidebarLayout } from '@/components/Layout/SidebarLayout/SidebarLayout';
import { NavigationPanel } from '@/components/NavigationPanel/NavigationPanel';
import {
  linksFromFormSchema,
  removeComponentsWithoutValuesFromSchema,
} from '@/components/NavigationPanel/utils';
import { ReadOnlyForm } from '@/components/Form/ReadOnlyForm';
import { invariant } from '@/utils/invariant';

import type { Route } from './+types/recordView';
import styles from '@/routes/record.module.css';
import { FloatingActionButton } from '@/components/FloatingActionButton/FloatingActionButton';
import { DeleteIcon, EditDocumentIcon, MysteryIcon } from '@/icons';
import { FloatingActionButtonContainer } from '@/components/FloatingActionButton/FloatingActionButtonContainer';
import { data, Form, Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { fakeRecords } from '@/__mocks__/prototypeFakeData';
import { NotificationSnackbar } from '@/utils/NotificationSnackbar';
import { getResponseInitWithSession } from '@/utils/redirectAndCommitSession';
import { merge } from 'lodash-es';

export const loader = async ({
  request,
  params,
  context,
}: Route.LoaderArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);

  const { recordType, recordId } = params;
  const notification = getNotification(session);

  const record = fakeRecords.find((record) => record.id === recordId);

  const title = `${getRecordTitle(record)} | DiVA`;

  invariant(record.validationType, 'Record has no validation type');
  const formDefinition = await getFormDefinitionByValidationTypeId(
    await context.dependencies,
    record.validationType,
    'view',
  );

  return data(
    { record, formDefinition, title, notification },
    await getResponseInitWithSession(session),
  );
};

export const meta = ({ data }: Route.MetaArgs) => {
  return [{ title: data?.title ?? data.record.id }];
};

export const ErrorBoundary = RouteErrorBoundary;

export default function ViewRecordRoute({ loaderData }: Route.ComponentProps) {
  const { record, formDefinition, notification } = loaderData;
  const location = useLocation();
  const reviewed =
    new URLSearchParams(location.search).get('reviewed') !== null;
  console.log('reviewed', reviewed, record);
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
      <NotificationSnackbar notification={notification} />
      <div className={styles['record-wrapper']}>
        <ReadOnlyForm
          record={
            reviewed
              ? merge(record, {
                  data: { output: { admin: { reviewed: { value: 'true' } } } },
                })
              : record
          }
          formSchema={formDefinition}
        />
      </div>
      <FloatingActionButtonContainer>
        <FloatingActionButton
          as={Link}
          to='update'
          text={'Redigera'}
          icon={<EditDocumentIcon />}
        />
        <FloatingActionButton
          as={Link}
          to='review'
          text={'Granska'}
          icon={<MysteryIcon />}
        />
      </FloatingActionButtonContainer>
    </SidebarLayout>
  );
}
