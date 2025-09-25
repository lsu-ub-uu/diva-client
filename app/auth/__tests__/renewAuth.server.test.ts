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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { createMockAuth } from '@/auth/__mocks__/auth';
import { renewAuth } from '@/auth/renewAuth.server';
import { commitSession } from '@/auth/sessions.server';
import { renewAuthToken } from '@/cora/renewAuthToken.server';
import type { i18n } from 'i18next';
import { describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';
import type { SessionContext } from '../sessionMiddleware.server';

vi.mock('@/auth/sessions.server');
vi.mock('@/cora/renewAuthToken.server');

const i18nMock = { t: (key) => key } as i18n;

describe('renewAuth', () => {
  it('renews authToken and sets it on the session', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-09T00:00:00Z'));
    const mockAuth = createMockAuth({
      data: {
        token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',

        validUntil: new Date('2025-01-09T00:00:05Z').getTime().toString(),
        renewUntil: new Date('2025-01-10T00:00:05Z').getTime().toString(),
      },
    });

    const mockRenewedAuth = createMockAuth({
      data: {
        token: 'bbbbbb-bbbbbbbb-bbbbbb-bbbbbb',
        validUntil: new Date('2025-01-09T00:00:10Z').getTime().toString(),
        renewUntil: new Date('2025-01-10T00:00:05Z').getTime().toString(),
      },
    });
    vi.mocked(renewAuthToken).mockReturnValue(Promise.resolve(mockRenewedAuth));

    vi.mocked(commitSession).mockReturnValue(Promise.resolve('updatedCookie'));

    const sessionContextMock = mock<SessionContext>({
      auth: mockAuth,
    });

    await renewAuth(i18nMock, sessionContextMock);

    expect(renewAuthToken).toHaveBeenCalled();
    expect(sessionContextMock.setAuth).toHaveBeenCalledWith(mockRenewedAuth);
  });

  it('does nothing when not authenticated', async () => {
    const sessionContextMock = mock<SessionContext>({
      auth: undefined,
    });
    const actual = await renewAuth(i18nMock, sessionContextMock);

    expect(renewAuthToken).not.toHaveBeenCalled();
    expect(actual).toEqual({ status: 'No auth to renew' });
    expect(sessionContextMock.setAuth).not.toHaveBeenCalled();
  });

  it('does not set cookie when failing to renew', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-09T00:00:00Z'));
    const mockAuth = createMockAuth({
      data: {
        token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',

        validUntil: new Date('2025-01-09T00:00:05Z').getTime().toString(),
        renewUntil: new Date('2025-01-10T00:00:05Z').getTime().toString(),
      },
    });

    const mockError = new Error();
    vi.mocked(renewAuthToken).mockRejectedValue(mockError);

    const sessionContextMock = mock<SessionContext>({
      auth: mockAuth,
    });

    const actual = await renewAuth(i18nMock, sessionContextMock);

    expect(renewAuthToken).toHaveBeenCalled();

    expect(actual).toEqual({
      status: 'Failed to renew session',
      error: mockError,
    });
    expect(sessionContextMock.setAuth).not.toHaveBeenCalled();
  });

  it('removes auth from session when validUntil is in the past', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-09T00:10:00Z'));
    const mockAuth = createMockAuth({
      data: {
        token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',

        validUntil: new Date('2025-01-09T00:00:05Z').getTime().toString(),
        renewUntil: new Date('2025-01-10T00:00:05Z').getTime().toString(),
      },
    });

    const mockRenewedAuth = createMockAuth({
      data: {
        token: 'bbbbbb-bbbbbbbb-bbbbbb-bbbbbb',
        validUntil: new Date('2025-01-09T00:00:10Z').getTime().toString(),
        renewUntil: new Date('2025-01-10T00:00:05Z').getTime().toString(),
      },
    });
    vi.mocked(renewAuthToken).mockReturnValue(Promise.resolve(mockRenewedAuth));

    const sessionContextMock = mock<SessionContext>({
      auth: mockAuth,
    });
    await renewAuth(i18nMock, sessionContextMock);

    expect(renewAuthToken).not.toHaveBeenCalled();
    expect(sessionContextMock.removeAuth).toHaveBeenCalled();
    expect(sessionContextMock.flashNotification).toHaveBeenCalledWith({
      details: 'divaClient_sessionExpiredDetailsText',
      severity: 'info',
      summary: 'divaClient_sessionExpiredSummaryText',
    });
  });

  it('removes auth from session when renewUntil is in the past', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-21T00:10:00Z'));
    const mockAuth = createMockAuth({
      data: {
        token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',

        validUntil: new Date('2025-01-09T00:00:05Z').getTime().toString(),
        renewUntil: new Date('2025-01-10T00:00:05Z').getTime().toString(),
      },
    });
    const mockRenewedAuth = createMockAuth({
      data: {
        token: 'bbbbbb-bbbbbbbb-bbbbbb-bbbbbb',
        validUntil: new Date('2025-01-09T00:00:10Z').getTime().toString(),
        renewUntil: new Date('2025-01-10T00:00:05Z').getTime().toString(),
      },
    });
    vi.mocked(renewAuthToken).mockReturnValue(Promise.resolve(mockRenewedAuth));

    const sessionContextMock = mock<SessionContext>({
      auth: mockAuth,
    });
    await renewAuth(i18nMock, sessionContextMock);

    expect(renewAuthToken).not.toHaveBeenCalled();
    expect(sessionContextMock.removeAuth).toHaveBeenCalled();
    expect(sessionContextMock.flashNotification).toHaveBeenCalledWith({
      details: 'divaClient_sessionExpiredDetailsText',
      severity: 'info',
      summary: 'divaClient_sessionExpiredSummaryText',
    });
  });
});
