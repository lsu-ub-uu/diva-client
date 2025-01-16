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

import { renderHook } from '@testing-library/react';
import { useIsNewestWindow } from '@/utils/useIsNewestWindow';
import { useBroadcastChannel } from '@/utils/useBroadcastChannel';

vi.mock('@/utils/useBroadcastChannel');

describe('useIsNewestWindow', () => {
  it('resolves with true when myWindowId is larger than all ids in received message', async () => {
    vi.useFakeTimers();
    let simulateMessageReceived;

    vi.mocked(useBroadcastChannel).mockImplementation(
      (eventType, onMessageReceived) => {
        simulateMessageReceived = onMessageReceived;
        return { sendMessage: vi.fn() };
      },
    );

    vi.setSystemTime(new Date('2005-01-01T00:00:03').getTime());
    const { result } = renderHook(() => useIsNewestWindow());
    const isNewestWindow = result.current;

    simulateMessageReceived!({
      type: 'REQUEST_ATTEMPT',
      id: new Date('2005-01-01T00:00:01').getTime(),
    });
    simulateMessageReceived!({
      type: 'REQUEST_ATTEMPT',
      id: new Date('2005-01-01T00:00:02').getTime(),
    });

    const promise = isNewestWindow();
    vi.advanceTimersByTime(500);
    const actual = await promise;
    expect(actual).toBe(true);
  });

  it('resolves with true with non default syncWindowTime (100)', async () => {
    vi.useFakeTimers();

    vi.mocked(useBroadcastChannel).mockImplementation(() => {
      return { sendMessage: vi.fn() };
    });

    vi.setSystemTime(new Date('2005-01-01T00:00:01').getTime());
    const { result } = renderHook(() => useIsNewestWindow(100));
    const isNewestWindow = result.current;

    const promise = isNewestWindow();
    vi.advanceTimersByTime(100);
    const actual = await promise;
    expect(actual).toBe(true);
  });

  it('resolves with false when an id from a message is larger than myWindowId', async () => {
    let simulateMessageReceived;

    vi.mocked(useBroadcastChannel).mockImplementation(
      (eventType, onMessageReceived) => {
        simulateMessageReceived = onMessageReceived;
        return { sendMessage: vi.fn() };
      },
    );

    vi.useFakeTimers();

    vi.setSystemTime(new Date('2005-01-01T00:00:01').getTime());
    const { result } = renderHook(() => useIsNewestWindow());
    const isNewestWindow = result.current;

    simulateMessageReceived!({
      type: 'REQUEST_ATTEMPT',
      id: new Date('2005-01-01T00:00:02').getTime(),
    });

    const promise = isNewestWindow();

    vi.advanceTimersByTime(500);
    const actual = await promise;
    expect(actual).toBe(false);
  });

  it('sends a message to other windows with current time', async () => {
    vi.useFakeTimers();

    const sendMessageSpy = vi.fn();

    vi.mocked(useBroadcastChannel).mockImplementation(() => {
      return { sendMessage: sendMessageSpy };
    });

    vi.setSystemTime(new Date('2005-01-01T00:00:01').getTime());
    const { result } = renderHook(() => useIsNewestWindow());
    const isNewestWindow = result.current;

    const promise = isNewestWindow();
    vi.advanceTimersByTime(500);
    await promise;

    expect(sendMessageSpy).toHaveBeenCalledWith({
      id: new Date('2005-01-01T00:00:01').getTime(),
    });
  });
});
