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
import type { Route } from './+types/fileUpload';
import { createBinaryRecord } from '@/cora/createBinaryRecord';
import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';
import { transformRecord } from '@/cora/transform/transformRecord.server';

export const action = async ({ request, context }: Route.ActionArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);

  const { fileName, fileSize } = await request.json();

  const createBinaryRecordResponse = await createBinaryRecord(
    fileName,
    fileSize,
    auth?.data?.token,
  );

  const binaryRecord = transformRecord(
    await context.dependencies,
    createBinaryRecordResponse.data,
  );

  return Response.json({
    binaryRecord,
  });
};
