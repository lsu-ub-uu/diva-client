/*
 * Copyright 2026 Uppsala University Library
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

import type { ActionLink } from './cora-data/types.server';

export interface HttpResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

export class HttpError extends Error {
  status: number;
  body: string;

  constructor(status: number, body: string) {
    super(`Request failed with status ${status}`);
    this.name = 'HttpError';
    this.status = status;
    this.body = body;
  }
}

export const isHttpError = (error: unknown): error is HttpError => {
  return error instanceof HttpError;
};

const isJsonContentType = (contentType: string | null): boolean => {
  return contentType?.includes('json') ?? false;
};

const request = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<HttpResponse<T>> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const body = await response.text();
    throw new HttpError(response.status, body);
  }
  const body = await response.text();
  const data: T =
    body === ''
      ? (undefined as T)
      : isJsonContentType(response.headers.get('Content-Type'))
        ? JSON.parse(body)
        : (body as T);

  return {
    data,
    status: response.status,
    headers: response.headers,
  };
};

export const httpClient = {
  get: <T>(
    url: string,
    options: RequestInit = {},
  ): Promise<HttpResponse<T>> => {
    return request<T>(url, { ...options, method: 'GET' });
  },

  post: <T>(
    url: string,
    body?: unknown,
    options: RequestInit = {},
  ): Promise<HttpResponse<T>> => {
    return request<T>(url, {
      ...options,
      method: 'POST',
      body: typeof body === 'string' ? body : JSON.stringify(body),
    });
  },

  delete: <T>(
    url: string,
    options: RequestInit = {},
  ): Promise<HttpResponse<T>> => {
    return request<T>(url, { ...options, method: 'DELETE' });
  },

  action: <T>(
    actionLink: ActionLink,
    body?: unknown,
    options: RequestInit = {},
  ): Promise<HttpResponse<T>> => {
    return request<T>(actionLink.url, {
      ...options,
      method: actionLink.requestMethod,
      body: typeof body === 'string' ? body : JSON.stringify(body),
      headers: {
        ...(actionLink.accept && { Accept: actionLink.accept }),
        ...(actionLink.contentType && {
          'Content-Type': actionLink.contentType,
        }),
        ...options.headers,
      },
    });
  },

  raw: async (url: string, options: RequestInit = {}): Promise<Response> => {
    const response = await fetch(url, options);
    return response;
  },
};
