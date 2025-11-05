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

import { Typography } from '@/components/Typography/Typography';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('<Typography>', () => {
  it('should render a text with default values', () => {
    render(<Typography>Some text</Typography>);

    const headingElement = screen.getByRole('heading', {
      level: 2,
    });

    const headingTranslatedElement = screen.getByText('Some text');
    expect(headingTranslatedElement).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveAttribute('data-variant', '');
    expect(headingElement.tagName).toBe('H2');
  });

  it('should render a paragraph by default', () => {
    render(<Typography>Some text</Typography>);

    const element = screen.getByText('Some text');

    expect(element).not.toHaveAttribute('data-variant');
    expect(element.tagName).toBe('P');
  });
});
