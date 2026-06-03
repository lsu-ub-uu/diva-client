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

import { useUser } from '@/utils/rootLoaderDataUtils';
import { useEffect, useRef } from 'react';
import { useFetcher } from 'react-router';

/**
 * How long before token expiry to start the renewal process
 */
const RENEW_TIME_BUFFER = 30_000;

export const useSessionAutoRenew = () => {
  const user = useUser();
  const renewTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const fetcher = useFetcher();
  const validUntil = Number(user?.validUntil);

  useEffect(() => {
    if (!validUntil) {
      return;
    }
    const timeUntilNextRenew = getTimeUntilNextRenew(validUntil);
    renewTimeout.current = setTimeout(() => {
      fetcher.submit(
        { intent: 'renewSession' },
        { method: 'POST', action: '/' },
      );
    }, timeUntilNextRenew);
    return () => {
      if (renewTimeout.current) {
        clearTimeout(renewTimeout.current);
      }
    };
  }, [fetcher, validUntil]);
};

export const getTimeUntilNextRenew = (validUntil: number) => {
  const now = new Date();
  const timeUntilInvalid = validUntil - now.getTime();
  return Math.max(timeUntilInvalid - RENEW_TIME_BUFFER, 0);
};
