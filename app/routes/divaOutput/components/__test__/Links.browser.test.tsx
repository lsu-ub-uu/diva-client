import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';
import { Links } from '../Links';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from '@vitest/browser/context';

vi.mock('@/i18n/useLanguage', () => ({
  useLanguage: () => 'en',
}));

describe('Links', () => {
  it('renders nothing when no links', async () => {
    const output = {} as DivaOutputGroup;

    const screen = await render(<Links output={output} />);

    expect(screen.container).toBeEmptyDOMElement();
  });

  it('renders nothing when both arrays are empty', async () => {
    const output = {
      location_displayLabel_orderLink: [],
      location: [],
    } as unknown as DivaOutputGroup;

    const screen = await render(<Links output={output} />);

    expect(screen.container).toBeEmptyDOMElement();
  });

  it('renders order links with shopping cart icons', async () => {
    const output = {
      location_displayLabel_orderLink: [
        {
          url: { value: 'http://order.com/1' },
          displayLabel: { value: 'Order 1' },
          __text: { sv: 'Beställningslänk', en: 'Order link' },
        },
        {
          url: { value: 'http://order.com/2' },
          displayLabel: { value: 'Order 2' },
          __text: { sv: 'Beställningslänk', en: 'Order link' },
        },
      ],
    } as DivaOutputGroup;

    await render(<Links output={output} />);

    const links = page.getByRole('link');
    await expect.element(links.nth(0)).toHaveTextContent('Order 1');
    await expect
      .element(links.nth(0))
      .toHaveAttribute('href', 'http://order.com/1');
    await expect.element(links.nth(1)).toHaveTextContent('Order 2');
    await expect
      .element(links.nth(1))
      .toHaveAttribute('href', 'http://order.com/2');
  });

  it('renders other links with external link icons', async () => {
    const output = {
      location: [
        {
          url: { value: 'http://example.com' },
          displayLabel: { value: 'Example' },
          __text: { sv: 'Länk', en: 'Link' },
        },
      ],
    } as DivaOutputGroup;

    await render(<Links output={output} />);

    const link = page.getByRole('link');
    await expect.element(link).toHaveTextContent('Example');
    await expect.element(link).toHaveAttribute('href', 'http://example.com');
  });

  it('renders both order links and other links', async () => {
    const output = {
      location_displayLabel_orderLink: [
        {
          url: { value: 'http://order.com/1' },
          displayLabel: { value: 'Order 1' },
          __text: { sv: 'Beställningslänk', en: 'Order link' },
        },
      ],
      location: [
        {
          url: { value: 'http://example.com' },
          displayLabel: { value: 'Example' },
          __text: { sv: 'Länk', en: 'Link' },
        },
      ],
    } as DivaOutputGroup;

    await render(<Links output={output} />);

    const links = page.getByRole('link');
    await expect.element(links.nth(0)).toHaveTextContent('Order 1');
    await expect.element(links.nth(1)).toHaveTextContent('Example');
  });

  it('renders url as display text when displayLabel is missing', async () => {
    const output = {
      location: [
        {
          url: { value: 'http://example.com/page' },
          __text: { sv: 'Länk', en: 'Link' },
        },
      ],
    } as DivaOutputGroup;

    await render(<Links output={output} />);

    const link = page.getByRole('link');
    await expect.element(link).toHaveTextContent('http://example.com/page');
  });

  it('prepends https when url lacks protocol', async () => {
    const output = {
      location: [
        {
          url: { value: 'example.com' },
          displayLabel: { value: 'Example' },
          __text: { sv: 'Länk', en: 'Link' },
        },
      ],
    } as DivaOutputGroup;

    await render(<Links output={output} />);

    const link = page.getByRole('link');
    await expect.element(link).toHaveAttribute('href', 'https://example.com');
  });

  it('renders heading', async () => {
    const output = {
      location: [
        {
          url: { value: 'http://example.com' },
          __text: { sv: 'Länk', en: 'Link' },
        },
      ],
    } as DivaOutputGroup;

    await render(<Links output={output} />);

    await expect.element(page.getByRole('heading', { level: 2 })).toBeVisible();
  });

  it('renders term label from __text in current language', async () => {
    const output = {
      location: [
        {
          url: { value: 'http://example.com' },
          __text: { sv: 'Länk', en: 'Link' },
        },
      ],
    } as DivaOutputGroup;

    await render(<Links output={output} />);

    const term = page.getByRole('term');
    await expect.element(term).toHaveTextContent('Link');
  });
});
