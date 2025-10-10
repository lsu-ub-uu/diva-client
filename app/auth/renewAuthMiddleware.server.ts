import type { MiddlewareFunction } from 'react-router';
import {
  sessionContext,
  type SessionContext,
} from './sessionMiddleware.server';
import type { Auth } from './Auth';
import { i18nContext } from 'server/i18n';
import { renewAuthToken } from '@/cora/renewAuthToken.server';
import type { i18n } from 'i18next';

/**
 * How long before token expiry to refresh the token
 */
const RENEW_TIME_BUFFER = 60_000 * 5;

/**
 * Runs on every request, checks if the auth token is about to expire,
 * and renews it if necessary.
 */
export const renewAuthMiddleware: MiddlewareFunction<Response> = async ({
  context,
}) => {
  await handleRenew(context.get(sessionContext), context.get(i18nContext));
};

export const handleRenew = async (
  sessionContext: SessionContext,
  i18n: i18n,
) => {
  const { auth, setAuth, removeAuth, flashNotification } = sessionContext;
  const { t } = i18n;
  if (!auth) {
    return;
  }

  /** If an expired token is detected, remove it and notify the user */
  if (isAuthExpired(auth)) {
    flashNotification({
      severity: 'info',
      summary: t('divaClient_sessionExpiredSummaryText'),
      details: t('divaClient_sessionExpiredDetailsText'),
    });
    removeAuth();
  }

  if (isAuthAboutToExpire(auth)) {
    try {
      const renewedAuth = await renewAuthToken(auth);

      setAuth(renewedAuth);
    } catch (error) {
      console.error('Failed to renew auth token', error);
    }
  }
};

export const isAuthExpired = (auth: Auth) => {
  const validUntil = Number(auth.data.validUntil);
  const renewUntil = Number(auth.data.renewUntil);
  const now = Date.now();
  return validUntil < now || renewUntil < now;
};

export const isAuthAboutToExpire = (auth: Auth) => {
  const validUntil = Number(auth.data.validUntil);
  const timeUntilInvalid = validUntil - new Date().getTime();
  return timeUntilInvalid < RENEW_TIME_BUFFER;
};
