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

import getEnvironment from '../../../../utils/getEnvironment';

export interface Account {
  appToken: string;
  id?: string;
  validForNoSeconds?: string;
  idInUserStorage?: string;
  idFromLogin: string;
  lastName?: string;
  firstName?: string;
}

const divaUser = {
  appToken: '49ce00fb-68b5-4089-a5f7-1c225d3cf156',
  idInUserStorage: '161616',
  idFromLogin: 'divaAdmin@cora.epc.ub.uu.se',
  lastName: 'DiVA',
  firstName: 'User',
};

const divaEverything = {
  appToken: '77edfec1-e1f1-45d4-a452-411668eba0f0',
  idInUserStorage: 'coraUser:490742519075086',
  idFromLogin: 'divaEverything@diva.cora.uu.se',
  lastName: 'DiVA',
  firstName: 'Everything',
};

const systemAdmin = {
  appToken: 'b5ec82bb-9492-4d9f-9069-c2fac3b49493',
  idInUserStorage: 'coraUser:491055276494310',
  idFromLogin: 'systemAdmin@diva.cora.uu.se',
  lastName: 'Admin',
  firstName: 'System',
};

const uuDomainAdmin = {
  appToken: '4808c689-48f1-4fe9-81e1-1888795933cf',
  idInUserStorage: 'coraUser:491144693381458',
  idFromLogin: 'dominAdminUU@diva.cora.uu.se',
  lastName: 'UU',
  firstName: 'domainAdmin',
};

const kthDomainAdmin = {
  appToken: 'cee52dba-56f8-4064-a379-05bd5ceab540',
  idInUserStorage: 'coraUser:491201365536105',
  idFromLogin: 'domainAdminKTH@diva.cora.uu.se',
  lastName: 'KTH',
  firstName: 'domainAdmin',
};

export const preAccounts: Account[] = [divaUser];

export const devAccounts: Account[] = [
  divaUser,
  divaEverything,
  systemAdmin,
  uuDomainAdmin,
  kthDomainAdmin,
];

export const getDevAccounts = () => {
  return getEnvironment() === 'pre' ? preAccounts : devAccounts;
};
