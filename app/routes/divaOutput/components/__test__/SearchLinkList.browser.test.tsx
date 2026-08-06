import { describe, expect, it } from 'vitest';
import { SearchLinkList } from '../SearchLinkList';
import { render } from 'vitest-browser-react';
import { createRoutesStub } from 'react-router';

describe('SearchLinkList', () => {
  it('renders links with href as pill', async () => {
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

    const screen = await render(<RoutesStub />);

    await expect
      .element(screen.getByRole('heading', { name: 'Some heading' }))
      .toBeVisible();
    const link = screen.getByRole('link', { name: 'Some label' }).element();
    expect(link).toHaveAttribute(
      'href',
      `/diva-output?someSearchTerm=${items[0].href}`,
    );
    expect(link).toHaveAttribute('rel', 'nofollow');
  });

  it('renders links without href as pill', async () => {
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

    const screen = await render(<RoutesStub />);

    await expect
      .element(screen.getByRole('heading', { name: 'Some heading' }))
      .toBeVisible();
    expect(
      screen.baseElement.querySelector('a[href*="someSearchTerm"]'),
    ).toBeNull();
  });
});
