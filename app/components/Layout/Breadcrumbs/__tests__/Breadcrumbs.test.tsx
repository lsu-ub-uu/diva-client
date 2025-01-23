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
 */

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Breadcrumbs } from '../Breadcrumbs';

describe('<Breadcrumbs />', () => {
  it('Renders', () => {
    render(
      <MemoryRouter initialEntries={['/page1/page1_1']}>
        <Breadcrumbs />
      </MemoryRouter>,
    );

    const breads = screen.getByText('page1_1');
    expect(breads).toBeInTheDocument();
  });
  it('Can take the user back to home page', () => {
    render(
      <MemoryRouter initialEntries={['/page1/page1_1']}>
        <Breadcrumbs />
      </MemoryRouter>,
    );

    expect(
      screen.getByText('divaClient_breadcrumbStartText').closest('a'),
    ).toHaveAttribute('href', '/');
  });

  it('Renders steps as breadcrumbs', () => {
    render(
      <MemoryRouter initialEntries={['/page1/page1_1']}>
        <Breadcrumbs />
      </MemoryRouter>,
    );

    expect(
      screen.getByText('divaClient_breadcrumbStartText'),
    ).toBeInTheDocument();
    expect(screen.getByText('page1')).toBeInTheDocument();
    expect(screen.getByText('page1_1')).toBeInTheDocument();
    expect(screen.queryByText('page2')).not.toBeInTheDocument();
  });

  it('Renders last id correctly breadcrumbs', () => {
    render(
      <MemoryRouter
        initialEntries={['/page1/divaOutputSwepub:2087392797647370']}
      >
        <Breadcrumbs />
      </MemoryRouter>,
    );

    expect(
      screen.getByText('divaClient_breadcrumbStartText'),
    ).toBeInTheDocument();
    expect(screen.getByText('page1')).toBeInTheDocument();
    expect(
      screen.getByText('divaOutputSwepub:2087392797647370', { exact: true }),
    ).toBeInTheDocument();
  });
});
