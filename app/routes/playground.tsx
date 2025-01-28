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

import { type ActionFunctionArgs, data, useLoaderData } from 'react-router';
import { getSessionFromCookie } from '@/auth/sessions.server';
import { getResponseInitWithSession } from '@/utils/redirectAndCommitSession';
import { RouteErrorBoundary } from '@/components/DefaultErrorBoundary/RouteErrorBoundary';
import { Alert, AlertTitle, Stack } from '@mui/material';
import { RecordForm } from '@/components/Form/RecordForm';
import { SidebarLayout } from '@/components/Layout/SidebarLayout/SidebarLayout';
import { useNotificationSnackbar } from '@/utils/useNotificationSnackbar';
import {
  formDefWithHiddenInputs,
  formDefWithOneOptionalGroupWithTextVariableAndAttributeCollection,
  formDefWithOneTextVariable,
} from '@/__mocks__/data/formDef';
import { useState } from 'react';
import styles from './playground.module.css';

export const ErrorBoundary = RouteErrorBoundary;

export const loader = async ({ request, context }: ActionFunctionArgs) => {
  const session = await getSessionFromCookie(request);
  const notification = session.get('notification');

  return data({ notification }, await getResponseInitWithSession(session));
};

export default function PlaygroundRoute() {
  const { notification } = useLoaderData<typeof loader>();
  const [formDefinition, setFormDefinition] = useState({
    validationTypeId: 'someValidationTypeId',
    form: {
      type: 'group',
      label: 'someRootFormGroupText',
      showLabel: true,
      name: 'someRootNameInData',
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      tooltip: {
        title: 'textId345',
        body: 'defTextId678',
      },
      components: [
        {
          type: 'textVariable',
          name: 'someNameInData',
          placeholder: 'someEmptyTextId',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          validation: {
            type: 'regex',
            pattern: '.?',
          },
          inputType: 'input',
        },
      ],
      mode: 'input',
    },
  });
  useNotificationSnackbar(notification);
  const handleValueChange = (event) => {
    console.log({ formDefinition });
    // setFormDefinition(event.target.value);
  };
  return (
    <SidebarLayout>
      <Stack spacing={2}>
        {notification && notification.severity === 'error' && (
          <Alert severity={notification.severity}>
            <AlertTitle>{notification.summary}</AlertTitle>
            {notification.details}
          </Alert>
        )}
        <textarea
          placeholder='Paste forDef here'
          id='playground-textarea'
          className={styles.textarea}
          onChange={handleValueChange}
        ></textarea>
        <RecordForm formSchema={formDefinition} />
      </Stack>
    </SidebarLayout>
  );
}
