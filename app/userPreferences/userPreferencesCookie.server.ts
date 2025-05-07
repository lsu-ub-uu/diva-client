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

import { createCookie } from 'react-router';

export interface UserPreferences {
  colorScheme: 'light' | 'dark' | 'auto';
}

export const userPreferencesCookie = createCookie('userPreferences', {
  sameSite: 'lax',
  path: '/',
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 14 days
});

export const parseUserPreferencesCookie = async (
  request: Request,
): Promise<UserPreferences> => {
  const cookieHeader = request.headers.get('Cookie');
  const userPreferences = await userPreferencesCookie.parse(cookieHeader);
  return userPreferences || ({ colorScheme: 'auto' } satisfies UserPreferences);
};

export const serializeUserPreferencesCookie = (
  userPreferences: UserPreferences,
) => {
  return userPreferencesCookie.serialize(userPreferences);
};
