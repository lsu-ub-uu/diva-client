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

import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { Breadcrumbs } from '../Breadcrumbs';

describe('<Breadcrumbs />', () => {
  it('Renders', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/page1',
        loader: () => ({ breadcrumb: 'page1Crumb' }),
        children: [
          {
            path: 'page1_1',
            loader: () => ({ breadcrumb: 'page1_1Crumb' }),
            Component: Breadcrumbs,
          },
        ],
        Component: Breadcrumbs,
      },
    ]);

    await act(() => render(<RoutesStub initialEntries={['/page1/page1_1']} />));

    const breadcrumbs = screen.getByRole('navigation', {
      name: 'divaClient_breadcrumbText',
    });
    within(breadcrumbs).getByRole('link', { name: 'page1_1Crumb' });
  });

  it('renders publication breadcrumbs', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/diva-output/:recordId',
        id: 'routes/divaOutput/divaOutputView',
        loader: () => ({ breadcrumb: 'Lorem ipsum' }),
        Component: Breadcrumbs,
      },
    ]);

    await act(() =>
      render(<RoutesStub initialEntries={['/diva-output/12345']} />),
    );

    const breadcrumbs = screen.getByRole('navigation', {
      name: 'divaClient_breadcrumbText',
    });
    within(breadcrumbs).getByRole('link', { name: 'diva-outputText' });
    within(breadcrumbs).getByRole('link', { name: 'Lorem ipsum' });
  });

  it('Can take the user back to home page', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/page1',
        loader: () => ({ breadcrumb: 'page1Crumb' }),
        children: [
          {
            path: 'page1_1',
            loader: () => ({ breadcrumb: 'page1_1Crumb' }),
            Component: Breadcrumbs,
          },
        ],
        Component: Breadcrumbs,
      },
    ]);

    await act(() => render(<RoutesStub initialEntries={['/page1/page1_1']} />));

    expect(
      screen.getByRole('link', { name: 'divaClient_breadcrumbStartText' }),
    ).toHaveAttribute('href', '/');
  });

  it('Renders steps as breadcrumbs', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/page1',
        loader: () => ({ breadcrumb: 'page1Crumb' }),
        children: [
          {
            path: 'page1_1',
            loader: () => ({ breadcrumb: 'page1_1Crumb' }),
            Component: Breadcrumbs,
          },
        ],
        Component: Breadcrumbs,
      },
      {
        path: '/page2',
        loader: () => ({ breadcrumb: 'page2Crumb' }),
        Component: Breadcrumbs,
      },
    ]);

    await act(() => render(<RoutesStub initialEntries={['/page1/page1_1']} />));

    const breadcrumbs = screen.getByRole('navigation', {
      name: 'divaClient_breadcrumbText',
    });

    within(breadcrumbs).getByRole('link', { name: 'page1Crumb' });

    within(breadcrumbs).getByRole('link', { name: 'page1_1Crumb' });

    expect(
      within(breadcrumbs).queryByRole('link', { name: 'page2Crumb' }),
    ).not.toBeInTheDocument();
  });

  it('Only renders matches that has a breadcrumb', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/page1',
        loader: () => ({ breadcrumb: 'page1Crumb' }),
        Component: Breadcrumbs,
        children: [
          {
            path: 'page1_1',
            loader: () => ({}),
            Component: Breadcrumbs,
            children: [
              {
                path: 'page1_1_1',
                loader: () => ({ breadcrumb: 'page1_1_1Crumb' }),
                Component: Breadcrumbs,
              },
            ],
          },
        ],
      },
    ]);

    await act(() =>
      render(<RoutesStub initialEntries={['/page1/page1_1/page1_1_1']} />),
    );

    const breadcrumbs = screen.getByRole('navigation', {
      name: 'divaClient_breadcrumbText',
    });

    expect(within(breadcrumbs).getAllByRole('link')).toHaveLength(3);
    within(breadcrumbs).getByRole('link', { name: 'page1Crumb' });

    expect(
      within(breadcrumbs).queryByRole('link', { name: 'page1_1Crumb' }),
    ).not.toBeInTheDocument();

    within(breadcrumbs).getByRole('link', { name: 'page1_1_1Crumb' });
  });

  it('scrolls to top when a breadcrumb link is clicked', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/page1',
        loader: () => ({ breadcrumb: 'page1Crumb' }),
        children: [
          {
            path: 'page1_1',
            loader: () => ({ breadcrumb: 'page1_1Crumb' }),
            Component: Breadcrumbs,
          },
        ],
        Component: Breadcrumbs,
      },
    ]);

    const scrollToSpy = vi
      .spyOn(window, 'scrollTo')
      .mockImplementation(() => undefined);

    await act(() => render(<RoutesStub initialEntries={['/page1/page1_1']} />));

    await userEvent.click(
      screen.getByRole('link', { name: 'divaClient_breadcrumbStartText' }),
    );

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    scrollToSpy.mockRestore();
  });
});
