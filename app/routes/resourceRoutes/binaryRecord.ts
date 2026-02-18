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
import { sessionContext } from '@/auth/sessionMiddleware.server';
import { createBinaryRecord } from '@/cora/createBinaryRecord';
import { transformRecord } from '@/cora/transform/transformRecord.server';
import { dependenciesContext } from 'server/depencencies';
import type { Route } from './+types/binaryRecord';

export const action = async ({ request, context }: Route.ActionArgs) => {
  const { auth } = context.get(sessionContext);
  const { dependencies } = context.get(dependenciesContext);
  const { fileName, fileSize, hostRecordType, hostRecordId } = await request.json();

  const createBinaryRecordResponse = await createBinaryRecord(
    fileName,
    fileSize,
    hostRecordType,
    hostRecordId,
    auth?.data?.token,
  );

  const binaryRecord = transformRecord(
    dependencies,
    createBinaryRecordResponse.data,
    'view',
  );

  return Response.json({
    binaryRecord,
  });
};
