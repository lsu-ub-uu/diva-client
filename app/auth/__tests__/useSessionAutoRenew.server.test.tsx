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
import { act, render } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

const TestComponent = () => {
  useSessionAutoRenew();
  return <div>Test component rendered</div>;
};

describe('useSessionAutoRenew', () => {
  it('submits renewal 30 seconds before validUntil has expired', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-09T00:00:00Z'));

    const actionSpy = vi.fn().mockReturnValue({});
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
        action: actionSpy,
      },
    ]);

    await act(() => render(<RoutesStub />));

    expect(actionSpy).not.toHaveBeenCalled();

    await act(() => vi.advanceTimersByTime(minutesToMillis(4) + 30_000));

    expect(actionSpy).toHaveBeenCalled();
  });

  it('submits renewal immediately if validUntil within 30 seconds', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-09T00:00:00Z'));

    const actionSpy = vi.fn().mockReturnValue({});
    const loaderSpy = vi.fn().mockReturnValue({
      user: createMockUser({
        validUntil: new Date('2025-01-09T00:00:29Z').getTime().toString(),
      }),
    });

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        id: 'root',
        Component: TestComponent,
        loader: loaderSpy,
        action: actionSpy,
      },
    ]);

    await act(() => render(<RoutesStub />));

    await act(() => vi.advanceTimersByTime(1000));

    expect(actionSpy).toHaveBeenCalled();
  });

  it('does not renew when no auth token returned from backend', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-09T00:00:00Z'));

    const actionSpy = vi.fn().mockReturnValue({});

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        id: 'root',
        Component: TestComponent,
        action: actionSpy,
        loader: vi.fn().mockReturnValue({
          user: undefined,
        }),
      },
    ]);

    await act(() => render(<RoutesStub />));

    await act(() => vi.advanceTimersToNextTimer());
    expect(actionSpy).not.toHaveBeenCalled();
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
