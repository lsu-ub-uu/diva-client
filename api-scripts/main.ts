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
import login from './auth';
import createReport from './createReport';
const coraApiUrl = 'https://cora.epc.ub.uu.se/diva/rest';
const coraLoginUrl = 'https://cora.epc.ub.uu.se/diva/login';

//const coraApiUrl = 'https://pre.diva-portal.org/rest';
//const coraLoginUrl = 'https://pre.diva-portal.org/login';
const auth = await login(
  coraLoginUrl,
  'divaAdmin@cora.epc.ub.uu.se',
  '49ce00fb-68b5-4089-a5f7-1c225d3cf156',
);

try {
  await Promise.all([
    createReport(auth.token, coraApiUrl, './ultimateDivaOutput.xml'),
  ]);

  console.info('All reports created successfully');
} finally {
  await auth.logout();
}
