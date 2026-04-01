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

import { action } from '@/root';
import type { ActionLink } from './cora-data/types.server';

export interface HttpResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

export class HttpError extends Error {
  status: number;
  response: Response;

  constructor(response: Response) {
    super(`Request failed with status ${response.status}`);
    this.name = 'HttpError';
    this.status = response.status;
    this.response = response;
  }
}

export const isHttpError = (error: unknown): error is HttpError => {
  return error instanceof HttpError;
};

const request = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<HttpResponse<T>> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new HttpError(response);
  }
  const data: T = await response.json();

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
        Accept: actionLink.accept,
        'Content-Type': actionLink.contentType,
        ...options.headers,
      },
    });
  },
};
