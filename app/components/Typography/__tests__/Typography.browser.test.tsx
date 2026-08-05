/*
 * Copyright 2023 Uppsala University Library
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

import {
  mapTextStyleToComponent,
  Typography,
} from '@/components/Typography/Typography';
import type { TextStyle } from '@/cora/bffTypes.server';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

describe('<Typography>', () => {
  it.each<[TextStyle | undefined, string]>([
    ['h1TextStyle', 'h1'],
    ['h2TextStyle', 'h2'],
    ['h3TextStyle', 'h3'],
    ['h4TextStyle', 'h4'],
    ['h5TextStyle', 'h5'],
    ['h6TextStyle', 'h6'],
    [undefined, 'p'],
  ])('should map variant %s to %s element', (variant, expectedElement) => {
    expect(mapTextStyleToComponent(variant)).toBe(expectedElement);
  });

  it('should render a h2 that looks like a h1', async () => {
    const { baseElement, getByRole } = await render(
      <Typography variant='h1TextStyle' as='h2'>
        Some text
      </Typography>,
    );

    const headingElement = baseElement.querySelector('h2');
    const headingLocator = getByRole('heading', {
      level: 2,
    });

    await expect.element(headingLocator).toBeInTheDocument();
    await expect.element(headingLocator).toHaveTextContent('Some text');
    expect(headingElement).not.toBeNull();
    expect(headingElement?.getAttribute('data-variant')).toBe('h1TextStyle');
  });

  it('should render a paragraph by default', async () => {
    const { baseElement } = await render(<Typography>Some text</Typography>);

    const element = baseElement.querySelector('p');

    expect(element).not.toBeNull();
    expect(element?.textContent).toBe('Some text');
    expect(element?.hasAttribute('data-variant')).toBe(false);
  });
});
