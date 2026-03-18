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

import {
  coraApiUrl,
  createHeaders,
  RECORD_CONTENT_TYPE,
  RECORD_GROUP_CONTENT_TYPE,
} from '@/cora/helper.server';
import axios from 'axios';

export const createBinaryRecord = async (
  fileName: string,
  fileSize: string,
  hostRecordType: string,
  hostRecordId: string,
  authToken?: string,
) => {
  const payload = {
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
          { name: 'visibility', value: 'unpublished' },
          {
            name: 'hostRecord',
            children: [
              { name: 'linkedRecordType', value: hostRecordType },
              { name: 'linkedRecordId', value: hostRecordId },
            ],
          },
        ],
      },
      { name: 'originalFileName', value: fileName },
      { name: 'expectedFileSize', value: fileSize },
    ],
    attributes: { type: 'generic' },
  };

  const headers = createHeaders(
    { Accept: RECORD_CONTENT_TYPE, 'Content-Type': RECORD_GROUP_CONTENT_TYPE },
    authToken,
  );

  return await axios.post(coraApiUrl('/record/binary/'), payload, { headers });
};
