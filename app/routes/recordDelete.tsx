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

import { data, redirect } from 'react-router';
import { deleteRecord } from '@/data/deleteRecord.server';
import {
  commitSession,
  getSessionFromCookie,
  requireAuth,
} from '@/auth/sessions.server';

import type { Route } from './+types/recordDelete';

export const action = async ({
  request,
  params,
  context,
}: Route.ActionArgs) => {
  const { recordType, recordId } = params;

  const session = await getSessionFromCookie(request);
  const auth = await requireAuth(session);

  await deleteRecord(await context.dependencies, recordType, recordId, auth);

  session.flash('notification', {
    severity: 'success',
    summary: 'Successfully deleted record',
  });

  return redirect(`/${recordType}`, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};
