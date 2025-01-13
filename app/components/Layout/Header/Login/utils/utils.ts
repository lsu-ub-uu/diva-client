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

export const messageIsFromWindowOpenedFromHere = (event: MessageEvent<any>) => {
  return event.origin === window.location.origin;
};

export const convertWebRedirectToUserSession = (coraUser: any): Auth => {
  const { actionLinks, ...rest } = coraUser;

  return { data: rest, actionLinks };
};

export const convertLoginIdToShortForm = (loginId: string) => {
  return loginId.split('@')[0];
};

export const checkTypeOfUser = (user: Auth) => {
  if (user.data.firstName) {
    return 'appToken';
  }
  return 'webRedirect';
};

export const printUserNameOnPage = (user: Auth) => {
  return checkTypeOfUser(user) === 'appToken'
    ? `${user.data.firstName} ${user.data.lastName}`
    : user.data.loginId
      ? convertLoginIdToShortForm(user.data.loginId)
      : user.data.userId;
};
