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
import { Button } from '@/components/Button/Button';
import { FloatingActionButton } from '@/components/FloatingActionButton/FloatingActionButton';
import { FloatingActionButtonContainer } from '@/components/FloatingActionButton/FloatingActionButtonContainer';
import { ReadOnlyForm } from '@/components/Form/ReadOnlyForm';
import { externalCoraApiUrl } from '@/cora/helper.server';
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId.server';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import { CodeIcon, DeleteIcon, EditDocumentIcon } from '@/icons';
import { assertDefined } from '@/utils/invariant';
import { useTranslation } from 'react-i18next';
import { Form, href, Link } from 'react-router';
import { dependenciesContext } from 'server/depencencies';
import type { Route } from '../record/+types/recordView';

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
      <div className='record-wrapper'>
        <Button
          className='api-button'
          variant='tertiary'
          as='a'
          href={apiUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          <CodeIcon />
          {t('divaClient_viewInApiText')}
        </Button>
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
            icon={<EditDocumentIcon />}
          />
        )}
        {record.userRights?.includes('delete') && (
          <Form method='POST' action='delete'>
            <FloatingActionButton
              type='submit'
              text={t('divaClient_deleteRecordText')}
              icon={<DeleteIcon />}
            />
          </Form>
        )}
      </FloatingActionButtonContainer>
    </main>
  );
}
