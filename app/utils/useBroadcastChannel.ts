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

import { useCallback, useEffect } from 'react';

const channel = new BroadcastChannel('diva-client');

/**
 * A custom hook used for sending messages between windows/tabs. Returns a sendMessage function for sending messages to other tabs and passing data.
 *
 * @param eventType A unique event name.
 * @param onMessageReceived Callback function called when another window sends this message. The event data is passed as argument.
 */
export const useBroadcastChannel = <T extends Record<string, any>>(
  eventType: string,
  onMessageReceived: (data: T) => void,
) => {
  useEffect(() => {
    const onBroadcastChannelMessage = (event: MessageEvent) => {
      const { type } = event.data;

      if (type === eventType) {
        onMessageReceived(event.data);
      }
    };

    channel.addEventListener('message', onBroadcastChannelMessage);
    return () => {
      channel.removeEventListener('message', onBroadcastChannelMessage);
    };
  }, [eventType, onMessageReceived]);

  const sendMessage = useCallback(
    (data?: T) => {
      channel.postMessage({ type: eventType, ...data });
    },
    [eventType],
  );

  return {
    sendMessage,
  };
};
