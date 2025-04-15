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
  NavigationPanel,
  type NavigationPanelLink,
} from '@/components/NavigationPanel/NavigationPanel';
import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';

describe('NavigationPanel', () => {
  const links: NavigationPanelLink[] = [
    { name: 'anchor1', label: 'Anchor 1' },
    { name: 'anchor2', label: 'Anchor 2' },
    { name: 'anchor3', label: 'Anchor 3' },
  ];

  it('NavigationPanel renders with correct nr of links', () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <NavigationPanel links={links} />,
      },
    ]);
    render(<RoutesStub />);

    const navigationLinks = screen.getAllByRole('link');
    expect(navigationLinks).toHaveLength(3);
  });
});
