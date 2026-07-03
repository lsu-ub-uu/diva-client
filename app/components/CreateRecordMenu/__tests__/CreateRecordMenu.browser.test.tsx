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

import { CreateRecordMenu } from '@/components/CreateRecordMenu/CreateRecordMenu';
import { render } from 'vitest-browser-react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';

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

    const screen = await render(<RoutesStub />);

    const link = screen.getByRole('link', {
      name: 'divaClient_createText',
    });

    await expect
      .element(link)
      .toHaveAttribute('href', `/create?validationType=someValue`);
  });

  it('renders a dropdown when two validation type', async () => {
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

    const screen = await render(<RoutesStub />);

    const button = screen.getByRole('button', {
      name: 'divaClient_createText',
    });
    await button.click();

    const someLabelItem = screen.getByRole('menuitem', { name: 'someLabel' });
    await expect
      .element(someLabelItem.getByRole('link'))
      .toHaveAttribute('href', `/create?validationType=someValue`);

    const someOtherLabelItem = screen.getByRole('menuitem', {
      name: 'someOtherLabel',
    });
    await expect
      .element(someOtherLabelItem.getByRole('link'))
      .toHaveAttribute('href', `/create?validationType=someOtherValue`);
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

    const screen = await render(<RoutesStub />);
    await expect
      .element(screen.getByText('divaClient_createText'))
      .not.toBeInTheDocument();
  });
});
