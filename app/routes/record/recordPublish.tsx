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
import type { RecordWrapper } from '@/cora/cora-data/types.server';
import { getRecordDataById } from '@/cora/getRecordDataById.server';
import { setRecordVisibility } from '@/data/setRecordVisibility';
import { createNotificationFromAxiosError } from '@/utils/createNotificationFromAxiosError';
import { dependenciesContext } from 'server/depencencies';
import { i18nContext } from 'server/i18n';
import type { Route } from './+types/recordDelete';

export const action = async ({ params, context }: Route.ActionArgs) => {
  const { recordType: recordTypeId, recordId } = params;
  const { t } = context.get(i18nContext);
  const { auth } = context.get(sessionContext);
  const { flashNotification } = context.get(sessionContext);
  const { dependencies } = context.get(dependenciesContext);
  const recordType = dependencies.recordTypePool.get(recordTypeId);

  try {
    const response = await getRecordDataById<RecordWrapper>(
      recordTypeId,
      recordId,
      auth?.data.token,
    );

    await setRecordVisibility({
      recordId,
      recordData: response.data.record.data,
      recordType: recordTypeId,
      visibility: 'published',
      auth,
    });

    flashNotification({
      severity: 'success',
      summary: t('divaClient_recordSuccessfullyPublishedText', {
        recordType: t(recordType.textId),
        id: recordId,
      }),
    });
  } catch (error) {
    console.error(error);
    flashNotification(createNotificationFromAxiosError(t, error));
  }
};
