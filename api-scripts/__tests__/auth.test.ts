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

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import login from '../auth';

const mockAuthResponse = {
  authentication: {
    data: {
      children: [{ name: 'token', value: 'mock-token-123' }],
    },
    actionLinks: {
      delete: { url: 'https://logout.url' },
    },
  },
};

describe('login', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockAuthResponse),
      }),
    );

    vi.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should make a POST request with correct parameters', async () => {
    await login();

    expect(fetch).toHaveBeenCalledWith(
      'https://cora.epc.ub.uu.se/diva/login/rest/apptoken',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.cora.login',
          Accept: 'application/vnd.cora.authentication+json',
        },
        body: 'divaAdmin@cora.epc.ub.uu.se\n49ce00fb-68b5-4089-a5f7-1c225d3cf156',
      },
    );
  });

  it('should return the correct token and logout function', async () => {
    const result = await login();

    expect(result.token).toBe('mock-token-123');
    expect(typeof result.logout).toBe('function');
  });

  describe('logout', () => {
    it('should call DELETE endpoint and log success', async () => {
      const { logout } = await login();
      await logout();

      expect(fetch).toHaveBeenCalledWith('https://logout.url', {
        method: 'DELETE',
      });
      expect(console.info).toHaveBeenCalledWith('Successfully logged out');
    });
  });
});
