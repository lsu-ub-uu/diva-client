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
import { createRecord } from '@/data/createRecord.server';
import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';

export const action = async ({ request, context }: Route.ActionArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);
  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || !(file instanceof File)) {
    return {};
  }

  const binaryRecord = await createRecord(
    await context.dependencies,
    'genericBinary',
    {
      binary: {
        recordInfo: {
          dataDivider: {
            value: 'divaData',
          },
          validationType: {
            value: 'genericBinary',
          },
        },
        adminInfo: {
          visibility: {
            value: 'unpublished',
          },
        },
        originalFileName: {
          value: file.name, //
        },
        expectedFileSize: [{ value: file.size }],
        _type: 'image',
      },
    },
    auth,
  );

  console.log({ binaryRecord, file });
  /*
  axios.post(coraApiUrl(`/record/binary/${binaryRecord.id}/master`), {
    headers: request.headers,
    body: fileUpload.
  });
  
 */

  return {};
  // mjackson parse stuff
  // Creaate binary wrapper record POST https://cora.epc.ub.uu.se/diva/rest/record/binary/
  // Upadate wrapper with binary from request multipart/formdata  /diva/rest/record/binary/binary:2940117626638210/master
  // return { binaryId: createdBinary.id, filename, previewImageUrl }
};

const a = {
  name: 'binary',
  children: [
    {
      name: 'recordInfo',
      children: [
        {
          name: 'dataDivider',
          children: [
            { name: 'linkedRecordType', value: 'system' },
            { name: 'linkedRecordId', value: 'divaData' },
          ],
        },
        {
          name: 'validationType',
          children: [
            { name: 'linkedRecordType', value: 'validationType' },
            { name: 'linkedRecordId', value: 'genericBinary' },
          ],
        },
      ],
    },
    {
      name: 'adminInfo',
      children: [{ name: 'visibility', value: 'unpublished' }],
    },
    { name: 'originalFileName', value: 'Untitled.webp' },
    { name: 'expectedFileSize', value: '12648' },
  ],
  attributes: { type: 'generic' },
};
