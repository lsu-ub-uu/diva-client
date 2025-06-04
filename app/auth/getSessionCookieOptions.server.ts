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

export const getSessionCookieOptions = () => {
  const secrets = process.env.SESSION_SECRETS?.split(',');
  const secure = process.env.SESSION_SECURE !== 'false';

  return {
    name: '__session',
    httpOnly: true,
    maxAge: 60 * 60 * 8, // 8h
    path: '/',
    sameSite: 'lax' as const,
    secrets,
    secure,
  };
};
