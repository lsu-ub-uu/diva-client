import { log, logError } from '@/logging/logger.server';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('logError', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('logs context message prefixed to error message when context is provided', () => {
    const logErrorSpy = vi
      .spyOn(log, 'error')
      .mockImplementation(() => undefined);

    const error = new Error('Request failed with status code 500');

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

    const error = new Error('Network Error');

    logError(error);

    expect(logErrorSpy).toHaveBeenCalledWith({ err: error }, 'Network Error');
  });
});
