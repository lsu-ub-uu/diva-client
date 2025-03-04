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

import { useBroadcastChannel } from '@/utils/useBroadcastChannel';
import { act, renderHook } from '@testing-library/react';
import { mock } from 'vitest-mock-extended';

describe('useBroadcastChannel', () => {
  it('sendMessage posts a message to the correct broadcast channel with the provided type and data.', () => {
    const mockBroadcastChannel = mock<BroadcastChannel>();

    vi.stubGlobal(
      'BroadcastChannel',
      vi.fn().mockReturnValue(mockBroadcastChannel),
    );

    const { result } = renderHook(() => useBroadcastChannel('test', vi.fn()));

    result.current.sendMessage({ someKey: 'someValue' });

    expect(mockBroadcastChannel.postMessage).toHaveBeenCalledWith({
      type: 'test',
      someKey: 'someValue',
    });
  });

  it('calls onMessageReceived callback when a message is received on the channel', async () => {
    let messageEventCallback = vi.fn();

    const mockBroadcastChannel = mock<BroadcastChannel>({
      addEventListener: vi.fn().mockImplementation((eventType, callback) => {
        if (eventType === 'message') {
          messageEventCallback = callback;
        }
      }),
    });

    vi.stubGlobal(
      'BroadcastChannel',
      vi.fn().mockReturnValue(mockBroadcastChannel),
    );

    const messageReceivedMock = vi.fn();

    await act(() =>
      renderHook(() => useBroadcastChannel('test', messageReceivedMock)),
    );

    expect(mockBroadcastChannel.addEventListener).toHaveBeenCalled();

    messageEventCallback({ data: { type: 'test', someData: 'someValue' } });

    expect(messageReceivedMock).toHaveBeenCalledWith({
      type: 'test',
      someData: 'someValue',
    });
  });

  it('does not call onMessageReceived callback when a message of another type is recieved', async () => {
    let messageEventCallback = vi.fn();

    const mockBroadcastChannel = mock<BroadcastChannel>({
      addEventListener: vi.fn().mockImplementation((eventType, callback) => {
        if (eventType === 'message') {
          messageEventCallback = callback;
        }
      }),
    });

    vi.stubGlobal(
      'BroadcastChannel',
      vi.fn().mockReturnValue(mockBroadcastChannel),
    );

    const messageReceivedMock = vi.fn();

    await act(() =>
      renderHook(() => useBroadcastChannel('test', messageReceivedMock)),
    );

    expect(mockBroadcastChannel.addEventListener).toHaveBeenCalled();

    messageEventCallback({ data: { type: 'notTest', someData: 'someValue' } });

    expect(messageReceivedMock).not.toHaveBeenCalled();
  });
});
