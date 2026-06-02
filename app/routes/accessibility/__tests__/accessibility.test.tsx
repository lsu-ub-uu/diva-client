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

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Accessibility from '../accessibility';
import { useLanguage } from '@/i18n/useLanguage';

vi.mock('@/i18n/useLanguage');

describe('Accessibility', () => {
  describe('English', () => {
    it('renders the english heading', () => {
      vi.mocked(useLanguage).mockReturnValue('en');
      render(<Accessibility />);
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: 'Accessibility report for the new DiVA',
        }),
      ).toBeInTheDocument();
    });

    it('renders all english section headings', () => {
      vi.mocked(useLanguage).mockReturnValue('en');
      render(<Accessibility />);

      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'How accessible is the website?',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'What can you do if you can not use parts of the site?',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'Report deficiencies in website accessibility',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 2, name: 'Supervision' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'Technical information about the accessibility of the website',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'The shortcomings of the website',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'How we tested the site',
        }),
      ).toBeInTheDocument();
    });

    it('renders support email links', () => {
      vi.mocked(useLanguage).mockReturnValue('en');
      render(<Accessibility />);

      const emailLinks = screen.getAllByRole('link', {
        name: 'diva-support@ub.uu.se',
      });
      expect(emailLinks.length).toBeGreaterThanOrEqual(2);
      expect(emailLinks[0]).toHaveAttribute(
        'href',
        'mailto:diva-support@ub.uu.se',
      );
    });

    it('renders the last updated date with a time element', () => {
      vi.mocked(useLanguage).mockReturnValue('en');
      render(<Accessibility />);

      const timeElements = screen.getAllByText('2026-06-02');
      const lastUpdated = timeElements[timeElements.length - 1];
      expect(lastUpdated.tagName).toBe('TIME');
      expect(lastUpdated).toHaveAttribute('dateTime', '2026-06-02');
    });

    it('renders the WCAG shortcomings list', () => {
      vi.mocked(useLanguage).mockReturnValue('en');
      render(<Accessibility />);

      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getByText(/Documents in PDF format/)).toBeInTheDocument();
    });
  });

  describe('Swedish', () => {
    it('renders the swedish heading', () => {
      vi.mocked(useLanguage).mockReturnValue('sv');
      render(<Accessibility />);
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: 'Nya DiVA:s tillgänglighetsredogörelse',
        }),
      ).toBeInTheDocument();
    });

    it('renders all swedish section headings', () => {
      vi.mocked(useLanguage).mockReturnValue('sv');
      render(<Accessibility />);

      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'Hur tillgänglig är webbplatsen?',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'Vad kan du göra om du inte kan använda delar av webbplatsen?',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'Rapportera brister i webbplatsens tillgänglighet',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 2, name: 'Tillsyn' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'Teknisk information om webbplatsens tillgänglighet',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'Webbplatsens brister',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'Hur vi testat webbplatsen',
        }),
      ).toBeInTheDocument();
    });

    it('renders support email links', () => {
      vi.mocked(useLanguage).mockReturnValue('sv');
      render(<Accessibility />);

      const emailLinks = screen.getAllByRole('link', {
        name: 'diva-support@ub.uu.se',
      });
      expect(emailLinks.length).toBeGreaterThanOrEqual(2);
      expect(emailLinks[0]).toHaveAttribute(
        'href',
        'mailto:diva-support@ub.uu.se',
      );
    });

    it('renders the swedish last updated date with a time element', () => {
      vi.mocked(useLanguage).mockReturnValue('sv');
      render(<Accessibility />);

      const timeElements = screen.getAllByText('2026-06-02');
      const lastUpdated = timeElements[timeElements.length - 1];
      expect(lastUpdated.tagName).toBe('TIME');
      expect(lastUpdated).toHaveAttribute('dateTime', '2026-06-02');
    });

    it('renders the WCAG shortcomings list', () => {
      vi.mocked(useLanguage).mockReturnValue('sv');
      render(<Accessibility />);

      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getByText(/Dokument i formatet PDF/)).toBeInTheDocument();
    });
  });
});
