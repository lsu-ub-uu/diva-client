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
import { useFetcher, useLoaderData } from '@remix-run/react';
import { type action, type loader } from '@/root';

export const useSessionAutoRenew = () => {
  const { auth } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const renewTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const authToken = auth?.data.token;
  const validUntil = Number(auth?.data.validUntil);

  const renewAuthToken = useCallback(async () => {
    if (fetcher.state === 'idle') {
      fetcher.submit({ intent: 'renewAuthToken' }, { method: 'POST' });
    }
  }, [fetcher]);

  useEffect(() => {
    if (!authToken) {
      return;
    }
    const timeUntilNextRenew = getTimeUntilNextRenew(validUntil);
    renewTimeout.current = setTimeout(renewAuthToken, timeUntilNextRenew);

    return () => {
      clearTimeout(renewTimeout.current);
    };
  }, [renewAuthToken, authToken, validUntil]);
};

export const getTimeUntilNextRenew = (validUntil: number) => {
  const now = new Date();
  const timeUntilInvalid = validUntil - now.getTime();
  const renewTimeBuffer = 10_000;
  return Math.max(timeUntilInvalid - renewTimeBuffer, 0); // Refresh 10 seconds before expiry
};
