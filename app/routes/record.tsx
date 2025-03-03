/*
 * Copyright 2025 Uppsala University Library
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

import { Outlet } from 'react-router';
import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import type { Route } from './+types/record';
import { getRecordTitle } from '@/utils/getRecordTitle';

export const loader = async ({
  request,
  params,
  context,
}: Route.LoaderArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);

  const { recordType, recordId } = params;

  const record = await getRecordByRecordTypeAndRecordId({
    dependencies: await context.dependencies,
    recordType,
    recordId,
    authToken: auth?.data.token,
  });

  const breadcrumb = getRecordTitle(record) ?? record.id;
  const pageTitle = getRecordTitle(record);

  return { record, breadcrumb, pageTitle };
};

export const meta = ({ data }: Route.MetaArgs) => {
  return [{ title: data.pageTitle }];
};

export default function RecordTypeRoute({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>{loaderData.pageTitle}</h1>
      <Outlet />
    </div>
  );
}
