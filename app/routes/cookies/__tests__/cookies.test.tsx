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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CookiePolicy from '../cookies';
import { useLanguage } from '@/i18n/useLanguage';

vi.mock('@/i18n/useLanguage');

describe('CookiePolicy', () => {
  describe('English', () => {
    it('renders the english heading', () => {
      vi.mocked(useLanguage).mockReturnValue('en');
      render(<CookiePolicy />);
      expect(
        screen.getByRole('heading', { level: 1, name: 'Cookie Policy' }),
      ).toBeInTheDocument();
    });

    it('renders all english section headings', () => {
      vi.mocked(useLanguage).mockReturnValue('en');
      render(<CookiePolicy />);

      expect(
        screen.getByRole('heading', { level: 2, name: 'What Are Cookies?' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 2, name: 'Cookies We Use' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'Why We Use These Cookies',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 2, name: 'Managing Cookies' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'Updates to This Policy',
        }),
      ).toBeInTheDocument();
    });

    it('renders the cookie table with correct headers', () => {
      vi.mocked(useLanguage).mockReturnValue('en');
      render(<CookiePolicy />);

      const table = screen.getByRole('table');
      const headers = within(table).getAllByRole('columnheader');
      expect(headers).toHaveLength(3);
      expect(headers[0]).toHaveTextContent('Cookie Name');
      expect(headers[1]).toHaveTextContent('Purpose');
      expect(headers[2]).toHaveTextContent('Type');
    });

    it('renders all three cookies in the table', () => {
      vi.mocked(useLanguage).mockReturnValue('en');
      render(<CookiePolicy />);

      const table = screen.getByRole('table');
      const rows = within(table).getAllByRole('row');
      expect(rows).toHaveLength(4); // 1 header + 3 data rows

      expect(within(rows[1]).getByText('__session')).toBeInTheDocument();
      expect(within(rows[2]).getByText(/^_shibsession_/)).toBeInTheDocument();
      expect(within(rows[3]).getByText('userPreferences')).toBeInTheDocument();
    });

    it('renders the last updated text with a time element', () => {
      vi.mocked(useLanguage).mockReturnValue('en');
      render(<CookiePolicy />);
      const time = screen.getByText('June 2026');
      expect(time.tagName).toBe('TIME');
      expect(time).toHaveAttribute('dateTime', '2026-06');
    });
  });

  describe('Swedish', () => {
    it('renders the swedish heading', () => {
      vi.mocked(useLanguage).mockReturnValue('sv');
      render(<CookiePolicy />);
      expect(
        screen.getByRole('heading', { level: 1, name: 'Kakpolicy' }),
      ).toBeInTheDocument();
    });

    it('renders all swedish section headings', () => {
      vi.mocked(useLanguage).mockReturnValue('sv');
      render(<CookiePolicy />);

      expect(
        screen.getByRole('heading', { level: 2, name: 'Vad är kakor?' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 2, name: 'Kakor vi använder' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'Varför vi använder dessa kakor',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 2, name: 'Hantera kakor' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'Uppdateringar av denna policy',
        }),
      ).toBeInTheDocument();
    });

    it('renders the cookie table with swedish headers', () => {
      vi.mocked(useLanguage).mockReturnValue('sv');
      render(<CookiePolicy />);

      const table = screen.getByRole('table');
      const headers = within(table).getAllByRole('columnheader');
      expect(headers).toHaveLength(3);
      expect(headers[0]).toHaveTextContent('Kakans namn');
      expect(headers[1]).toHaveTextContent('Syfte');
      expect(headers[2]).toHaveTextContent('Typ');
    });

    it('renders all three cookies in the swedish table', () => {
      vi.mocked(useLanguage).mockReturnValue('sv');
      render(<CookiePolicy />);

      const table = screen.getByRole('table');
      const rows = within(table).getAllByRole('row');
      expect(rows).toHaveLength(4);

      expect(within(rows[1]).getByText('__session')).toBeInTheDocument();
      expect(within(rows[2]).getByText(/^_shibsession_/)).toBeInTheDocument();
      expect(within(rows[3]).getByText('userPreferences')).toBeInTheDocument();
    });

    it('renders the swedish last updated text with a time element', () => {
      vi.mocked(useLanguage).mockReturnValue('sv');
      render(<CookiePolicy />);
      const time = screen.getByText('juni 2026');
      expect(time.tagName).toBe('TIME');
      expect(time).toHaveAttribute('dateTime', '2026-06');
    });
  });
});
