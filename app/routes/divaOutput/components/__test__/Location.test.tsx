import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Location } from '../Location';
import type { LocationGroup } from '@/generatedTypes/divaTypes';

describe('Location', () => {
  it('renders a link starting with https://', () => {
    const location = {
      url: { value: 'https://example.com' },
      displayLabel: { value: 'Example' },
    } as LocationGroup;
    render(<Location location={location} />);
    const link = screen.getByRole('link', { name: 'Example' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders an optional icon', () => {
    const location = {
      url: { value: 'https://example.com' },
      displayLabel: { value: 'Example' },
    } as LocationGroup;
    render(<Location location={location} icon={<span>Icon</span>} />);
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('adds https:// to url if missing', () => {
    const location = {
      url: { value: 'example.com' },
      displayLabel: { value: 'Example' },
    } as LocationGroup;
    render(<Location location={location} />);
    expect(screen.getByRole('link', { name: 'Example' })).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });

  it('does not add https:// to url if starting with http://', () => {
    const location = {
      url: { value: 'http://example.com' },
      displayLabel: { value: 'Example' },
    } as LocationGroup;
    render(<Location location={location} />);
    expect(screen.getByRole('link', { name: 'Example' })).toHaveAttribute(
      'href',
      'http://example.com',
    );
  });
});
