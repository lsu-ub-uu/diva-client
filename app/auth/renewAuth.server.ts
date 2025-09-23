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

import type { Auth } from '@/auth/Auth';
import { renewAuthToken } from '@/cora/renewAuthToken.server';
import type { i18n as i18nType } from 'i18next';
import { data } from 'react-router';
import { type SessionContext } from './sessionMiddleware.server';

export const renewAuth = async (i18n: i18nType, session: SessionContext) => {
  const { auth, setAuth, flashNotification, removeAuth } = session;

  if (!auth) {
    return { status: 'No auth to renew' };
  }

  try {
    if (isAuthExpired(auth)) {
      const { t } = i18n;
      flashNotification({
        severity: 'info',
        summary: t('divaClient_sessionExpiredSummaryText'),
        details: t('divaClient_sessionExpiredDetailsText'),
      });
      removeAuth();
    }

    const renewedAuth = await renewAuthToken(auth);

    setAuth(renewedAuth);

    return data({ status: 'Session renewed' });
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
