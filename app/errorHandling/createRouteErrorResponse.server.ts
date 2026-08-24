import { isHttpError } from '@/cora/httpClient.server';
import { data } from 'react-router';
import { NotFoundError } from './NotFoundError';

export const createRouteErrorResponse = (error: unknown) => {
  if (error instanceof NotFoundError) {
    return data(error.message, { status: 404, statusText: 'Not Found' });
  }

  if (isHttpError(error) && error.status < 500) {
    return data(undefined, {
      status: error.status,
      statusText: error.message,
    });
  }

  return error;
};
