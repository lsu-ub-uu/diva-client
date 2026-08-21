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

import type { Auth } from '@/auth/Auth';
import { createHeaders } from '@/cora/helper.server';
import { transformCoraAuth } from '@/cora/transform/transformCoraAuth';

export const renewAuthToken = async (auth: Auth) => {
  const actionLink = auth.actionLinks.renew;
  const headers = createHeaders(
    {
      Accept: actionLink.accept,
      'Content-Type': actionLink.contentType,
    },
    auth.data.token,
  );
  const requestHeaders = Object.fromEntries(
    Object.entries(headers).filter(([, value]) => value !== undefined),
  ) as Record<string, string>;

  const response = await fetch(actionLink.url, {
    method: actionLink.requestMethod,
    headers: requestHeaders,
    body: actionLink.body ? JSON.stringify(actionLink.body) : undefined,
  });

  return transformCoraAuth(await response.json());
};
