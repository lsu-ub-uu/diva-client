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

import axios from 'axios';
import {
  createMockAuth,
  createMockCoraAuth,
} from '@/.server/cora/__mocks__/auth';
import { renewAuthToken } from '@/.server/cora/renewAuthToken';
import { expect } from 'vitest';

vi.mock('axios');

describe('renewAuthToken', () => {
  it('makes a request according to renew action link', async () => {
    const requestSpy = vi
      .spyOn(axios, 'request')
      .mockReturnValue(
        Promise.resolve({ status: 200, data: createMockCoraAuth() }),
      );

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

    expect(requestSpy).toBeCalledWith({
      method: 'POST',
      url: '/someUrl',
      headers: {
        Accept: 'SomeAccept',
        Authtoken: 'someAuthtoken',
      },
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
    vi.spyOn(axios, 'request').mockReturnValue(
      Promise.resolve({ status: 200, data: mockRenewedCoraAuth }),
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
