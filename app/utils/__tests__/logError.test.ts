import { AxiosError, AxiosHeaders } from 'axios';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { logError } from '../logError';

describe('logError', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('logs axios request details with method, url and status information', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    const error = new AxiosError(
      'Request failed with status code 500',
      'ERR_BAD_RESPONSE',
      {
        baseURL: 'https://api.example.test/',
        headers: new AxiosHeaders(),
        method: 'post',
        url: '/records',
      },
      undefined,
      {
        data: { reason: 'boom' },
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
        config: {
          headers: new AxiosHeaders(),
        },
      },
    );

    logError(error, 'Failed to save record');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to save record | POST https://api.example.test/records | HTTP 500 Internal Server Error | ERR_BAD_RESPONSE | Request failed with status code 500 | response={"reason":"boom"}',
    );
  });

  it('falls back to available axios details when response metadata is missing', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    const error = new AxiosError('Network Error', 'ERR_NETWORK', {
      headers: new AxiosHeaders(),
      method: 'get',
      url: '/records/123',
    });

    logError(error);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'GET /records/123 | ERR_NETWORK | Network Error',
    );
  });
});
