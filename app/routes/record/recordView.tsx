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
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId.server';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import { assertDefined } from '@/utils/invariant';
import { getDependencies } from 'server/dependencies/depencencies';
import type { Route } from '../record/+types/recordView';
import { getRecordDataById } from '@/cora/getRecordDataById.server';
import { OutputPresentation } from '@/components/OutputPresentation/OutputPresentation';
import type { RecordWrapper } from '@/cora/cora-data/types.server';
import { extractLinkedRecordIdFromNamedRecordLink } from '@/cora/cora-data/CoraDataTransforms.server';
import { getFirstDataGroupWithNameInData } from '@/cora/cora-data/CoraDataUtils.server';

export const loader = async ({ params, context }: Route.LoaderArgs) => {
  const { auth } = context.get(sessionContext);
  const { recordType, recordId } = params;
  const dependencies = await getDependencies();

  const recordResponse = await getRecordDataById<RecordWrapper>(
    recordType,
    recordId,
    auth?.data.token,
  );

  const validationTypeId = extractLinkedRecordIdFromNamedRecordLink(
    getFirstDataGroupWithNameInData(
      recordResponse.data.record.data,
      'recordInfo',
    ),
    'validationType',
  );

  const formDefinition = await getFormDefinitionByValidationTypeId(
    dependencies,
    validationTypeId,
    'view',
  );

  return { formDefinition, recordData: recordResponse.data.record.data };
};

export default function ViewRecordRoute({ loaderData }: Route.ComponentProps) {
  const { formDefinition, recordData } = loaderData;
  return (
    <main className='grid'>
      <div className='grid-col-6 grid-col-l-12'>
        <OutputPresentation data={recordData} formSchema={formDefinition} />
      </div>
    </main>
  );
}
