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
  contentType = 'application/json',
): Response => {
  return {
    ok: ok ?? (status >= 200 && status < 300),
    status,
    headers: new Headers({ 'Content-Type': contentType }),
    json: () => Promise.resolve(body),
    text: () => Promise.resolve(JSON.stringify(body)),
  } as Response;
};

const createTextMockResponse = (
  status: number,
  body: string,
  contentType: string,
): Response => {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers({ 'Content-Type': contentType }),
    text: () => Promise.resolve(body),
  } as Response;
};

const createEmptyMockResponse = (status: number): Response => {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers(),
    text: () => Promise.resolve(''),
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

    it('returns undefined data for empty success response', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createEmptyMockResponse(200),
      );

      const result = await httpClient.get<void>('http://example.com/api');

      expect(result.data).toBeUndefined();
      expect(result.status).toBe(200);
    });

    it('returns plain text data on success', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createTextMockResponse(200, 'plain response', 'text/plain'),
      );

      const result = await httpClient.get<string>('http://example.com/api');

      expect(result.data).toBe('plain response');
      expect(result.status).toBe(200);
    });

    it('returns xml text data on success', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createTextMockResponse(
          200,
          '<response>ok</response>',
          'application/xml',
        ),
      );

      const result = await httpClient.get<string>('http://example.com/api');

      expect(result.data).toBe('<response>ok</response>');
      expect(result.status).toBe(200);
    });

    it('parses vendor json content types on success', async () => {
      const expected = { id: 'record:1' };
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(
          200,
          expected,
          undefined,
          'application/vnd.cora.record+json',
        ),
      );

      const result = await httpClient.get<{ id: string }>(
        'http://example.com/api',
      );

      expect(result.data).toEqual(expected);
      expect(result.status).toBe(200);
    });

    it('includes response headers in the result', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(200, {}),
      );

      const result = await httpClient.get('http://example.com/api');

      expect(result.headers).toBeDefined();
      expect(result.headers).toBeInstanceOf(Headers);
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

    it('returns undefined data for 204 response', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createEmptyMockResponse(204),
      );

      const result = await httpClient.delete<void>(
        'http://example.com/api/123',
      );

      expect(result.data).toBeUndefined();
      expect(result.status).toBe(204);
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

  describe('raw', () => {
    it('returns the raw Response object', async () => {
      const mockResponse = createMockResponse(200, { some: 'data' });
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse);

      const result = await httpClient.raw('http://example.com/binary');

      expect(result).toBe(mockResponse);
    });

    it('passes url and options to fetch', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(200, {}),
      );
      const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: 'binary data',
      };

      await httpClient.raw('http://example.com/binary', options);

      expect(fetch).toHaveBeenCalledWith('http://example.com/binary', options);
    });

    it('returns non-2xx responses without throwing', async () => {
      const mockResponse = createMockResponse(404, {});
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse);

      const result = await httpClient.raw('http://example.com/binary');

      expect(result.ok).toBe(false);
      expect(result.status).toBe(404);
    });

    it('propagates fetch errors', async () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValue(
        new Error('network failure'),
      );

      await expect(httpClient.raw('http://example.com/binary')).rejects.toThrow(
        'network failure',
      );
    });
  });

  describe('action', () => {
    const mockActionLink = {
      rel: 'create',
      url: 'http://example.com/api/records',
      requestMethod: 'POST' as const,
      accept: 'application/vnd.uub.record+json',
      contentType: 'application/vnd.uub.record+json',
    };

    it('returns parsed JSON data on success', async () => {
      const expected = { id: 'new-id' };
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(201, expected),
      );

      const result = await httpClient.action<{ id: string }>(mockActionLink, {
        name: 'test',
      });

      expect(result.data).toEqual(expected);
      expect(result.status).toBe(201);
    });

    it('uses the request method from action link', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(200, {}),
      );

      await httpClient.action(
        { ...mockActionLink, requestMethod: 'DELETE' },
        undefined,
      );

      expect(fetch).toHaveBeenCalledWith('http://example.com/api/records', {
        method: 'DELETE',
        headers: {
          Accept: mockActionLink.accept,
          'Content-Type': mockActionLink.contentType,
        },
      });
    });

    it('sends JSON-stringified body with action link headers', async () => {
      const body = { name: 'test' };
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(201, {}),
      );

      await httpClient.action(mockActionLink, body);

      expect(fetch).toHaveBeenCalledWith('http://example.com/api/records', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Accept: mockActionLink.accept,
          'Content-Type': mockActionLink.contentType,
        },
      });
    });

    it('sends string body as-is without JSON.stringify', async () => {
      const body = 'raw data';
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(200, {}),
      );

      await httpClient.action(mockActionLink, body);

      expect(fetch).toHaveBeenCalledWith('http://example.com/api/records', {
        method: 'POST',
        body: 'raw data',
        headers: {
          Accept: mockActionLink.accept,
          'Content-Type': mockActionLink.contentType,
        },
      });
    });

    it('merges options headers with action link headers', async () => {
      const customHeaders = { 'X-Custom': 'value' };
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(200, {}),
      );

      await httpClient.action(mockActionLink, undefined, {
        headers: customHeaders,
      });

      expect(fetch).toHaveBeenCalledWith('http://example.com/api/records', {
        method: 'POST',
        headers: {
          Accept: mockActionLink.accept,
          'Content-Type': mockActionLink.contentType,
          'X-Custom': 'value',
        },
      });
    });

    it('throws HttpError on non-2xx status', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        createMockResponse(400, { error: 'Bad Request' }),
      );

      await expect(httpClient.action(mockActionLink, {})).rejects.toThrow(
        HttpError,
      );
    });
  });

  describe('HttpError', () => {
    it('contains status and body', () => {
      const error = new HttpError(404, 'Not found');

      expect(error.status).toBe(404);
      expect(error.body).toBe('Not found');
      expect(error.message).toBe('Request failed with status 404');
      expect(error.name).toBe('HttpError');
    });

    it('is an instance of Error', () => {
      const error = new HttpError(500, '');

      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('isHttpError', () => {
    it('returns true for HttpError instances', () => {
      const error = new HttpError(404, '');

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
