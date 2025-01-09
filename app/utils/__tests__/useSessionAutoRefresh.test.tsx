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
  getTimeUntilNextRenew,
  useSessionAutoRenew,
} from '@/utils/useSessionAutoRenew';
import { expect } from 'vitest';
import { createRemixStub } from '@remix-run/testing';
import type { Auth } from '@/types/Auth';

import { act, render } from '@testing-library/react';

const TestComponent = () => {
  useSessionAutoRenew();
  return <div>Test component rendered</div>;
};

describe('useSessionAutoRenew', () => {
  it('renews auth token on first mount', async () => {
    const mockAuth = createMockAuth('2025-01-09T00:00:00Z');

    const renewAuthTokenActionSpy = vi.fn().mockReturnValue({
      status: 'Session renew',
      auth: mockAuth,
    });

    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: TestComponent,
      },
      {
        path: '/renewAuthToken',
        action: renewAuthTokenActionSpy,
      },
    ]);

    render(<RemixStub />);

    expect(renewAuthTokenActionSpy).toHaveBeenCalledOnce();
  });

  it('renews auth token 1 minute before validUntil has expired', async () => {
    vi.useFakeTimers();
    const mockDate = new Date('2025-01-09T00:00:00Z');
    vi.setSystemTime(mockDate);

    const renewAuthTokenActionSpy = vi
      .fn()
      .mockReturnValueOnce({
        status: 'Session renew',
        auth: createMockAuth('2025-01-09T00:05:00Z'),
      })
      .mockReturnValueOnce({
        status: 'Session renew',
        auth: createMockAuth('2025-01-09T00:10:00Z'),
      })
      .mockReturnValue({
        status: 'Session not renew',
        auth: undefined,
      });

    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: TestComponent,
      },
      {
        path: '/renewAuthToken',
        action: renewAuthTokenActionSpy,
      },
    ]);

    render(<RemixStub />);

    await act(() => expect(renewAuthTokenActionSpy).toHaveBeenCalled());
    await act(() => vi.advanceTimersByTime(minutesToMillis(4)));

    await act(() => expect(renewAuthTokenActionSpy).toHaveBeenCalledTimes(2));
    await act(() => vi.advanceTimersByTime(minutesToMillis(5)));

    expect(renewAuthTokenActionSpy).toHaveBeenCalledTimes(3);

    vi.useRealTimers();
  });

  it('stops auto renew when no auth token returned from backend', async () => {
    vi.useFakeTimers();
    const mockDate = new Date('2025-01-09T00:00:00Z');
    vi.setSystemTime(mockDate);

    const renewAuthTokenActionSpy = vi.fn().mockReturnValue({
      status: 'Session not renew',
      auth: undefined,
    });

    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: TestComponent,
      },
      {
        path: '/renewAuthToken',
        action: renewAuthTokenActionSpy,
      },
    ]);

    render(<RemixStub />);

    await act(() => expect(renewAuthTokenActionSpy).toHaveBeenCalled());
    await act(() => vi.advanceTimersByTime(minutesToMillis(5)));

    expect(renewAuthTokenActionSpy).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  describe('getTimeUntilNextRenew', () => {
    it('returns time difference between now and 1 minute before validUntil', () => {
      vi.useFakeTimers();
      const mockDate = new Date('2025-01-09T00:00:00');
      const validUntilMockDate = new Date('2025-01-09T00:05:00').getTime();
      vi.setSystemTime(mockDate);

      const actual = getTimeUntilNextRenew(validUntilMockDate);

      expect(actual).toBe(minutesToMillis(4));

      vi.useRealTimers();
    });

    it('returns 0 when time difference between now and validUntil is less than 1 minute', () => {
      vi.useFakeTimers();
      const mockDate = new Date('2025-01-09T00:00:00');
      const validUntilMockDate = new Date('2025-01-09T00:00:59').getTime();
      vi.setSystemTime(mockDate);

      const actual = getTimeUntilNextRenew(validUntilMockDate);

      expect(actual).toBe(0);

      vi.useRealTimers();
    });
  });
});

const createMockAuth = (validUntil: string): Auth => ({
  data: {
    token: `aaaaaaaa-aaaa-aaaa-aaaa-${validUntil}`,
    renewUntil: '1736431339581',
    validUntil: new Date(validUntil).getTime().toString(),
    userId: 'coraUser:111111111111111',
    loginId: 'user@domain.x',
    lastName: 'DiVA',
    firstName: 'Everything',
  },
  actionLinks: {
    delete: {
      rel: 'delete',
      requestMethod: 'DELETE',
      url: 'http://localhost:38180/login/rest/authToken/b01dab5e-50eb-492a-b40d-f416500f5e6f',
    },
    renew: {
      accept: 'application/vnd.uub.authToken+json',
      rel: 'renew',
      requestMethod: 'POST',
      url: 'http://130.238.171.95:38180/login/rest/authToken/b471b429-0306-4b06-b385-e7de434aa0d8',
    },
  },
});

const minutesToMillis = (minutes: number) => minutes * 1000 * 60;
