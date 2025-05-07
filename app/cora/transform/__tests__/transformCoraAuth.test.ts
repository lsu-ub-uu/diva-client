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
import type { AuthWrapper } from '@/cora/cora-data/types.server';
import { transformCoraAuth } from '@/cora/transform/transformCoraAuth';
import { describe, expect, it } from 'vitest';

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
        accept: 'application/vnd.cora.authToken+json',
      },
      delete: {
        requestMethod: 'DELETE',
        rel: 'delete',
        url: 'http://localhost:38180/login/rest/authToken/b01dab5e-50eb-492a-b40d-f416500f5e6f',
      },
    },
  },
};

const authUserWithPermissionUnit: AuthWrapper = {
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
        {
          repeatId: '1',
          children: [
            {
              name: 'linkedRecordType',
              value: 'permissionUnit',
            },
            {
              name: 'linkedRecordId',
              value: 'uu',
            },
          ],
          name: 'permissionUnit',
        },
        {
          repeatId: '2',
          children: [
            {
              name: 'linkedRecordType',
              value: 'permissionUnit',
            },
            {
              name: 'linkedRecordId',
              value: 'hh',
            },
          ],
          name: 'permissionUnit',
        },
      ],
      name: 'authToken',
    },

    actionLinks: {
      renew: {
        requestMethod: 'POST',
        rel: 'renew',
        url: 'http://130.238.171.95:38180/login/rest/authToken/b471b429-0306-4b06-b385-e7de434aa0d8',
        accept: 'application/vnd.cora.authToken+json',
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
    expect(actual).toStrictEqual({
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
          accept: 'application/vnd.cora.authToken+json',
          rel: 'renew',
          requestMethod: 'POST',
          url: 'http://130.238.171.95:38180/login/rest/authToken/b471b429-0306-4b06-b385-e7de434aa0d8',
        },
      },
    });
  });

  it('Returns one Auth for Cora AuthToken with permissionUnits', () => {
    const actual = transformCoraAuth(authUserWithPermissionUnit);

    expect(actual).toStrictEqual({
      data: {
        token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        renewUntil: '1736431339581',
        validUntil: '1736345539581',
        userId: 'coraUser:111111111111111',
        loginId: 'user@domain.x',
        lastName: 'DiVA',
        firstName: 'Everything',
        permissionUnit: ['uu', 'hh'],
      },
      actionLinks: {
        delete: {
          rel: 'delete',
          requestMethod: 'DELETE',
          url: 'http://localhost:38180/login/rest/authToken/b01dab5e-50eb-492a-b40d-f416500f5e6f',
        },
        renew: {
          accept: 'application/vnd.cora.authToken+json',
          rel: 'renew',
          requestMethod: 'POST',
          url: 'http://130.238.171.95:38180/login/rest/authToken/b471b429-0306-4b06-b385-e7de434aa0d8',
        },
      },
    });
  });
});
