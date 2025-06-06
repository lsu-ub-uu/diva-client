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
import {
  commitSession,
  getAuth,
  getSessionFromCookie,
  type SessionData,
  type SessionFlashData,
} from '@/auth/sessions.server';
import { renewAuthToken } from '@/cora/renewAuthToken.server';
import type { i18n } from 'i18next';
import type { Session } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';

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
    const mockSession = mock<Session<SessionData, SessionFlashData>>();
    vi.mocked(getSessionFromCookie).mockReturnValue(
      Promise.resolve(mockSession),
    );
    vi.mocked(getAuth).mockReturnValue(mockAuth);

    const mockRenewedAuth = createMockAuth({
      data: {
        token: 'bbbbbb-bbbbbbbb-bbbbbb-bbbbbb',
        validUntil: new Date('2025-01-09T00:00:10Z').getTime().toString(),
        renewUntil: new Date('2025-01-10T00:00:05Z').getTime().toString(),
      },
    });
    vi.mocked(renewAuthToken).mockReturnValue(Promise.resolve(mockRenewedAuth));

    vi.mocked(commitSession).mockReturnValue(Promise.resolve('updatedCookie'));

    const mockRequest = mock<Request>();
    await renewAuth(mockRequest, i18nMock);

    expect(renewAuthToken).toHaveBeenCalled();
    expect(mockSession.set).toHaveBeenCalledWith('auth', mockRenewedAuth);
    expect(commitSession).toHaveBeenCalledWith(mockSession);
  });

  it('does nothing when not authenticated', async () => {
    const mockSession = mock<Session<SessionData, SessionFlashData>>();
    vi.mocked(getSessionFromCookie).mockReturnValue(
      Promise.resolve(mockSession),
    );
    vi.mocked(getAuth).mockReturnValue(undefined);
    const mockRequest = mock<Request>();

    const actual = await renewAuth(mockRequest, i18nMock);

    expect(renewAuthToken).not.toHaveBeenCalled();
    expect(actual).toEqual({ status: 'No auth to renew' });
    expect(mockSession.set).not.toHaveBeenCalled();
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
    const mockSession = mock<Session<SessionData, SessionFlashData>>();
    vi.mocked(getSessionFromCookie).mockReturnValue(
      Promise.resolve(mockSession),
    );
    vi.mocked(getAuth).mockReturnValue(mockAuth);

    const mockError = new Error();
    vi.mocked(renewAuthToken).mockRejectedValue(mockError);

    const mockRequest = mock<Request>();

    const actual = await renewAuth(mockRequest, i18nMock);

    expect(renewAuthToken).toHaveBeenCalled();

    expect(actual).toEqual({
      status: 'Failed to renew session',
      error: mockError,
    });
    expect(mockSession.set).not.toHaveBeenCalled();
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

    const mockSession = mock<Session<SessionData, SessionFlashData>>();
    vi.mocked(getSessionFromCookie).mockReturnValue(
      Promise.resolve(mockSession),
    );
    vi.mocked(getAuth).mockReturnValue(mockAuth);

    const mockRenewedAuth = createMockAuth({
      data: {
        token: 'bbbbbb-bbbbbbbb-bbbbbb-bbbbbb',
        validUntil: new Date('2025-01-09T00:00:10Z').getTime().toString(),
        renewUntil: new Date('2025-01-10T00:00:05Z').getTime().toString(),
      },
    });
    vi.mocked(renewAuthToken).mockReturnValue(Promise.resolve(mockRenewedAuth));

    vi.mocked(commitSession).mockReturnValue(Promise.resolve('updatedCookie'));

    const mockRequest = mock<Request>();
    await renewAuth(mockRequest, i18nMock);

    expect(renewAuthToken).not.toHaveBeenCalled();
    expect(mockSession.unset).toHaveBeenCalledWith('auth');
    expect(commitSession).toHaveBeenCalledWith(mockSession);
    expect(mockSession.flash).toHaveBeenCalledWith('notification', {
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
    const mockSession = mock<Session<SessionData, SessionFlashData>>();
    vi.mocked(getSessionFromCookie).mockReturnValue(
      Promise.resolve(mockSession),
    );
    vi.mocked(getAuth).mockReturnValue(mockAuth);

    const mockRenewedAuth = createMockAuth({
      data: {
        token: 'bbbbbb-bbbbbbbb-bbbbbb-bbbbbb',
        validUntil: new Date('2025-01-09T00:00:10Z').getTime().toString(),
        renewUntil: new Date('2025-01-10T00:00:05Z').getTime().toString(),
      },
    });
    vi.mocked(renewAuthToken).mockReturnValue(Promise.resolve(mockRenewedAuth));

    vi.mocked(commitSession).mockReturnValue(Promise.resolve('updatedCookie'));

    const mockRequest = mock<Request>();
    await renewAuth(mockRequest, i18nMock);

    expect(renewAuthToken).not.toHaveBeenCalled();
    expect(mockSession.unset).toHaveBeenCalledWith('auth');
    expect(commitSession).toHaveBeenCalledWith(mockSession);
    expect(mockSession.flash).toHaveBeenCalledWith('notification', {
      details: 'divaClient_sessionExpiredDetailsText',
      severity: 'info',
      summary: 'divaClient_sessionExpiredSummaryText',
    });
  });
});
