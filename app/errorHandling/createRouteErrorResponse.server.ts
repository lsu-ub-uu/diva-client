import { AxiosError } from 'axios';
import { data } from 'react-router';
import { NotFoundError } from './NotFoundError';

export const createRouteErrorResponse = (error: unknown) => {
  if (error instanceof NotFoundError) {
    return data(error.message, { status: 404, statusText: 'Not Found' });
  }

  if (error instanceof AxiosError) {
    if (error.status && error.status < 500) {
      return data(error?.response?.data, {
        status: error.status,
        statusText: error.message,
      });
    }
  }

  return error;
};
