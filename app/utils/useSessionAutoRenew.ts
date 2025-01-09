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
import { useFetcher } from '@remix-run/react';
import type { action } from '@/routes/renewAuthToken';

export const useSessionAutoRenew = () => {
  const fetcher = useFetcher<typeof action>();
  const renewTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const renewAuthToken = async () => {
      fetcher.submit(null, { method: 'POST', action: '/renewAuthToken' });
    };

    if (fetcher.state !== 'idle') {
      return;
    }

    if (fetcher.data) {
      if (!fetcher.data.auth) return;
      const validUntil = Number(fetcher.data.auth.data.validUntil);

      const timeUntilNextRefresh = getTimeUntilNextRenew(validUntil);

      renewTimeout.current = setTimeout(renewAuthToken, timeUntilNextRefresh);
    } else {
      // Initial load or error case
      renewAuthToken();
    }
  }, [fetcher]);
};

export const getTimeUntilNextRenew = (validUntil: number) => {
  const now = new Date();

  const timeUntilInvalid = validUntil - now.getTime();
  // 1 minute before expiry, or 0 if expires in less than 1 minute.
  return Math.max(timeUntilInvalid - 60000, 0); // Refresh 1 minute before expiry
};
