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
import {
  getFirstDataAtomicWithNameInData,
  getFirstDataGroupWithNameInData,
  hasChildWithNameInData,
} from '@/cora/cora-data/CoraDataUtils.server';
import type { DataGroup, RecordWrapper } from '@/cora/cora-data/types.server';
import { getRecordDataById } from '@/cora/getRecordDataById.server';
import { updateRecordDataById } from '@/cora/updateRecordDataById.server';
import { createNotificationFromAxiosError } from '@/utils/createNotificationFromAxiosError';
import { i18nContext } from 'server/i18n';
import type { Route } from './+types/recordDelete';

export const action = async ({ params, context }: Route.ActionArgs) => {
  const { recordType, recordId } = params;
  const { t } = context.get(i18nContext);
  const { auth } = context.get(sessionContext);
  const { flashNotification } = context.get(sessionContext);

  const response = await getRecordDataById<RecordWrapper>(
    recordType,
    recordId,
    auth?.data.token,
  );
  const updatedRecordData = updateRecordToBeTrashed(response.data.record.data);

  try {
    await updateRecordDataById<RecordWrapper>(
      recordId,
      updatedRecordData,
      recordType,
      auth?.data.token,
    );
    flashNotification({
      severity: 'success',
      summary: t('divaClient_recordSuccessfullyTrashedText', { id: recordId }),
    });
  } catch (error) {
    console.error(error);
    flashNotification(createNotificationFromAxiosError(t, error));
  }
};

export const updateRecordToBeTrashed = (record: DataGroup): DataGroup => {
  const updatedRecord = structuredClone(record);
  const recordInfo = getFirstDataGroupWithNameInData(
    updatedRecord,
    'recordInfo',
  );
  if (hasChildWithNameInData(recordInfo, 'inTrashBin')) {
    const trashBin = getFirstDataAtomicWithNameInData(recordInfo, 'inTrashBin');
    if (trashBin) {
      trashBin.value = 'true';
    }
  } else {
    recordInfo.children.push({ name: 'inTrashBin', value: 'true' });
  }
  return updatedRecord;
};
