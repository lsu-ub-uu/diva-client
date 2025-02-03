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

import { createCookieSessionStorage, data, type Session } from 'react-router';
import type { Auth } from '@/auth/Auth';

export type SessionData = {
  auth: Auth;
};

export type Notification = {
  severity: 'success' | 'error' | 'info';
  summary: string;
  details?: string;
};

export type SessionFlashData = {
  notification: Notification;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: '__session',
      domain: import.meta.env.DOMAIN,
      httpOnly: true,
      maxAge: 60 * 60 * 8, // 8h
      path: '/',
      sameSite: 'lax',
      secrets: ['s3cret1'],
      secure: import.meta.env.PROD,
    },
  });

async function getSessionFromCookie(request: Request) {
  return getSession(request.headers.get('Cookie'));
}

function getAuth(session: Session<SessionData, SessionFlashData>) {
  return session.get('auth');
}

async function requireAuth(session: Session<SessionData, SessionFlashData>) {
  const auth = getAuth(session);
  if (!auth) {
    // Show error boundary
    throw data('Unauthorized', { status: 401 });
  }

  return auth;
}

export {
  getSession,
  commitSession,
  destroySession,
  requireAuth,
  getAuth,
  getSessionFromCookie,
};
