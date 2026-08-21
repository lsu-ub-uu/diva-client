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
import { httpClient, type HttpResponse } from '@/cora/httpClient.server';
import {
  coraApiUrl,
  createHeaders,
  RECORD_CONTENT_TYPE,
  RECORD_GROUP_CONTENT_TYPE,
} from '@/cora/helper.server';

export const updateRecordDataById = async <T>(
  recordId: string,
  payload: DataGroup,
  type: string,
  authToken?: string,
): Promise<HttpResponse<T>> => {
  const apiUrl: string = coraApiUrl(`/record/${type}/${recordId}`);
  const headers = createHeaders(
    { Accept: RECORD_CONTENT_TYPE, 'Content-Type': RECORD_GROUP_CONTENT_TYPE },
    authToken,
  );
  const requestHeaders: Record<string, string> = Object.fromEntries(
    Object.entries(headers).filter(([, value]) => value !== undefined),
  ) as Record<string, string>;

  return httpClient.post<T>(apiUrl, payload, { headers: requestHeaders });
};
