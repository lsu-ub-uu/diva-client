/*
 * Copyright 2026 Uppsala University Library
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

import { describe, expect, it } from 'vitest';
import {
  parseUserPreferencesCookie,
  serializeUserPreferencesCookie,
} from '../userPreferencesCookie.server';

describe('userPreferencesCookie', () => {
  describe('parseUserPreferencesCookie', () => {
    it('returns default preferences when cookie header is missing', async () => {
      const request = new Request('http://localhost');

      const actual = await parseUserPreferencesCookie(request);

      expect(actual).toStrictEqual({
        colorScheme: 'light',
        language: 'sv',
      });
    });

    it('parses preferences from a serialized cookie header', async () => {
      const cookie = await serializeUserPreferencesCookie({
        colorScheme: 'dark',
        language: 'en',
      });
      const request = new Request('http://localhost', {
        headers: {
          Cookie: cookie,
        },
      });

      const actual = await parseUserPreferencesCookie(request);

      expect(actual).toStrictEqual({
        colorScheme: 'dark',
        language: 'en',
      });
    });
  });

  describe('serializeUserPreferencesCookie', () => {
    it('serializes preferences into a cookie with expected attributes', async () => {
      const actual = await serializeUserPreferencesCookie({
        colorScheme: 'dark',
        language: 'cimode',
      });

      expect(actual).toContain('userPreferences=');
      expect(actual).toContain('Path=/');
      expect(actual).toContain('SameSite=Lax');
    });
  });
});
