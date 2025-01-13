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

import { useEffect, useRef } from 'react';
import { useFetcher, useLoaderData } from '@remix-run/react';
import type { action } from '@/routes/renewAuthToken';
import type { loader } from '@/root';

export const useSessionAutoRenew = () => {
  const { auth } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const renewTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const authToken = auth?.data.token;
  const validUntil = Number(auth?.data.validUntil);

  useEffect(() => {
    const renewAuthToken = async () => {
      fetcher.submit({ intent: 'renewAuthToken' }, { method: 'POST' });
    };

    if (!authToken) {
      console.log('Not logged in.');
      return;
    } else {
      console.log('AuthToken', authToken);
    }

    if (fetcher.state !== 'idle') {
      console.log('fetcher is not idle. ', fetcher.state);
      return;
    }

    if (!renewTimeout.current) {
      console.log('No renew scheduled');

      console.log({ validUntil });
      const timeUntilNextRefresh = getTimeUntilNextRenew(validUntil);
      console.log('Scheduling refresh in ms', timeUntilNextRefresh);
      renewTimeout.current = setTimeout(renewAuthToken, timeUntilNextRefresh);
    } else {
      console.log('Renew already scheduled');
    }
  }, [fetcher, authToken, validUntil]);
};

export const getTimeUntilNextRenew = (validUntil: number) => {
  const now = new Date();

  const timeUntilInvalid = validUntil - now.getTime();
  // 1 minute before expiry, or 0 if expires in less than 1 minute.
  return Math.max(timeUntilInvalid - 60000 * 9, 0); // Refresh 1 minute before expiry
};
