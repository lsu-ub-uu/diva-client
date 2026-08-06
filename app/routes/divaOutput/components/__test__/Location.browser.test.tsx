import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { Location } from '../Location';
import type { LocationGroup } from '@/generatedTypes/divaTypes';

describe('Location', () => {
  it('renders a link starting with https://', async () => {
    const location = {
      url: { value: 'https://example.com' },
      displayLabel: { value: 'Example' },
    } as LocationGroup;
    const screen = await render(<Location location={location} />);
    const link = screen.getByRole('link', { name: 'Example' }).element();
    await expect(link).toHaveAttribute('href', 'https://example.com');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders an optional icon', async () => {
    const location = {
      url: { value: 'https://example.com' },
      displayLabel: { value: 'Example' },
    } as LocationGroup;
    const screen = await render(
      <Location location={location} icon={<span>Icon</span>} />,
    );
    await expect.element(screen.getByText('Icon')).toBeVisible();
  });

  it('adds https:// to url if missing', async () => {
    const location = {
      url: { value: 'example.com' },
      displayLabel: { value: 'Example' },
    } as LocationGroup;
    const screen = await render(<Location location={location} />);
    await expect(
      screen.getByRole('link', { name: 'Example' }).element(),
    ).toHaveAttribute('href', 'https://example.com');
  });

  it('does not add https:// to url if starting with http://', async () => {
    const location = {
      url: { value: 'http://example.com' },
      displayLabel: { value: 'Example' },
    } as LocationGroup;
    const screen = await render(<Location location={location} />);
    await expect(
      screen.getByRole('link', { name: 'Example' }).element(),
    ).toHaveAttribute('href', 'http://example.com');
  });
});
