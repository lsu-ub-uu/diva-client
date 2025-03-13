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
import type { ActionLink } from '@/cora/cora-data/types.server';
import axios from 'axios';
import { transformRecord } from '@/cora/transform/transformRecord.server';
import { uploadBinary } from '@/cora/uploadBinary';

export const action = async ({ request, context }: Route.ActionArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);

  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || !(file instanceof File)) {
    throw new Error('No valid file upload');
  }

  const createBinaryRecordResponse = await createBinaryRecord(
    file,
    auth?.data?.token,
  );

  const binaryRecord = transformRecord(
    await context.dependencies,
    createBinaryRecordResponse.data,
  );

  await uploadBinary(binaryRecord, file, auth?.data?.token);

  return { binaryRecordId: binaryRecord.id };
};
//{
//   "requestMethod": "POST",
//   "rel": "upload",
//   "contentType": "multipart/form-data",
//   "url": "https://cora.epc.ub.uu.se/diva/rest/record/binary/binary:3118722940664362/master"
// }
