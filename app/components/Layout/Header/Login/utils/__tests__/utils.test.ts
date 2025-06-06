/*
 * Copyright 2024 Uppsala University Library
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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */
import type { Auth } from '@/auth/Auth';
import { describe, expect, it, vi } from 'vitest';
import {
  convertLoginIdToShortForm,
  convertWebRedirectToUserSession,
  messageIsFromWindowOpenedFromHere,
  printUserNameOnPage,
} from '../utils';

describe('Login validation', () => {
  it('messageIsFromWindowOpenedFromHere return false on different event url', () => {
    vi.stubGlobal('location', { origin: 'someOtherUrl' });
    const actual = messageIsFromWindowOpenedFromHere({
      origin: 'someUrl',
    } as MessageEvent<any>);
    expect(actual).toBe(false);
  });

  it('messageIsFromWindowOpenedFromHere return true on same event url', () => {
    vi.stubGlobal('location', { origin: 'someUrl' });

    const actual = messageIsFromWindowOpenedFromHere({
      origin: 'someUrl',
    } as MessageEvent<any>);
    expect(actual).toBe(true);
  });

  it('convertWebRedirectToUserSession converts to UserSession', () => {
    const expected: Auth = {
      data: {
        token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', // this is the authToken
        validUntil: '1736342825558',
        renewUntil: '1738972800000',
        loginId: 'johdo290@user.uu.se',
        userId: 'coraUser:111111111111111',
      },
      actionLinks: {
        delete: {
          requestMethod: 'DELETE',
          rel: 'delete',
          url: 'https://pre.diva-portal.org/login/rest/authToken/17c2a9a8-9851-47fc-b502-8e41a314eb83',
        },
        renew: {
          requestMethod: 'POST',
          rel: 'renew',
          url: '',
        },
      },
    };

    const actual = convertWebRedirectToUserSession({
      token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      validUntil: '1736342825558',
      renewUntil: '1738972800000',
      userId: 'coraUser:111111111111111',
      loginId: 'johdo290@user.uu.se',
      actionLinks: {
        delete: {
          requestMethod: 'DELETE',
          rel: 'delete',
          url: 'https://pre.diva-portal.org/login/rest/authToken/17c2a9a8-9851-47fc-b502-8e41a314eb83',
        },
        renew: {
          requestMethod: 'POST',
          rel: 'renew',
          url: '',
        },
      },
    });
    expect(actual).toStrictEqual(expected);
  });

  it.each([
    ['johdo290@user.uu.se', 'johdo290'],
    ['joh.do@user.uu.se', 'joh.do'],
    ['joh+do@user.uu.se', 'joh+do'],
  ])('convertUserIdToShortForm converts %s to %s', (email, result) => {
    const actual = convertLoginIdToShortForm(email);
    expect(actual).toBe(result);
  });

  it.each([
    [
      {
        validUntil: '1736342825558',
        renewUntil: '1738972800000',
        userId: 'coraUser:111111111111111',
        loginId: 'coraUser:111111111111111',
        firstName: 'Everything',
        lastName: 'DiVA',
      },
      'Everything DiVA',
    ],
    [
      {
        validUntil: '1736342825558',
        renewUntil: '1738972800000',
        userId: 'coraUser:222222222222',
        loginId: 'johdo290@user.uu.se',
      },
      'johdo290@user.uu.se',
    ],
  ])('printUserNameOnPage', (user, name) => {
    const actual = printUserNameOnPage(user);
    expect(actual).toBe(name);
  });
});
