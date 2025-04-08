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

import { describe, expect } from 'vitest';
import { TopNavigation } from '@/components/Layout/TopNavigation/TopNavigation';
import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import type { BFFRecordType } from '@/cora/transform/bffTypes.server';

describe('<TopNavigation />', () => {
  const TopNavigationWithRoutesStub = ({
    recordTypes,
  }: {
    recordTypes: BFFRecordType[];
  }) => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <TopNavigation recordTypes={recordTypes} />,
      },
    ]);

    return <RoutesStub />;
  };
  it('renders nothing when only one link in props', () => {
    const recordTypes = [
      { textId: 'Output', id: 'someRecordType' } as BFFRecordType,
    ];

    render(<TopNavigationWithRoutesStub recordTypes={recordTypes} />);
    const output = screen.queryByRole('link', { name: 'Output' });

    expect(output).not.toBeInTheDocument();
  });

  it('renders the topNavigation when more than one record type in props', () => {
    const recordTypes = [
      { textId: 'Output', id: 'someRecordType' } as BFFRecordType,
      { textId: 'Personer', id: 'someOtherLink' } as BFFRecordType,
    ];
    render(<TopNavigationWithRoutesStub recordTypes={recordTypes} />);
    const output = screen.getByRole('link', { name: 'Output' });
    const person = screen.getByRole('link', { name: 'Personer' });

    expect(output).toBeInTheDocument();
    expect(person).toBeInTheDocument();
  });
});
