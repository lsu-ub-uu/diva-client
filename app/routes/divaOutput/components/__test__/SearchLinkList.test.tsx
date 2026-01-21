import { describe, expect, it } from 'vitest';
import { SearchLinkList } from '../SearchLinkList';
import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';

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
