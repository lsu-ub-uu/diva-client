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

import { describe, expect, it, vi } from 'vitest';
import { getSessionCookieOptions } from '../getSessionCookieOptions.server';

describe('getSessionCookieOptions', () => {
  it('creates a secure cookie with secrets', () => {
    vi.stubEnv('SESSION_SECRETS', 'secret1,secret2');
    vi.stubEnv('SESSION_SECURE', 'true');

    const actual = getSessionCookieOptions();

    expect(actual).toStrictEqual({
      name: '__session',
      httpOnly: true,
      maxAge: 28800,
      path: '/',
      sameSite: 'lax',
      secrets: ['secret1', 'secret2'],
      secure: true,
    });
    vi.unstubAllEnvs();
  });

  it('creates an insecure cookie when explicitly disabled', () => {
    vi.stubEnv('SESSION_SECURE', 'false');
    const actual = getSessionCookieOptions();
    expect(actual.secure).toEqual(false);
    vi.unstubAllEnvs();
  });

  it('creates a secure cookie by default', () => {
    const actual = getSessionCookieOptions();
    expect(actual.secure).toEqual(true);
  });

  it('sets secrets to undefiend by default', () => {
    const actual = getSessionCookieOptions();
    expect(actual.secrets).toBeUndefined();
  });
});
