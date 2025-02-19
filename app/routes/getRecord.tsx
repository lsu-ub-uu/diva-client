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

import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import { invariant } from '@/utils/invariant';

import type { Route } from './+types/getRecord';

export const loader = async ({
  request,
  params,
  context,
}: Route.LoaderArgs) => {
  try {
    const session = await getSessionFromCookie(request);
    const auth = getAuth(session);

    const { recordType, recordId } = params;

    const url = new URL(request.url);

    const presentationRecordLinkId = url.searchParams.get(
      'presentationRecordLinkId',
    );
    invariant(
      presentationRecordLinkId,
      'Missing presentationRecordLinkId param',
    );

    const record = await getRecordByRecordTypeAndRecordId({
      dependencies: context.dependencies,
      recordType,
      recordId,
      authToken: auth?.data.token,
      presentationRecordLinkId,
    });

    return { record };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
};
