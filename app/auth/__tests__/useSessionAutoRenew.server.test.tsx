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

import { createMockUser } from '@/auth/__mocks__/auth';
import {
  getTimeUntilNextRenew,
  useSessionAutoRenew,
} from '@/auth/useSessionAutoRenew';
import { useIsNewestWindow } from '@/utils/useIsNewestWindow';
import { act, render } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import type { User } from '../createUser';

vi.mock('@/utils/useIsNewestWindow');

const TestComponent = () => {
  useSessionAutoRenew();
  return <div>Test component rendered</div>;
};

describe('useSessionAutoRenew', () => {
  it('renews auth token 30 seconds before validUntil has expired', async () => {
    const mockIsNewestWindow = vi.fn().mockReturnValue(Promise.resolve(true));
    vi.mocked(useIsNewestWindow).mockReturnValue(mockIsNewestWindow);

    vi.useFakeTimers();
    const mockDate = new Date('2025-01-09T00:00:00Z');
    vi.setSystemTime(mockDate);

    const renewAuthTokenActionSpy = vi.fn().mockReturnValue({});

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        id: 'root',
        Component: TestComponent,
        loader: vi.fn().mockReturnValue({
          user: createMockUser({
            validUntil: new Date('2025-01-09T00:00:05Z').getTime().toString(),
          }),
        }),
        action: renewAuthTokenActionSpy,
      },
    ]);

    await act(() => render(<RoutesStub />));

    await act(() => vi.advanceTimersByTime(minutesToMillis(4) + 30_000));
    expect(renewAuthTokenActionSpy).toHaveBeenCalled();
  });

  it('renews auth token after 1s if validUntil within 30 seconds', async () => {
    const mockIsNewestWindow = vi.fn().mockReturnValue(Promise.resolve(true));
    vi.mocked(useIsNewestWindow).mockReturnValue(mockIsNewestWindow);

    vi.useFakeTimers();

    vi.setSystemTime(new Date('2025-01-09T00:00:00Z'));
    const user: User = createMockUser({
      validUntil: new Date('2025-01-09T00:00:29Z').getTime().toString(),
    });

    const renewAuthTokenActionSpy = vi.fn().mockReturnValue({});

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        id: 'root',
        Component: TestComponent,
        loader: () => ({ user }),
        action: renewAuthTokenActionSpy,
      },
    ]);

    await act(() => render(<RoutesStub />));

    await act(() => vi.advanceTimersByTime(1000));

    expect(renewAuthTokenActionSpy).toHaveBeenCalled();
  });

  it('does not renew when no auth token returned from backend', async () => {
    vi.useFakeTimers();
    const mockDate = new Date('2025-01-09T00:00:00Z');
    vi.setSystemTime(mockDate);

    const renewAuthTokenActionSpy = vi.fn().mockReturnValue({
      status: 'Session not renew',
    });

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        id: 'root',
        Component: TestComponent,
        action: renewAuthTokenActionSpy,
        loader: vi.fn().mockReturnValue({
          user: undefined,
        }),
      },
    ]);

    await act(() => render(<RoutesStub />));

    await act(() => vi.advanceTimersToNextTimer());
    expect(renewAuthTokenActionSpy).not.toHaveBeenCalled();
  });

  it('revalidates (after 1s delay) instead of renewing when not newest window', async () => {
    const mockIsNewestWindow = vi.fn().mockReturnValue(Promise.resolve(false));
    vi.mocked(useIsNewestWindow).mockReturnValue(mockIsNewestWindow);

    vi.useFakeTimers();
    const mockDate = new Date('2025-01-09T00:00:00Z');
    vi.setSystemTime(mockDate);

    const renewAuthTokenActionSpy = vi.fn().mockReturnValue({});
    const loaderSpy = vi.fn().mockReturnValue({
      user: createMockUser({
        validUntil: new Date('2025-01-09T00:00:05Z').getTime().toString(),
      }),
    });

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        id: 'root',
        Component: TestComponent,
        loader: loaderSpy,
        action: renewAuthTokenActionSpy,
      },
    ]);

    await act(() => render(<RoutesStub />));

    await act(() => vi.advanceTimersByTime(minutesToMillis(4) + 30_000));
    expect(renewAuthTokenActionSpy).not.toHaveBeenCalled();
    expect(loaderSpy).toHaveBeenCalledTimes(1);

    await act(() => vi.advanceTimersByTime(5000));
    expect(loaderSpy).toHaveBeenCalledTimes(2);
  });

  describe('getTimeUntilNextRenew', () => {
    it('returns time difference between now and 1 minute before validUntil', () => {
      vi.useFakeTimers();
      const mockDate = new Date('2025-01-09T00:00:00');
      const validUntilMockDate = new Date('2025-01-09T00:05:00').getTime();
      vi.setSystemTime(mockDate);

      const actual = getTimeUntilNextRenew(validUntilMockDate);

      expect(actual).toBe(270000);
    });

    it('returns 0 when time difference between now and validUntil is less than 30 seconds', () => {
      vi.useFakeTimers();
      const mockDate = new Date('2025-01-09T00:00:00');
      const validUntilMockDate = new Date('2025-01-09T00:00:29').getTime();
      vi.setSystemTime(mockDate);

      const actual = getTimeUntilNextRenew(validUntilMockDate);

      expect(actual).toBe(0);
    });
  });
});

const minutesToMillis = (minutes: number) => minutes * 1000 * 60;
