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

import { describe, expect } from 'vitest';
import {
  commitSession,
  getAuth,
  getSessionFromCookie,
  type SessionData,
  type SessionFlashData,
} from '@/auth/sessions.server';
import { createMockAuth } from '@/.server/cora/__mocks__/auth';
import { mock } from 'vitest-mock-extended';
import { type Session } from '@remix-run/node';
import { renewAuth } from '@/auth/renewAuth.server';
import { renewAuthToken } from '@/.server/cora/renewAuthToken';
import type { AxiosError } from 'axios';
import type { i18n } from 'i18next';

vi.mock('@/auth/sessions.server');
vi.mock('@/.server/cora/renewAuthToken');

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
    vi.useRealTimers();
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
    vi.useRealTimers();
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
    vi.useRealTimers();
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
    vi.useRealTimers();
  });

  it('removes authToken when backend returns 401', async () => {
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

    const mockError = mock<AxiosError>({ status: 401, isAxiosError: true });
    vi.mocked(renewAuthToken).mockReturnValue(Promise.reject(mockError));

    vi.mocked(commitSession).mockReturnValue(Promise.resolve('updatedCookie'));

    const mockRequest = mock<Request>();
    await renewAuth(mockRequest, i18nMock);

    expect(renewAuthToken).toHaveBeenCalled();
    expect(mockSession.unset).toHaveBeenCalledWith('auth');
    expect(commitSession).toHaveBeenCalledWith(mockSession);
    expect(mockSession.flash).toHaveBeenCalledWith('notification', {
      details: 'divaClient_sessionExpiredDetailsText',
      severity: 'info',
      summary: 'divaClient_sessionExpiredSummaryText',
    });
    vi.useRealTimers();
  });
});
