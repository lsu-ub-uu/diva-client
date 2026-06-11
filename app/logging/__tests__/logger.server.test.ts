import { log, logError } from '@/logging/logger.server';
import { AxiosError, AxiosHeaders } from 'axios';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('logError', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('logs context message prefixed to error message when context is provided', () => {
    const logErrorSpy = vi
      .spyOn(log, 'error')
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

    expect(logErrorSpy).toHaveBeenCalledWith(
      { err: error },
      'Failed to save record: Request failed with status code 500',
    );
  });

  it('logs only the error message when no context is provided', () => {
    const logErrorSpy = vi
      .spyOn(log, 'error')
      .mockImplementation(() => undefined);

    const error = new AxiosError('Network Error', 'ERR_NETWORK', {
      headers: new AxiosHeaders(),
      method: 'get',
      url: '/records/123',
    });

    logError(error);

    expect(logErrorSpy).toHaveBeenCalledWith({ err: error }, 'Network Error');
  });
});
