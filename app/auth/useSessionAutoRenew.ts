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

import { useCallback, useEffect, useRef } from 'react';
import { type action, type loader } from '@/root';
import { useIsNewestWindow } from '@/utils/useIsNewestWindow';
import { useFetcher, useLoaderData, useRevalidator } from 'react-router';

export const useSessionAutoRenew = () => {
  const { auth } = useLoaderData<typeof loader>();
  const { submit } = useFetcher<typeof action>();
  const renewTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const { revalidate } = useRevalidator();

  const isNewestWindow = useIsNewestWindow(1000);
  const validUntil = Number(auth?.data.validUntil);

  /**
   * Only the newest window/tab renews the auth token.
   */
  const renewAuthToken = useCallback(async () => {
    if (await isNewestWindow()) {
      submit({ intent: 'renewAuthToken' }, { method: 'POST' });
    } else {
      setTimeout(() => {
        revalidate();
      }, 1000);
    }
  }, [isNewestWindow, submit, revalidate]);

  useEffect(() => {
    if (!validUntil) {
      return;
    }
    const timeUntilNextRenew = getTimeUntilNextRenew(validUntil);
    renewTimeout.current = setTimeout(renewAuthToken, timeUntilNextRenew);

    return () => {
      if (renewTimeout.current) {
        clearTimeout(renewTimeout.current);
      }
    };
  }, [renewAuthToken, validUntil]);
};

export const getTimeUntilNextRenew = (validUntil: number) => {
  const now = new Date();
  const timeUntilInvalid = validUntil - now.getTime();
  const renewTimeBuffer = 30_000; //60_000 * 9 + 50_000;
  return Math.max(timeUntilInvalid - renewTimeBuffer, 0); // Refresh 10 seconds before expiry
};
