import { AxiosError } from 'axios';
import { describe, expect, it } from 'vitest';
import { createRouteErrorResponse } from '../createRouteErrorResponse.server';

describe('createRouteErrorResponse', () => {
  it('should return data response when error is an AxiosError', () => {
    const errorData = {
      message: 'Not found',
      code: 'RESOURCE_NOT_FOUND',
    };
    const axiosError = new AxiosError(
      'Request failed with status code 404',
      '404',
      undefined,
      undefined,
      {
        status: 404,
        statusText: 'Not Found',
        data: errorData,
        headers: {},
        config: {} as any,
      },
    );

    const result = createRouteErrorResponse(axiosError);

    expect(result?.init?.status).toBe(404);
  });

  it('should return data response with 500 data when AxiosError has no response', () => {
    const axiosError = new AxiosError('Network Error');

    const result = createRouteErrorResponse(axiosError);

    expect(result?.init?.status).toBe(500);
  });

  it('should return data response when AxiosError has response but no data', () => {
    const axiosError = new AxiosError(
      'Request failed with status code 500',
      '500',
      undefined,
      undefined,
      {
        status: 500,
        statusText: 'Internal Server Error',
        data: undefined,
        headers: {},
        config: {} as any,
      },
    );

    const result = createRouteErrorResponse(axiosError);

    expect(result?.init?.status).toBe(500);
  });

  it('should throw error when error is not an AxiosError', () => {
    const genericError = new Error('Something went wrong');

    expect(() => createRouteErrorResponse(genericError)).toThrow(
      'Something went wrong',
    );
  });

  it('should throw error when error is a string', () => {
    const stringError = 'String error message';

    expect(() => createRouteErrorResponse(stringError)).toThrow(stringError);
  });

  it('should throw error when error is null', () => {
    const nullError = null;

    expect(() => createRouteErrorResponse(nullError)).toThrow();
  });

  it('should throw error when error is undefined', () => {
    const undefinedError = undefined;

    expect(() => createRouteErrorResponse(undefinedError)).toThrow();
  });

  it('should handle AxiosError with different status codes', () => {
    const testCases = [
      { status: 400, statusText: 'Bad Request' },
      { status: 401, statusText: 'Unauthorized' },
      { status: 403, statusText: 'Forbidden' },
      { status: 500, statusText: 'Internal Server Error' },
    ];

    testCases.forEach(({ status, statusText }) => {
      const axiosError = new AxiosError(
        `Request failed with status code ${status}`,
        status.toString(),
        undefined,
        undefined,
        {
          status,
          statusText,
          data: { error: statusText },
          headers: {},
          config: {} as any,
        },
      );

      const result = createRouteErrorResponse(axiosError);

      expect(result?.init?.status).toBe(status);
    });
  });
});
