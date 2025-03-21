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
import { transformCoraAuth } from '@/cora/transform/transformCoraAuth';
import type { AuthWrapper } from '@/cora/cora-data/types.server';

const authUser: AuthWrapper = {
  authentication: {
    data: {
      children: [
        {
          name: 'token',
          value: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
        {
          name: 'validUntil',
          value: '1736345539581',
        },
        {
          name: 'renewUntil',
          value: '1736431339581',
        },
        {
          name: 'userId',
          value: 'coraUser:111111111111111',
        },
        {
          name: 'loginId',
          value: 'user@domain.x',
        },
        {
          name: 'firstName',
          value: 'Everything',
        },
        {
          name: 'lastName',
          value: 'DiVA',
        },
      ],
      name: 'authToken',
    },
    actionLinks: {
      renew: {
        requestMethod: 'POST',
        rel: 'renew',
        url: 'http://130.238.171.95:38180/login/rest/authToken/b471b429-0306-4b06-b385-e7de434aa0d8',
        accept: 'application/vnd.uub.authToken+json',
      },
      delete: {
        requestMethod: 'DELETE',
        rel: 'delete',
        url: 'http://localhost:38180/login/rest/authToken/b01dab5e-50eb-492a-b40d-f416500f5e6f',
      },
    },
  },
};

describe('transformCoraAuth', () => {
  it('Returns one Auth for Cora AuthToken', () => {
    const actual = transformCoraAuth(authUser);

    expect(actual).toEqual({
      data: {
        token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        renewUntil: '1736431339581',
        validUntil: '1736345539581',
        userId: 'coraUser:111111111111111',
        loginId: 'user@domain.x',
        lastName: 'DiVA',
        firstName: 'Everything',
      },
      actionLinks: {
        delete: {
          rel: 'delete',
          requestMethod: 'DELETE',
          url: 'http://localhost:38180/login/rest/authToken/b01dab5e-50eb-492a-b40d-f416500f5e6f',
        },
        renew: {
          accept: 'application/vnd.uub.authToken+json',
          rel: 'renew',
          requestMethod: 'POST',
          url: 'http://130.238.171.95:38180/login/rest/authToken/b471b429-0306-4b06-b385-e7de434aa0d8',
        },
      },
    });
  });
});
