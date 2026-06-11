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

    expect(createRouteErrorResponse(axiosError)).toMatchObject({
      data: errorData,
      init: {
        status: 404,
        statusText: 'Request failed with status code 404',
      },
    });
  });

  it('should return the original AxiosError when AxiosError has no response', () => {
    const axiosError = new AxiosError('Network Error');

    expect(createRouteErrorResponse(axiosError)).toBe(axiosError);
  });

  it('should return the original AxiosError when AxiosError has status 500', () => {
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

    expect(createRouteErrorResponse(axiosError)).toBe(axiosError);
  });

  it('should return the original error when error is not an AxiosError', () => {
    const genericError = new Error('Something went wrong');

    expect(createRouteErrorResponse(genericError)).toBe(genericError);
  });

  it('should return the original error when error is a string', () => {
    const stringError = 'String error message';

    expect(createRouteErrorResponse(stringError)).toBe(stringError);
  });

  it('should return the original error when error is null', () => {
    const nullError = null;

    expect(createRouteErrorResponse(nullError)).toBe(nullError);
  });

  it('should return the original error when error is undefined', () => {
    const undefinedError = undefined;

    expect(createRouteErrorResponse(undefinedError)).toBe(undefinedError);
  });

  it.each([
    { status: 400, statusText: 'Bad Request' },
    { status: 401, statusText: 'Unauthorized' },
    { status: 403, statusText: 'Forbidden' },
    { status: 500, statusText: 'Internal Server Error' },
  ])(
    'should wrap AxiosError only for status codes below 500 (status: $status)',
    ({ status, statusText }) => {
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
      if (status < 500) {
        expect(result).toMatchObject({
          data: { error: statusText },
          init: {
            status,
            statusText: `Request failed with status code ${status}`,
          },
        });
      } else {
        expect(result).toBe(axiosError);
      }
    },
  );
});
