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

// i18n/sessions.ts
import {
  createCookieSessionStorage,
  data,
  type Session,
} from '@remix-run/node';
import type { Auth } from '@/types/Auth';

type SessionData = {
  auth: Auth;
};

export type Notification = {
  severity: 'success' | 'error';
  summary: string;
  details?: string;
};

type SessionFlashData = {
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

function getAuthentication(session: Session<SessionData, SessionFlashData>) {
  return session.get('auth');
}

async function requireAuthentication(
  session: Session<SessionData, SessionFlashData>,
) {
  const auth = getAuthentication(session);
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
  requireAuthentication,
  getAuthentication,
  getSessionFromCookie,
};
