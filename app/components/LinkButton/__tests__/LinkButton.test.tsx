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

import { LinkButton } from '@/components/LinkButton/LinkButton';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('<LinkButton>', () => {
  vi.mock('react-i18next', () => ({
    useTranslation: () => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        t: (_: string) => 'translated to english',
      };
    },
  }));
  it('should render a link with text translated into english', () => {
    render(<LinkButton text='not translated' href='https://www.test.com' />);

    const linkElementButton = screen.getByRole('link');
    const translatedElement = screen.getByText('translated to english');

    expect(translatedElement).toBeInTheDocument();
    expect(linkElementButton).toBeInTheDocument();
    expect(linkElementButton).toHaveAttribute('href', 'https://www.test.com');
  });
});
