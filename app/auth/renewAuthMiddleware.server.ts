import { renewAuthToken } from '@/cora/renewAuthToken.server';
import type { i18n } from 'i18next';
import type { MiddlewareFunction } from 'react-router';
import { i18nContext } from 'server/i18n';
import type { Auth } from './Auth';
import {
  sessionContext,
  type SessionContext,
} from './sessionMiddleware.server';

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
  console.debug(new Date().toISOString(), '** Running renewAuthMiddleware', {
    token: auth?.data.token,
    validUntil:
      auth?.data.validUntil &&
      new Date(Number(auth?.data.validUntil)).toISOString(),
  });
  const { t } = i18n;

  if (!auth) {
    console.debug(
      new Date().toISOString(),
      '** No auth found, skipping renew check',
    );
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

  const expired = validUntil < now || renewUntil < now;
  if (expired) {
    console.debug(
      new Date(now).toISOString(),
      '** Auth expired. Removing auth',
      {
        validUntil: validUntil && new Date(validUntil).toISOString(),
        renewUntil: renewUntil && new Date(renewUntil).toISOString(),
      },
    );
  }
  return expired;
};

export const isAuthAboutToExpire = (auth: Auth) => {
  const validUntil = Number(auth.data.validUntil);
  const timeUntilInvalid = validUntil - new Date().getTime();

  const aboutToExpire = timeUntilInvalid < RENEW_TIME_BUFFER;

  if (aboutToExpire) {
    console.debug(
      new Date().toISOString(),
      '** Auth about to expire. Renewing',
      {
        validUntil: validUntil && new Date(validUntil).toISOString(),
        timeUntilInvalid: `${timeUntilInvalid / 1000}s`,
        RENEW_TIME_BUFFER: `${RENEW_TIME_BUFFER / 1000}s`,
      },
    );
  }
  return aboutToExpire;
};
