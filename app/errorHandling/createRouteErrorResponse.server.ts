import { AxiosError } from 'axios';
import { data } from 'react-router';

export const createRouteErrorResponse = (error: unknown) => {
  if (error instanceof AxiosError) {
    return data(error?.response?.data, { status: error.status || 500 });
  }
  throw error;
};
