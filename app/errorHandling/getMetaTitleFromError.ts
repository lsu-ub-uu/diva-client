/*
 * Copyright 2025 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import { AxiosError } from 'axios';
import { isRouteErrorResponse } from 'react-router';

export const getMetaTitleFromError = (error: unknown) => {
  if (isRouteErrorResponse(error) || error instanceof AxiosError) {
    return getTitleFromHTTPStatus(error.status);
  }

  // console.log({ error });
  return 'Internal Server Error';
};

const getTitleFromHTTPStatus = (status?: number) => {
  switch (status) {
    case 401:
      return 'Unauthorized';
    case 403:
      return 'Forbidden';
    case 404:
      return 'Not Found';
    case 409:
      return 'Conflict';
    case 500:
    default: {
      console.log(status);
      return 'Internal Server Error';
    }
  }
};
