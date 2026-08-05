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

import { Button } from '@/components/Button/Button';
import { createRef, type HTMLAttributes, type ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

interface MockLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  to?: string;
  children?: ReactNode;
}

const MockLink = ({ to, children, ...rest }: MockLinkProps) => (
  <a data-to={to} href={to} {...rest}>
    {children}
  </a>
);

describe('<Button>', () => {
  it('renders with default variant, size and tooltip position', async () => {
    const screen = await render(<Button>Save</Button>);

    const button = screen.getByRole('button', { name: 'Save' }).element();

    expect(button.getAttribute('data-variant')).toBe('secondary');
    expect(button.getAttribute('data-size')).toBe('medium');
    expect(button.getAttribute('data-tooltip-position')).toBe('bottom');
    expect(button.getAttribute('type')).toBe('button');
  });

  /* it('renders with custom variant, size and tooltip position', async () => {
    const screen = await render(
      <Button variant='primary' size='large' tooltipPosition='left'>
        Publish
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Publish' }).element();

    expect(button.getAttribute('data-variant')).toBe('primary');
    expect(button.getAttribute('data-size')).toBe('large');
    expect(button.getAttribute('data-tooltip-position')).toBe('left');
  }); */

  it.each(['primary', 'secondary', 'tertiary'] as const)(
    'sets variant %s',
    async (variant) => {
      const screen = await render(<Button variant={variant}>Variant</Button>);

      const button = screen.getByRole('button', { name: 'Variant' }).element();
      expect(button.getAttribute('data-variant')).toBe(variant);
    },
  );

  it.each(['small', 'medium', 'large'] as const)(
    'sets size %s',
    async (size) => {
      const screen = await render(<Button size={size}>Sized</Button>);

      const button = screen.getByRole('button', { name: 'Sized' }).element();
      expect(button.getAttribute('data-size')).toBe(size);
    },
  );

  it.each(['top', 'bottom', 'left', 'right'] as const)(
    'sets tooltip position %s',
    async (tooltipPosition) => {
      const screen = await render(
        <Button tooltipPosition={tooltipPosition}>Tooltip</Button>,
      );

      const button = screen.getByRole('button', { name: 'Tooltip' }).element();
      expect(button.getAttribute('data-tooltip-position')).toBe(
        tooltipPosition,
      );
    },
  );

  it('adds full width attributes when enabled', async () => {
    const screen = await render(<Button fullWidth>Delete</Button>);

    const button = screen.getByRole('button', { name: 'Delete' }).element();

    expect(button.hasAttribute('data-fullwidth')).toBe(true);
  });

  it('adds error data attributes when enabled', async () => {
    const screen = await render(<Button error>Delete</Button>);

    const button = screen.getByRole('button', { name: 'Delete' }).element();

    expect(button.hasAttribute('data-error')).toBe(true);
  });

  it('does not add full width and error data attributes by default', async () => {
    const screen = await render(<Button>Default attributes</Button>);

    const button = screen
      .getByRole('button', { name: 'Default attributes' })
      .element();

    expect(button.hasAttribute('data-fullwidth')).toBe(false);
    expect(button.hasAttribute('data-error')).toBe(false);
  });

  it('forwards custom className and standard props', async () => {
    const screen = await render(
      <Button className='custom-class' aria-label='Custom button' disabled>
        Disabled
      </Button>,
    );

    const button = screen
      .getByRole('button', { name: 'Custom button' })
      .element();

    expect(button.classList.contains('custom-class')).toBe(true);
    expect(button.hasAttribute('disabled')).toBe(true);
  });

  it('renders children', async () => {
    const screen = await render(
      <Button>
        <span>Nested child</span>
      </Button>,
    );

    await expect.element(screen.getByText('Nested child')).toBeVisible();
  });

  it('renders as the provided element type', async () => {
    const screen = await render(
      <Button as='a' href='https://example.com' target='_blank'>
        External
      </Button>,
    );

    const link = screen.getByRole('link', { name: 'External' }).element();

    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('https://example.com');
    expect(link.getAttribute('target')).toBe('_blank');
  });

  it('forwards to prop when using a custom link component', async () => {
    const screen = await render(
      <Button as={MockLink} to='/record/123'>
        Internal
      </Button>,
    );

    const link = screen.getByRole('link', { name: 'Internal' }).element();

    expect(link.getAttribute('data-to')).toBe('/record/123');
  });

  it('attaches ref to the rendered button element', async () => {
    const ref = createRef<HTMLButtonElement>();

    await render(<Button ref={ref}>With ref</Button>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('BUTTON');
  });
});
