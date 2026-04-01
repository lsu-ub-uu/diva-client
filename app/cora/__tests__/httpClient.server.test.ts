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

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { httpClient, HttpError, isHttpError } from '../httpClient.server';

const createMockResponse = (
  status: number,
  body: unknown,
  ok?: boolean,
): Response => {
  return {
    ok: ok ?? (status >= 200 && status < 300),
    status,
    headers: new Headers({ 'Content-Type': 'application/json' }),
    json: () => Promise.resolve(body),
  } as Response;
};

describe('httpClient', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('get', () => {
    it('returns parsed JSON data on success', async () => {
      const expected = { name: 'test' };
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(200, expected),
      );

      const result = await httpClient.get<{ name: string }>(
        'http://example.com/api',
      );

      expect(result.data).toEqual(expected);
      expect(result.status).toBe(200);
    });

    it('sends GET method', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(200, {}),
      );

      await httpClient.get('http://example.com/api');

      expect(fetch).toHaveBeenCalledWith('http://example.com/api', {
        method: 'GET',
      });
    });

    it('passes options to fetch', async () => {
      const headers = { Accept: 'application/json' };
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(200, {}),
      );

      await httpClient.get('http://example.com/api', { headers });

      expect(fetch).toHaveBeenCalledWith('http://example.com/api', {
        headers,
        method: 'GET',
      });
    });

    it('throws HttpError on non-2xx status', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(404, { error: 'Not found' }),
      );

      await expect(httpClient.get('http://example.com/api')).rejects.toThrow(
        HttpError,
      );
    });
  });

  describe('post', () => {
    it('returns parsed JSON data on success', async () => {
      const expected = { id: '123' };
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(201, expected),
      );

      const result = await httpClient.post<{ id: string }>(
        'http://example.com/api',
        { name: 'test' },
      );

      expect(result.data).toEqual(expected);
      expect(result.status).toBe(201);
    });

    it('sends POST method with JSON-stringified body', async () => {
      const body = { name: 'test' };
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(200, {}),
      );

      await httpClient.post('http://example.com/api', body);

      expect(fetch).toHaveBeenCalledWith('http://example.com/api', {
        method: 'POST',
        body: JSON.stringify(body),
      });
    });

    it('sends string body as-is without JSON.stringify', async () => {
      const body = 'user\npassword';
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(200, {}),
      );

      await httpClient.post('http://example.com/api', body);

      expect(fetch).toHaveBeenCalledWith('http://example.com/api', {
        method: 'POST',
        body: 'user\npassword',
      });
    });

    it('throws HttpError on 500 status', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(500, { error: 'Internal Server Error' }),
      );

      await expect(
        httpClient.post('http://example.com/api', {}),
      ).rejects.toThrow(HttpError);
    });
  });

  describe('delete', () => {
    it('returns parsed JSON data on success', async () => {
      const expected = { deleted: true };
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(200, expected),
      );

      const result = await httpClient.delete<{ deleted: boolean }>(
        'http://example.com/api/123',
      );

      expect(result.data).toEqual(expected);
      expect(result.status).toBe(200);
    });

    it('sends DELETE method', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(200, {}),
      );

      await httpClient.delete('http://example.com/api/123');

      expect(fetch).toHaveBeenCalledWith('http://example.com/api/123', {
        method: 'DELETE',
      });
    });

    it('throws HttpError on 403 status', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(403, { error: 'Forbidden' }),
      );

      await expect(
        httpClient.delete('http://example.com/api/123'),
      ).rejects.toThrow(HttpError);
    });
  });

  describe('HttpError', () => {
    it('contains status and response', () => {
      const response = createMockResponse(404, {});
      const error = new HttpError(response);

      expect(error.status).toBe(404);
      expect(error.response).toBe(response);
      expect(error.message).toBe('Request failed with status 404');
      expect(error.name).toBe('HttpError');
    });

    it('is an instance of Error', () => {
      const error = new HttpError(createMockResponse(500, {}));

      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('isHttpError', () => {
    it('returns true for HttpError instances', () => {
      const error = new HttpError(createMockResponse(404, {}));

      expect(isHttpError(error)).toBe(true);
    });

    it('returns false for regular errors', () => {
      expect(isHttpError(new Error('something'))).toBe(false);
    });

    it('returns false for non-error values', () => {
      expect(isHttpError('string')).toBe(false);
      expect(isHttpError(null)).toBe(false);
      expect(isHttpError(undefined)).toBe(false);
    });
  });
});
