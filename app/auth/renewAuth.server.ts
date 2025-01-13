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

import {
  commitSession,
  getAuth,
  getSessionFromCookie,
} from '@/auth/sessions.server';
import { renewAuthToken } from '@/.server/cora/renewAuthToken';
import { data } from '@remix-run/node';
import { isAxiosError } from 'axios';
import type { Auth } from '@/auth/Auth';

export const renewAuth = async (request: Request) => {
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);

  if (!auth) {
    return { status: 'No auth to renew' };
  }

  try {
    if (isAuthExpired(auth)) {
      return removeAuthFromSession(request);
    }

    const renewedAuth = await renewAuthToken(auth);

    session.set('auth', renewedAuth);

    return data(
      { status: 'Session renewed' },
      {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      },
    );
  } catch (error) {
    if (isAxiosError(error) && error.status === 401) {
      return removeAuthFromSession(request);
    }
    return { status: 'Failed to renew session', error };
  }
};

const isAuthExpired = (auth: Auth) => {
  const validUntil = Number(auth.data.validUntil);
  const renewUntil = Number(auth.data.renewUntil);
  const now = Date.now();

  return validUntil < now || renewUntil < now;
};

const removeAuthFromSession = async (request: Request) => {
  const session = await getSessionFromCookie(request);
  session.flash('notification', {
    severity: 'error',
    summary: 'Your session has expired.',
    details: 'You have been logged out. Please log in again to continue.',
  });
  session.unset('auth');
  return data(null, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};
