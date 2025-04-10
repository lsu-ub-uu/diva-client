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
import { readFileSync } from 'fs';

export default async function createReport() {
  const auth = await login();
  const body = readFileSync(
    new URL('./diva-report.xml', import.meta.url),
    'utf8',
  );

  try {
    const res = await fetch(
      'https://cora.epc.ub.uu.se/diva/rest/record/diva-output',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.uub.record+xml',
          Accept: 'application/vnd.uub.record+xml',
          authToken: auth.token,
        },
        body,
      },
    );
    const xml = await res.text();

    console.info('Successfully created record', xml);
  } catch (error) {
    console.error(error);
  } finally {
    await auth.logout();
  }
}
