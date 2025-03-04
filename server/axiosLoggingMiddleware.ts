import type { NextFunction, Request, Response } from 'express';
import axios, { type AxiosResponse } from 'axios';

export const axiosLoggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Request interceptor
  axios.interceptors.request.use((config) => {
    const { method, url, headers, data } = config;
    console.info(`Outgoing ${method?.toUpperCase()} request to ${url}`);
    console.info('Request Headers:', headers);
    if (data) {
      console.info('Request Body:', data);
    }
    return config;
  });

  // Response interceptor
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      const { status, statusText, config, data } = response;
      console.info(`Response from ${config.url}: ${status} ${statusText}`);
      console.info('Response Data:', data);
      return response;
    },
    (error) => {
      if (error.response) {
        const { status, statusText, config, data } = error.response;
        console.info(
          `Error Response from ${config.url}: ${status} ${statusText}`,
        );
        console.info('Error Data:', data);
      } else {
        console.info('Error:', error.message);
      }
      return Promise.reject(error);
    },
  );

  next();
};
