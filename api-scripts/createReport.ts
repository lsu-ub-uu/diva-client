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

import { readFileSync } from 'fs';

export default async function createOutput(
  authtoken: string,
  coraApiUrl: string,
  file: string,
) {
  const body = readFileSync(new URL(file, import.meta.url), 'utf8');
  console.info('Creating report with file', file);
  try {
    const res = await fetch(`${coraApiUrl}/record/diva-output`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.cora.recordGroup+xml',
        Accept: 'application/vnd.cora.record+xml',
        authToken: authtoken,
      },
      body,
    });
    const xml = await res.text();

    if (res.status !== 201) {
      console.error(`Failed to create output: ${res.status} ${res.statusText}`);
      console.error(xml);
    }

    const id = xml.match(/<id>(.*?)<\/id>/)?.[1];

    console.info('Created output with id', id);
  } catch (error) {
    console.error(error);
  }
}
