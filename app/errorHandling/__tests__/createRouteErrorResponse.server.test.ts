import { HttpError } from '@/cora/httpClient.server';
import { describe, expect, it } from 'vitest';
import { createRouteErrorResponse } from '../createRouteErrorResponse.server';

describe('createRouteErrorResponse', () => {
  it('should return route data response for HttpError status below 500', () => {
    const httpError = new HttpError(401, 'Unauthorized');

    expect(createRouteErrorResponse(httpError)).toMatchObject({
      init: {
        status: 401,
        statusText: 'Request failed with status 401',
      },
    });
  });

  it('should return the original HttpError when HttpError has status 500', () => {
    const httpError = new HttpError(500, 'Internal Server Error');

    expect(createRouteErrorResponse(httpError)).toBe(httpError);
  });

  it('should return the original error when error is not an HTTP error', () => {
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

  it.each([400, 401, 403])(
    'should wrap HttpError for client status codes below 500 (status: %s)',
    (status) => {
      const httpError = new HttpError(status, '');

      expect(createRouteErrorResponse(httpError)).toMatchObject({
        init: {
          status,
          statusText: `Request failed with status ${status}`,
        },
      });
    },
  );

  it('should return original HttpError for server status 500', () => {
    const httpError = new HttpError(500, '');

    expect(createRouteErrorResponse(httpError)).toBe(httpError);
  });
});
