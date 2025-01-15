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

import { useCallback, useRef } from 'react';
import { useBroadcastChannel } from '@/utils/useBroadcastChannel';

const myWindowId = Date.now();

interface WindowSyncMessage {
  id: number;
}

/**
 * A custom hook used for checking if the current window is the last opened.
 *
 * Can be used to make sure only one tab does something.
 *
 * @param syncWindowTime The time to wait for other tabs to report.
 */
export const useIsNewestWindow = (syncWindowTime: number = 500) => {
  const latestRequestId = useRef<number>(myWindowId);
  const { sendMessage } = useBroadcastChannel<WindowSyncMessage>(
    'REQUEST_ATTEMPT',
    (data) => {
      const { id } = data;

      if (id > latestRequestId.current) {
        latestRequestId.current = id;
      }
    },
  );

  const resetWindowSync = () => (latestRequestId.current = myWindowId);

  const isNewestWindow = () => {
    sendMessage({ id: myWindowId });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(latestRequestId.current === myWindowId);
        resetWindowSync();
      }, syncWindowTime);
    });
  };

  return useCallback(isNewestWindow, [syncWindowTime, sendMessage]);
};
