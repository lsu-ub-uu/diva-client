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

import { type LoaderFunctionArgs } from '@remix-run/node';
import { invariant } from '@remix-run/router/history';
import { getSessionFromCookie, requireAuth } from '@/auth/sessions.server';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';

export const loader = async ({
  request,
  params,
  context,
}: LoaderFunctionArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = await requireAuth(session);

  const { recordType, recordId } = params;
  invariant(recordType, 'Missing recordType param');
  invariant(recordId, 'Missing recordId param');

  const url = new URL(request.url);

  const presentationRecordLinkId = url.searchParams.get(
    'presentationRecordLinkId',
  );
  invariant(presentationRecordLinkId, 'Missing presentationRecordLinkId param');

  const record = await getRecordByRecordTypeAndRecordId({
    dependencies: context.dependencies,
    recordType,
    recordId,
    authToken: auth.data.token,
    presentationRecordLinkId,
  });

  return Response.json(record);
};
