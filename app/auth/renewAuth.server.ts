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
import { renewAuthToken } from '@/cora/renewAuthToken.server';
import type { Auth } from '@/auth/Auth';
import type { i18n as i18nType } from 'i18next';
import { data } from 'react-router';

export const renewAuth = async (request: Request, i18n: i18nType) => {
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);

  if (!auth) {
    return { status: 'No auth to renew' };
  }

  try {
    if (isAuthExpired(auth)) {
      return removeAuthFromSession(request, i18n);
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
    return { status: 'Failed to renew session', error };
  }
};

const isAuthExpired = (auth: Auth) => {
  const validUntil = Number(auth.data.validUntil);
  const renewUntil = Number(auth.data.renewUntil);
  const now = Date.now();
  return validUntil < now || renewUntil < now;
};

const removeAuthFromSession = async (request: Request, i18n: i18nType) => {
  const session = await getSessionFromCookie(request);
  const { t } = i18n;
  session.flash('notification', {
    severity: 'info',
    summary: t('divaClient_sessionExpiredSummaryText'),
    details: t('divaClient_sessionExpiredDetailsText'),
  });
  session.unset('auth');
  return data(null, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};
