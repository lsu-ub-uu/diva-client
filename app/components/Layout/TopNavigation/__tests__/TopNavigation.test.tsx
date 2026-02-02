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

import { TopNavigation } from '@/components/Layout/TopNavigation/TopNavigation';
import type { BFFRecordType } from '@/cora/transform/bffTypes.server';
import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

describe('<TopNavigation />', () => {
  it('renders the topNavigation when more than one record type in props', () => {
    const recordTypes = [
      { textId: 'Output', id: 'someRecordType' } as BFFRecordType,
      { textId: 'Personer', id: 'someOtherLink' } as BFFRecordType,
    ];
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <TopNavigation navigation={recordTypes} onNavigationClick={vi.fn()} />
        ),
      },
    ]);
    render(<RoutesStub />);
    const output = screen.getByRole('link', { name: 'Output' });
    const person = screen.getByRole('link', { name: 'Personer' });

    expect(output).toBeInTheDocument();
    expect(person).toBeInTheDocument();
  });
});
