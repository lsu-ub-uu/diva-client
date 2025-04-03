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
 */

import { describe, expect } from 'vitest';
import { CreateRecordMenu } from '@/components/CreateRecordMenu/CreateRecordMenu';
import { act, render, screen, within } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import userEvent from '@testing-library/user-event';

describe('CreateRecordMenu', () => {
  it('renders a link when one validation type', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <CreateRecordMenu
            validationTypes={[{ value: 'someValue', label: 'someLabel' }]}
            recordTypeTextId={'id'}
          />
        ),
      },
    ]);

    await act(() => render(<RoutesStub />));

    const link = screen.getByRole('link', {
      name: 'divaClient_createText',
    });

    expect(link).toHaveAttribute('href', `/create?validationType=someValue`);
  });

  it('renders a dropdown when two validation type', async () => {
    const user = userEvent.setup();
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <CreateRecordMenu
            validationTypes={[
              { value: 'someValue', label: 'someLabel' },
              { value: 'someOtherValue', label: 'someOtherLabel' },
            ]}
            recordTypeTextId={'id'}
          />
        ),
      },
    ]);

    await act(() => render(<RoutesStub />));

    const button = screen.getByRole('button', {
      name: 'divaClient_createText',
    });
    await user.click(button);
    expect(screen.getByRole('menuitem', { name: 'someLabel' })).toHaveAttribute(
      'href',
      `/create?validationType=someValue`,
    );
    expect(
      screen.getByRole('menuitem', { name: 'someOtherLabel' }),
    ).toHaveAttribute('href', `/create?validationType=someOtherValue`);
  });

  it('renders nothing when no validation type', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <CreateRecordMenu validationTypes={null} recordTypeTextId={'id'} />
        ),
      },
    ]);

    await act(() => render(<RoutesStub />));
    expect(screen.queryByText('divaClient_createText')).not.toBeInTheDocument();
  });
});
