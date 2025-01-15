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
} from '@/auth/useSessionAutoRenew';
import { expect } from 'vitest';
import { createRemixStub } from '@remix-run/testing';
import { act, render } from '@testing-library/react';
import { createMockAuth } from '@/.server/cora/__mocks__/auth';

const TestComponent = () => {
  useSessionAutoRenew();
  return <div>Test component rendered</div>;
};

describe('useSessionAutoRenew', () => {
  it('renews auth token after 1s if validUntil within 10 seconds', async () => {
    vi.useFakeTimers();

    vi.setSystemTime(new Date('2025-01-09T00:00:00Z'));
    const mockAuth = createMockAuth({
      data: {
        validUntil: new Date('2025-01-09T00:00:05Z').getTime().toString(),
      },
    });

    const renewAuthTokenActionSpy = vi.fn().mockReturnValue({});

    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: TestComponent,
        loader: () => ({ auth: mockAuth }),
        action: renewAuthTokenActionSpy,
      },
    ]);

    await act(() => render(<RemixStub />));

    await act(() => vi.advanceTimersByTime(1000));

    expect(renewAuthTokenActionSpy).toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('renews auth token 10 seconds before validUntil has expired', async () => {
    vi.useFakeTimers();
    const mockDate = new Date('2025-01-09T00:00:00Z');
    vi.setSystemTime(mockDate);

    const renewAuthTokenActionSpy = vi.fn().mockReturnValue({});

    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: TestComponent,
        loader: vi.fn().mockReturnValue({
          auth: createMockAuth({
            data: {
              validUntil: new Date('2025-01-09T00:00:05Z').getTime().toString(),
            },
          }),
        }),
        action: renewAuthTokenActionSpy,
      },
    ]);

    await act(() => render(<RemixStub />));

    await act(() => vi.advanceTimersByTime(minutesToMillis(4) + 50_000));
    expect(renewAuthTokenActionSpy).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('does not renew when no auth token returned from backend', async () => {
    vi.useFakeTimers();
    const mockDate = new Date('2025-01-09T00:00:00Z');
    vi.setSystemTime(mockDate);

    const renewAuthTokenActionSpy = vi.fn().mockReturnValue({
      status: 'Session not renew',
    });

    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: TestComponent,
        action: renewAuthTokenActionSpy,
        loader: vi.fn().mockReturnValue({
          auth: undefined,
        }),
      },
    ]);

    await act(() => render(<RemixStub />));

    await act(() => vi.advanceTimersToNextTimer());
    expect(renewAuthTokenActionSpy).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it.todo('revalidates instead of renewing when not newest window');

  describe('getTimeUntilNextRenew', () => {
    it('returns time difference between now and 1 minute before validUntil', () => {
      vi.useFakeTimers();
      const mockDate = new Date('2025-01-09T00:00:00');
      const validUntilMockDate = new Date('2025-01-09T00:05:00').getTime();
      vi.setSystemTime(mockDate);

      const actual = getTimeUntilNextRenew(validUntilMockDate);

      expect(actual).toBe(290000);

      vi.useRealTimers();
    });

    it('returns 0 when time difference between now and validUntil is less than 10 seconds', () => {
      vi.useFakeTimers();
      const mockDate = new Date('2025-01-09T00:00:00');
      const validUntilMockDate = new Date('2025-01-09T00:00:09').getTime();
      vi.setSystemTime(mockDate);

      const actual = getTimeUntilNextRenew(validUntilMockDate);

      expect(actual).toBe(0);

      vi.useRealTimers();
    });
  });
});

const minutesToMillis = (minutes: number) => minutes * 1000 * 60;
