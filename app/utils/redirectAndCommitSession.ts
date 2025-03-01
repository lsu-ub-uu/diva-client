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
 */

import type { Session } from 'react-router';
import { redirect } from 'react-router';
import { commitSession } from '@/auth/sessions.server';

export const redirectAndCommitSession = async (
  url: string,
  session: Session,
) => {
  return redirect(url, await getResponseInitWithSession(session));
};

export const getResponseInitWithSession = async (
  session: Session,
): Promise<ResponseInit> => {
  return {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  };
};
