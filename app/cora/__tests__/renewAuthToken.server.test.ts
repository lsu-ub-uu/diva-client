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

import { createMockAuth, createMockCoraAuth } from '@/auth/__mocks__/auth';
import { renewAuthToken } from '@/cora/renewAuthToken.server';
import { describe, expect, it, vi } from 'vitest';

describe('renewAuthToken', () => {
  it('makes a request according to renew action link', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(createMockCoraAuth()), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await renewAuthToken(
      createMockAuth({
        data: {
          token: 'someAuthtoken',
        },
        actionLinks: {
          renew: {
            rel: 'renew',
            url: '/someUrl',
            requestMethod: 'POST',
            accept: 'SomeAccept',
          },
        },
      }),
    );

    expect(fetchMock).toHaveBeenCalledWith('/someUrl', {
      method: 'POST',
      headers: {
        Accept: 'SomeAccept',
        Authtoken: 'someAuthtoken',
      },
      body: undefined,
    });
  });

  it('handles response', async () => {
    const mockAuth = createMockAuth();
    const mockRenewedCoraAuth = createMockCoraAuth({
      data: {
        ...mockAuth.data,
        token: 'someNewToken',
        validUntil: '999999999',
      },
      actionLinks: mockAuth.actionLinks,
    });
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify(mockRenewedCoraAuth), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    const result = await renewAuthToken(mockAuth);

    expect(result).toStrictEqual({
      ...mockAuth,
      data: {
        ...mockAuth.data,
        token: 'someNewToken',
        validUntil: '999999999',
      },
    });
  });
});
