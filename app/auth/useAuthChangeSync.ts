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

import { useLoaderData, useRevalidator } from '@remix-run/react';
import type { loader } from '@/root';
import { useBroadcastChannel } from '@/utils/useBroadcastChannel';
import { useEffect } from 'react';

export const useAuthChangeSync = () => {
  const { revalidate } = useRevalidator();

  const { auth } = useLoaderData<typeof loader>();
  const validUntil = auth?.data?.validUntil;

  // When another tab announces that auth has changed, we should revalidate to get the latest cookie
  const { sendMessage } = useBroadcastChannel<{
    validUntil: string | undefined;
  }>('AUTH_CHANGED', async (data) => {
    if (data.validUntil !== validUntil) {
      revalidate();
    }
  });

  useEffect(() => {
    sendMessage({ validUntil });
  }, [sendMessage, validUntil]);
};
