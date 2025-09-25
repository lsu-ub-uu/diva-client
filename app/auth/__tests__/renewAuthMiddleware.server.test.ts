import type { i18n } from 'i18next';
import { describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { handleRenew } from '../renewAuthMiddleware.server';
import { type SessionContext } from '../sessionMiddleware.server';
import { renewAuthToken } from '@/cora/renewAuthToken.server';
import type { Auth } from '../Auth';

vi.mock('@/cora/renewAuthToken.server');

describe('renewAuthMiddleware', () => {
  it('removes auth token if expired', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-01T00:00:00Z'));

    const mockSessionContext = mock<SessionContext>({
      auth: {
        data: {
          validUntil: new Date('2024-12-31T23:59:59Z').getTime().toString(),
        },
      },
    });

    const mockI18n = {
      t: (translationKey) => translationKey,
    } as i18n;

    handleRenew(mockSessionContext, mockI18n);

    expect(mockSessionContext.removeAuth).toHaveBeenCalled();
    expect(mockSessionContext.setAuth).not.toHaveBeenCalled();
    expect(mockSessionContext.flashNotification).toHaveBeenCalledWith({
      severity: 'info',
      summary: 'divaClient_sessionExpiredSummaryText',
      details: 'divaClient_sessionExpiredDetailsText',
    });
  });

  it('renews auth token if about to expire', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-01T00:00:00Z'));

    const mockSessionContext: SessionContext = {
      auth: {
        data: {
          validUntil: new Date('2025-01-01T00:00:59Z').getTime().toString(),
        },
      } as Auth,
      setAuth: vi.fn(),
      removeAuth: vi.fn(),
      flashNotification: vi.fn(),
      notification: undefined,
      destroySession: vi.fn(),
    };

    const mockI18n = {
      t: (translationKey) => translationKey,
    } as i18n;

    handleRenew(mockSessionContext, mockI18n);
    const mockNewAuth = mock<Auth>();
    vi.mocked(renewAuthToken).mockReturnValue(Promise.resolve(mockNewAuth));
    expect(mockSessionContext.setAuth).toHaveBeenCalledWith(mockNewAuth);
    expect(mockSessionContext.removeAuth).not.toHaveBeenCalled();
    expect(mockSessionContext.flashNotification).not.toHaveBeenCalled();
  });
});
