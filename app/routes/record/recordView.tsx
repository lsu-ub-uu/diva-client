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

import { sessionContext } from '@/auth/sessionMiddleware.server';
import { FloatingActionButton } from '@/components/FloatingActionButton/FloatingActionButton';
import { FloatingActionButtonContainer } from '@/components/FloatingActionButton/FloatingActionButtonContainer';
import { ReadOnlyForm } from '@/components/Form/ReadOnlyForm';
import { externalCoraApiUrl } from '@/cora/helper.server';
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId.server';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import { assertDefined } from '@/utils/invariant';
import { FilePenIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { href, Link } from 'react-router';
import { dependenciesContext } from 'server/depencencies';
import type { Route } from '../record/+types/recordView';
import { ActionBar } from './ActionBar/ActionBar';

export const loader = async ({ params, context }: Route.LoaderArgs) => {
  const { auth } = context.get(sessionContext);
  const { dependencies } = context.get(dependenciesContext);
  const { recordType, recordId } = params;
  const apiUrl = externalCoraApiUrl(`/record/${recordType}/${recordId}`);
  const record = await getRecordByRecordTypeAndRecordId({
    dependencies,
    recordType,
    recordId,
    authToken: auth?.data.token,
    mode: 'view',
  });

  assertDefined(record.validationType, 'Record has no validation type');
  const formDefinition = await getFormDefinitionByValidationTypeId(
    dependencies,
    record.validationType,
    'view',
  );

  return { record, formDefinition, apiUrl };
};

export default function ViewRecordRoute({ loaderData }: Route.ComponentProps) {
  const { record, formDefinition, apiUrl } = loaderData;
  const { t } = useTranslation();

  return (
    <main>
      <ActionBar record={record} apiUrl={apiUrl} outputPage={false} />
      <div className='record-wrapper'>
        <ReadOnlyForm
          recordData={record.data}
          formSchema={formDefinition}
          key={record?.id}
        />
      </div>
      <FloatingActionButtonContainer>
        {record.userRights?.includes('update') && (
          <FloatingActionButton
            as={Link}
            to={href('/:recordType/:recordId/update', {
              recordType: record.recordType,
              recordId: record.id,
            })}
            text={t('divaClient_editRecordText')}
            icon={<FilePenIcon />}
          />
        )}
      </FloatingActionButtonContainer>
    </main>
  );
}
