import type { i18n } from 'i18next';
import { describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { handleRenew } from '../renewAuthMiddleware.server';
import { type SessionContext } from '../sessionMiddleware.server';
import { renewAuthToken } from '@/cora/renewAuthToken.server';
import type { Auth } from '../Auth';
import { AxiosError } from 'axios';

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

    const mockNewAuth = { data: { token: '1234' } } as Auth;
    vi.mocked(renewAuthToken).mockResolvedValue(mockNewAuth);

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

    await handleRenew(mockSessionContext, mockI18n);

    expect(mockSessionContext.setAuth).toHaveBeenCalledWith(mockNewAuth);
    expect(mockSessionContext.removeAuth).not.toHaveBeenCalled();
    expect(mockSessionContext.flashNotification).not.toHaveBeenCalled();
  });

  it('does not throw an error when failing to renew auth token', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-01T00:00:00Z'));
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.mocked(renewAuthToken).mockRejectedValue(
      new AxiosError('Unauthorized', '401'),
    );

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

    await handleRenew(mockSessionContext, mockI18n);

    expect(mockSessionContext.setAuth).not.toHaveBeenCalled();
    expect(mockSessionContext.removeAuth).not.toHaveBeenCalled();
    expect(mockSessionContext.flashNotification).not.toHaveBeenCalled();
    expect(consoleMock).toHaveBeenCalledWith(
      'Failed to renew auth token',
      expect.any(AxiosError),
    );
  });

  it('does nothing if auth token not expired and not about to expire', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-01T00:00:00Z'));

    const mockSessionContext: SessionContext = {
      auth: {
        data: {
          validUntil: new Date('2025-01-01T00:20:00Z').getTime().toString(),
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

    await handleRenew(mockSessionContext, mockI18n);

    expect(mockSessionContext.setAuth).not.toHaveBeenCalled();
    expect(mockSessionContext.removeAuth).not.toHaveBeenCalled();
    expect(mockSessionContext.flashNotification).not.toHaveBeenCalled();
  });
});
