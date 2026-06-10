import { AxiosError } from 'axios';
import { describe, expect, it } from 'vitest';
import { createRouteErrorResponse } from '../createRouteErrorResponse.server';

describe('createRouteErrorResponse', () => {
  it('should throw data response when error is an AxiosError', () => {
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

    try {
      createRouteErrorResponse(axiosError);
      expect.fail('Expected createRouteErrorResponse to throw');
    } catch (error) {
      expect(error).toMatchObject({
        data: errorData,
        init: {
          status: 404,
          statusText: 'Request failed with status code 404',
        },
      });
    }
  });

  it('should throw the original AxiosError when AxiosError has no response', () => {
    const axiosError = new AxiosError('Network Error');

    expect(() => createRouteErrorResponse(axiosError)).toThrow(axiosError);
  });

  it('should throw the original AxiosError when AxiosError has status 500', () => {
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

    expect(() => createRouteErrorResponse(axiosError)).toThrow(axiosError);
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

      try {
        createRouteErrorResponse(axiosError);
        expect.fail('Expected createRouteErrorResponse to throw');
      } catch (error) {
        if (status < 500) {
          expect(error).toMatchObject({
            data: { error: statusText },
            init: {
              status,
              statusText: `Request failed with status code ${status}`,
            },
          });
        } else {
          expect(error).toBe(axiosError);
        }
      }
    },
  );
});
