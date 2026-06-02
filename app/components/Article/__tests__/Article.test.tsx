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

import { renderWithRoutesStub } from '@/utils/testUtils';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Article } from '../Article';

describe('Article', () => {
  it('renders children inside an article element', () => {
    renderWithRoutesStub(
      <Article>
        <h1>Test Title</h1>
        <p>Test content</p>
      </Article>,
    );

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Test Title' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders inside a main element', () => {
    renderWithRoutesStub(
      <Article>
        <p>Content</p>
      </Article>,
    );

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toContainElement(screen.getByRole('article'));
  });
});
