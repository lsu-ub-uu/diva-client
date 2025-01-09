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

import {
  commitSession,
  getAuthentication,
  getSessionFromCookie,
} from '@/.server/sessions';
import { type ActionFunctionArgs, data } from '@remix-run/node';

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = getAuthentication(session);
  if (!auth) {
    return { status: 'No session to renew', auth: undefined };
  }

  try {
    //  const renewedAuth = await renewAuthToken(auth);
    const renewedAuth = {
      ...auth,
      data: {
        ...auth.data,
        validUntil: new Date(Date.now() + 3 * 60 * 1000).getTime().toString(),
      },
    };
    session.set('auth', renewedAuth);

    return data(
      { status: 'Session renew', auth },
      {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      },
    );
  } catch (error) {
    return { status: 'Failed to renew session', auth: undefined, error };
  }
};
