/*
 * Copyright 2024 Uppsala University Library
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

import { isRouteErrorResponse } from 'react-router';
import { useState } from 'react';
import { Alert, AlertTitle } from '@/components/Alert/Alert';

interface ErrorAlertProps {
  error: unknown;
}

export const ErrorAlert = ({ error }: ErrorAlertProps) => {
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  if (isRouteErrorResponse(error)) {
    return (
      <Alert severity='error'>
        <AlertTitle>
          {error.status} {error.statusText}
        </AlertTitle>
        {error.data && (
          <>
            <button onClick={() => setDetailsExpanded(!detailsExpanded)}>
              {detailsExpanded ? 'Hide details' : 'Show details'}
            </button>
            {detailsExpanded && <p>{error.data}</p>}
          </>
        )}
      </Alert>
    );
  } else if (error instanceof Error) {
    return (
      <Alert severity='error'>
        <AlertTitle>{error.message}</AlertTitle>
        {error.stack && (
          <>
            <button onClick={() => setDetailsExpanded(!detailsExpanded)}>
              {detailsExpanded ? 'Hide details' : 'Show details'}
            </button>
            {detailsExpanded && <pre>{error.stack}</pre>}
          </>
        )}
      </Alert>
    );
  } else {
    return (
      <Alert severity='error'>
        <AlertTitle>Unknown Error</AlertTitle>
      </Alert>
    );
  }
};
