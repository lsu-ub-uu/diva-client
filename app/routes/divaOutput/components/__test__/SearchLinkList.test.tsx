import { describe, expect, it } from 'vitest';
import { SearchLinkList } from '../SearchLinkList';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import { vi } from 'vitest';

describe('SearchLinkList', () => {
  it('renders links with href as pill', () => {
    const items = [
      {
        href: 'someLink',
        label: 'Some label',
      },
    ];

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        id: 'root',
        Component: () => (
          <SearchLinkList
            heading='Some heading'
            searchTerm='someSearchTerm'
            items={items}
            language='en'
            pill={true}
          />
        ),
      },
      {
        path: '/diva-person/:id',
      },
    ]);

    render(<RoutesStub />);

    expect(
      screen.getByRole('heading', { name: 'Some heading' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Some label' })).toHaveAttribute(
      'href',
      `/diva-output?someSearchTerm=${items[0].href}`,
    );
    expect(screen.getByRole('link', { name: 'Some label' })).toHaveAttribute(
      'rel',
      'nofollow',
    );
  });

  it('scrolls to top when clicking a rendered link', async () => {
    const items = [
      {
        href: 'someLink',
        label: 'Some label',
      },
    ];

    const scrollToSpy = vi
      .spyOn(window, 'scrollTo')
      .mockImplementation(() => undefined);

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        id: 'root',
        Component: () => (
          <SearchLinkList
            heading='Some heading'
            searchTerm='someSearchTerm'
            items={items}
            language='en'
            pill={true}
          />
        ),
      },
      {
        path: '/diva-output',
      },
    ]);

    render(<RoutesStub />);

    await userEvent.click(screen.getByRole('link', { name: 'Some label' }));

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    scrollToSpy.mockRestore();
  });

  it('renders links without href as pill', () => {
    const items = [
      {
        label: 'Some label',
      },
    ];
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        id: 'root',
        Component: () => (
          <SearchLinkList
            heading='Some heading'
            searchTerm='someSearchTerm'
            items={items}
            language='en'
            pill={true}
          />
        ),
      },
      {
        path: '/diva-person/:id',
      },
    ]);

    render(<RoutesStub />);

    expect(
      screen.getByRole('heading', { name: 'Some heading' }), // a
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Some label' }),
    ).not.toBeInTheDocument();
  });
});
