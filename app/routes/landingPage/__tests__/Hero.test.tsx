import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Hero } from '../Hero';
import type { BFFMemberHero } from '@/cora/bffTypes.server';
import { useLanguage } from '@/i18n/useLanguage';

vi.mock('@/i18n/useLanguage');

describe('Hero', () => {
  it('renders with minimal data', () => {
    vi.mocked(useLanguage).mockReturnValue('en');

    const heroData: BFFMemberHero = {
      title: {
        sv: 'Testtitel',
        en: 'Test Title',
      },
      imageUrl: '/divaclient/public/images/hero/hero.jpg',
      imageAttribution: {
        source: {
          displayLabel: 'Source',
          url: 'https://example.com/source',
        },
        license: {
          displayLabel: 'License',
        },
      },
    };

    render(<Hero hero={heroData} />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Test Title' }),
    ).toBeInTheDocument();

    expect(screen.getByRole('presentation')).toHaveAttribute(
      'src',
      '/divaclient/public/images/hero/hero.jpg',
    );
    expect(screen.getByRole('presentation')).toHaveAttribute('alt', '');
    expect(screen.getByRole('link', { name: 'Source' })).toHaveAttribute(
      'href',
      'https://example.com/source',
    );
    expect(screen.getByText('License')).toBeInTheDocument();
  });

  it('renders with maximal data', () => {
    vi.mocked(useLanguage).mockReturnValue('en');

    const heroData: BFFMemberHero = {
      title: {
        sv: 'Testtitel',
        en: 'Test Title',
      },
      subTitle: {
        sv: 'Testundertitel',
        en: 'Test Subtitle',
      },
      imageUrl: '/divaclient/public/images/hero/hero.jpg',
      imageAttribution: {
        title: {
          sv: 'Bildtitel',
          en: 'Image title',
        },
        author: 'Test Author',
        source: {
          displayLabel: 'Source',
          url: 'https://example.com/source',
        },
        license: {
          displayLabel: 'License',
          url: 'https://example.com/license',
        },
      },
    };

    render(<Hero hero={heroData} />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Test Title' }),
    ).toBeInTheDocument();

    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();

    expect(screen.getByRole('presentation')).toHaveAttribute(
      'src',
      '/divaclient/public/images/hero/hero.jpg',
    );
    expect(screen.getByRole('presentation')).toHaveAttribute('alt', '');

    expect(screen.getByText('Image title')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Source' })).toHaveAttribute(
      'href',
      'https://example.com/source',
    );
    expect(screen.getByRole('link', { name: 'License' })).toHaveAttribute(
      'href',
      'https://example.com/license',
    );
  });

  it('renders with swedish texts', () => {
    vi.mocked(useLanguage).mockReturnValue('sv');

    const heroData: BFFMemberHero = {
      title: {
        sv: 'Testtitel',
        en: 'Test Title',
      },
      subTitle: {
        sv: 'Testundertitel',
        en: 'Test Subtitle',
      },
      imageUrl: '/divaclient/public/images/hero/hero.jpg',
      imageAttribution: {
        title: {
          sv: 'Bildtitel',
          en: 'Image title',
        },
        author: 'Test Author',
        source: {
          displayLabel: 'Source',
          url: 'https://example.com/source',
        },
        license: {
          displayLabel: 'License',
          url: 'https://example.com/license',
        },
      },
    };

    render(<Hero hero={heroData} />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Testtitel' }),
    ).toBeInTheDocument();

    expect(screen.getByText('Testundertitel')).toBeInTheDocument();

    expect(screen.getByRole('presentation')).toHaveAttribute(
      'src',
      '/divaclient/public/images/hero/hero.jpg',
    );
    expect(screen.getByRole('presentation')).toHaveAttribute('alt', '');

    expect(screen.getByText('Bildtitel')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Source' })).toHaveAttribute(
      'href',
      'https://example.com/source',
    );
    expect(screen.getByRole('link', { name: 'License' })).toHaveAttribute(
      'href',
      'https://example.com/license',
    );
  });
});
