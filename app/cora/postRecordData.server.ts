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

import type { DataGroup } from '@/cora/cora-data/types.server';
import {
  coraApiUrl,
  createHeaders,
  RECORD_CONTENT_TYPE,
  RECORD_GROUP_CONTENT_TYPE,
} from '@/cora/helper.server';

type FetchLikeResponse<T> = {
  data: T;
  status: number;
};

export async function postRecordData<T>(
  payload: DataGroup,
  type: string,
  authToken?: string,
): Promise<FetchLikeResponse<T>> {
  const apiUrl = coraApiUrl(`/record/${type}`);

  const rawHeaders = createHeaders(
    { Accept: RECORD_CONTENT_TYPE, 'Content-Type': RECORD_GROUP_CONTENT_TYPE },
    authToken,
  );
  const headers = Object.fromEntries(
    Object.entries(rawHeaders).filter(([, value]) => value !== undefined),
  ) as Record<string, string>;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  return {
    data: await response.json(),
    status: response.status,
  };
}
