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

import type { Auth } from '@/auth/Auth';
import axios from 'axios';
import { coraLoginUrl } from '@/cora/helper.server';
import { transformCoraAuth } from '@/cora/transform/transformCoraAuth';

export async function requestAuthTokenOnLogin(
  user: string,
  appTokenOrPassword: string,
  loginType: 'apptoken' | 'password',
): Promise<Auth> {
  const url = coraLoginUrl(`/${loginType}`);

  const headers = {
    'Content-Type': 'application/vnd.cora.login',
    Accept: 'application/vnd.cora.authentication+json',
  };
  const body = `${user}\n${appTokenOrPassword}`;
  try {
    const response = await axios.post(url, body, { headers });
    return transformCoraAuth(response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
