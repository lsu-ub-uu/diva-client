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

import { getSessionFromCookie, getAuth } from '@/auth/sessions.server';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId.server';
import { RouteErrorBoundary } from '@/components/DefaultErrorBoundary/RouteErrorBoundary';

import { getRecordTitle } from '@/utils/getRecordTitle';
import { SidebarLayout } from '@/components/Layout/SidebarLayout/SidebarLayout';
import { NavigationPanel } from '@/components/NavigationPanel/NavigationPanel';
import {
  linksFromFormSchema,
  removeComponentsWithoutValuesFromSchema,
} from '@/components/NavigationPanel/utils';
import { Stack } from '@mui/material';
import { ReadOnlyForm } from '@/components/Form/ReadOnlyForm';
import { invariant } from '@/utils/invariant';

import type { Route } from './+types/recordView';
import type { BFFDataRecord } from '@/types/record';
import { formDefForCheckTextValue } from '@/__mocks__/data/formDef';

export const loader = async ({
  request,
  params,
  context,
}: Route.LoaderArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);

  const { recordType, recordId } = params;

  const record: BFFDataRecord = {
    id: 'divaOutput:519333261463755',
    recordType: 'divaOutput',
    validationType: 'someValidationTypeId',
    createdAt: '2023-10-11T09:24:30.511487Z',
    createdBy: 'coraUser:490742519075086',
    userRights: ['read', 'update', 'index', 'delete'],
    updated: [],
    data: {
      someRootNameInData: {
        recordInfo: {
          id: {
            value: '12345',
          },

          validationType: {
            value: 'record',
          },
          dataDivider: {
            value: 'divaData',
          },
          type: [
            {
              value: 'record',
            },
          ],
          createdBy: [
            {
              value: '161616',
            },
          ],
          tsCreated: [
            {
              value: '2024-10-16T12:36:04.249992Z',
            },
          ],
          updated: [
            {
              tsUpdated: {
                value: '2024-10-16T12:36:04.249992Z',
              },
              updatedBy: {
                value: '161616',
              },
            },
          ],
        },
        someTextVar: {
          value: 'aaaaa',
        },
      },
    },
  };

  const title = `${getRecordTitle(record)} | DiVA`;

  invariant(record.validationType, 'Record has no validation type');
  const formDefinition = formDefForCheckTextValue;

  return { record, formDefinition, title };
};

export const meta = ({ data }: Route.MetaArgs) => {
  return [{ title: data?.title }];
};

export const ErrorBoundary = RouteErrorBoundary;

export default function ViewRecordRoute({ loaderData }: Route.ComponentProps) {
  const { record, formDefinition } = loaderData;
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
      <Stack spacing={2}>
        <ReadOnlyForm record={record} formSchema={formDefinition} />
      </Stack>
    </SidebarLayout>
  );
}
