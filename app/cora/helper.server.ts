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

export const RECORD_LIST_CONTENT_TYPE = 'application/vnd.uub.recordList+json';
export const RECORD_CONTENT_TYPE = 'application/vnd.uub.record+json';

export const createHeaders = (
  init: Record<string, string>,
  authToken?: string,
): Record<string, string> => {
  const headers = init;

  if (authToken) {
    headers.Authtoken = authToken;
  }

  return headers;
};

export const coraApiUrl = (path: string) => {
  return `${process.env.CORA_API_URL}${path}`;
};

export const coraLoginUrl = (path: string) => {
  return `${process.env.CORA_LOGIN_URL}${path}`;
};
