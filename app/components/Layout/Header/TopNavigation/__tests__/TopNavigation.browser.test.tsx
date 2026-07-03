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

import { TopNavigation } from '@/components/Layout/Header/TopNavigation/TopNavigation';
import type { Navigation } from '@/data/getNavigation.server';
import { render } from 'vitest-browser-react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';

describe('<TopNavigation />', () => {
  it('renders the topNavigation when more than one record type in props', async () => {
    const navigation: Navigation = {
      mainNavigationItems: [
        {
          id: 'someRecordType',
          link: '/record/someRecordType',
          textId: 'Output',
        },
        {
          id: 'someOtherLink',
          link: '/record/someOtherLink',
          textId: 'Personer',
        },
      ],
      otherNavigationItems: [
        {
          id: 'someRecordType',
          link: '/record/someThirdLink',
          textId: 'Organisationer',
        },
      ],
    };
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <TopNavigation navigation={navigation} />,
      },
    ]);
    const screen = await render(<RoutesStub />);

    await expect
      .element(screen.getByRole('link', { name: 'Output' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('link', { name: 'Personer' }))
      .toBeVisible();

    await screen
      .getByRole('button', { name: 'divaClient_moreNavigationText' })
      .click();

    await expect
      .element(screen.getByRole('menuitem', { name: 'Organisationer' }))
      .toBeVisible();
  });
});
