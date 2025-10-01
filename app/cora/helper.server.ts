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

import type { Auth } from '@/auth/Auth';
import type { ActionLink } from '@/cora/cora-data/types.server';
import { type AxiosRequestConfig } from 'axios';

export const RECORD_LIST_CONTENT_TYPE = 'application/vnd.cora.recordList+json';
export const RECORD_CONTENT_TYPE = 'application/vnd.cora.record+json';
export const RECORD_CONTENT_TYPE_DECORATED =
  'application/vnd.cora.record-decorated+json';

export const RECORD_GROUP_CONTENT_TYPE =
  'application/vnd.cora.recordGroup+json';
export const LOGIN_CONTENT_TYPE = 'application/vnd.cora.login';
export const AUTHENTICATION_CONTENT_TYPE =
  'application/vnd.cora.authentication+json';
export const createHeaders = (
  init: Record<string, string | undefined>,
  authToken?: string,
): Record<string, string | undefined> => {
  const headers = init;

  if (authToken) {
    headers.Authtoken = authToken;
  }

  return headers;
};

export const externalCoraApiUrl = (path: string) => {
  return `${process.env.CORA_EXTERNAL_SYSTEM_URL}/rest${path}`;
};

export const coraApiUrl = (path: string) => {
  return `${process.env.CORA_API_URL}${path}`;
};

export const coraBinaryUrl = ({
  id,
  name,
  auth,
}: {
  id: string;
  name: string;
  auth: Auth | undefined;
}) => {
  let url = `${process.env.CORA_API_URL}/record/binary/${id}/${name}`;
  if (auth?.data.token) {
    url = `${url}?authToken=${auth.data.token}`;
  }
  return url;
};

export const coraLoginUrl = (path: string) => {
  return `${process.env.CORA_LOGIN_URL}${path}`;
};

export const getAxiosRequestFromActionLink = (
  actionLink: ActionLink,
  authToken: string | undefined,
): AxiosRequestConfig<any> => {
  return {
    method: actionLink.requestMethod,
    url: actionLink.url,
    data: actionLink.body,
    headers: createHeaders(
      {
        Accept: actionLink.accept,
        'Content-Type': actionLink.contentType,
      },
      authToken,
    ),
  };
};
