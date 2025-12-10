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
import type { DataGroup, RecordWrapper } from '@/cora/cora-data/types.server';
import { getRecordDataById } from '@/cora/getRecordDataById.server';
import { updateRecordDataById } from '@/cora/updateRecordDataById.server';
import { createNotificationFromAxiosError } from '@/utils/createNotificationFromAxiosError';
import type { Route } from './+types/recordDelete';

export const action = async ({ params, context }: Route.ActionArgs) => {
  const { recordType, recordId } = params;

  const { auth } = context.get(sessionContext);
  const { flashNotification } = context.get(sessionContext);

  const response = await getRecordDataById<RecordWrapper>(
    recordType,
    recordId,
    auth?.data.token,
  );
  const recordWrapper = response.data;
  const newWrapper = updateVariableBeforeUpdating(recordWrapper);
  const newDataGroup = newWrapper.record.data as DataGroup;

  flashNotification({
    severity: 'success',
    summary: 'Successfully trashed record',
  });

  try {
    await updateRecordDataById<RecordWrapper>(
      recordId,
      newDataGroup,
      recordType,
      auth?.data.token,
    );
    flashNotification({
      severity: 'success',
      summary: `Record was successfully updated`,
    });
  } catch (error) {
    console.error(error);
    flashNotification(createNotificationFromAxiosError(t, error));
  }
};

const updateVariableBeforeUpdating = (obj: RecordWrapper): RecordWrapper => {
  function recursiveUpdate(o: unknown): unknown {
    if (Array.isArray(o)) {
      return o.map(recursiveUpdate);
    } else if (o && typeof o === 'object') {
      if (
        (o as any).name === 'visibility' &&
        (o as any).value === 'published'
      ) {
        return { ...(o as any), value: 'unpublished' };
      }
      const newObj: any = {};
      for (const key in o) {
        newObj[key] = recursiveUpdate((o as any)[key]);
      }
      return newObj;
    }
    return o;
  }
  return recursiveUpdate(obj) as RecordWrapper;
};
