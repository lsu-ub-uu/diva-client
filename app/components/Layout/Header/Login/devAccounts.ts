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

export interface Account {
  appToken: string;
  id?: string;
  validForNoSeconds?: string;
  userId?: string;
  idFromLogin: string;
  lastName?: string;
  firstName?: string;
}

const divaAdmin = {
  appToken: import.meta.env.VITE_DIVA_ADMIN_APP_TOKEN,
  userId: import.meta.env.VITE_DIVA_ADMIN_USER_ID,
  idFromLogin: import.meta.env.VITE_DIVA_ADMIN_ID_FROM_LOGIN,
  lastName: import.meta.env.VITE_DIVA_ADMIN_LAST_NAME,
  firstName: import.meta.env.VITE_DIVA_ADMIN_FIRST_NAME,
};

const divaEverything = {
  /*   appToken: import.meta.env.VITE_DIVA_EVERYTHING_APP_TOKEN,
  userId: import.meta.env.VITE_DIVA_EVERYTHING_USER_ID,
  idFromLogin: import.meta.env.VITE_DIVA_EVERYTHING_ID_FROM_LOGIN,
  lastName: import.meta.env.VITE_DIVA_EVERYTHING_LAST_NAME,
  firstName: import.meta.env.VITE_DIVA_EVERYTHING_FIRST_NAME, */
};

const systemAdmin = {
  /*   appToken: import.meta.env.VITE_SYSTEM_ADMIN_APP_TOKEN,
  userId: import.meta.env.VITE_SYSTEM_ADMIN_USER_ID,
  idFromLogin: import.meta.env.VITE_SYSTEM_ADMIN_ID_FROM_LOGIN,
  lastName: import.meta.env.VITE_SYSTEM_ADMIN_LAST_NAME,
  firstName: import.meta.env.VITE_SYSTEM_ADMIN_FIRST_NAME, */
};

const uuDomainAdmin = {
  /* 
  appToken: import.meta.env.VITE_UU_DOMAIN_ADMIN_APP_TOKEN,
  userId: import.meta.env.VITE_UU_DOMAIN_ADMIN_USER_ID,
  idFromLogin: import.meta.env.VITE_UU_DOMAIN_ADMIN_ID_FROM_LOGIN,
  lastName: import.meta.env.VITE_UU_DOMAIN_ADMIN_LAST_NAME,
  firstName: import.meta.env.VITE_UU_DOMAIN_ADMIN_FIRST_NAME, */
};

const kthDomainAdmin = {
  /*  appToken: import.meta.env.VITE_KTH_DOMAIN_ADMIN_APP_TOKEN,
  userId: import.meta.env.VITE_KTH_DOMAIN_ADMIN_USER_ID,
  idFromLogin: import.meta.env.VITE_KTH_DOMAIN_ADMIN_ID_FROM_LOGIN,
  lastName: import.meta.env.VITE_KTH_DOMAIN_ADMIN_LAST_NAME,
  firstName: import.meta.env.VITE_KTH_DOMAIN_ADMIN_FIRST_NAME, */
};

export const devAccounts: Account[] = [
  divaAdmin,
  divaEverything,
  systemAdmin,
  uuDomainAdmin,
  kthDomainAdmin,
];
