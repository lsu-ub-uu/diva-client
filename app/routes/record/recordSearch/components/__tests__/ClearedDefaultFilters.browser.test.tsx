import { createRoutesStub, useLocation } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import type { SearchView } from '../../utils/loadSearchView.server';
import { RecordSearchView } from '../RecordSearchView';

const searchView: SearchView = {
  searchId: 'search',
  searchFormDefinition: {
    searchRootName: 'search',
    mainSearchTerm: {
      id: 'query',
      name: 'q',
      type: 'text',
      labelTextId: 'Search',
      placeholderTextId: undefined,
      repeat: { repeatMin: 0, repeatMax: 1 },
      regEx: '.*',
    },
    filters: [],
  },
  query: '',
  start: 1,
  rows: 20,
  searchResults: {
    data: [],
    fromNo: 0,
    toNo: 0,
    totalNo: 0,
    containDataOfType: 'mixed',
  },
  activeFilters: [{ name: 'active', value: 'selected', textId: 'Active' }],
  validationErrors: new Map(),
  apiUrl: '',
  defaultFilters: {
    cleared: 'default',
    another: 'default',
    active: 'default',
    absent: 'default',
  },
};

describe('cleared default filters', () => {
  it('preserves cleared defaults when the search query changes', async () => {
    const loader = vi.fn(({ request }: { request: Request }) => request.url);
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        loader,
        Component: () => (
          <RecordSearchView
            searchView={searchView}
            searchParamsString={useLocation().search}
          />
        ),
      },
    ]);

    const screen = await render(
      <RoutesStub initialEntries={['/?cleared=&another=&active=selected']} />,
    );
    await screen.getByRole('searchbox', { name: 'Search' }).fill('example');

    await vi.waitFor(() => {
      const url = loader.mock.results.at(-1)?.value;
      expect(url).toBeDefined();
      if (!url) throw new Error('Search was not submitted');
      const params = new URL(url).searchParams;
      expect(params.get('q')).toBe('example');
      expect(params.getAll('cleared')).toEqual(['']);
      expect(params.getAll('another')).toEqual(['']);
      expect(params.getAll('active')).toEqual(['selected']);
      expect(params.has('absent')).toBe(false);
    });
  });

  it('preserves cleared defaults when changing page or page size', async () => {
    const loader = vi.fn(({ request }: { request: Request }) => request.url);
    const viewWithResults: SearchView = {
      ...searchView,
      searchResults: {
        ...searchView.searchResults,
        data: [
          {
            id: '1',
            recordType: 'record',
            validationType: 'record',
            data: {},
            actionLinks: {},
          },
        ],
        fromNo: 1,
        toNo: 20,
        totalNo: 40,
      },
      validationErrors: new Map([['q', 'error']]),
    };
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        loader,
        Component: () => (
          <RecordSearchView
            searchView={viewWithResults}
            searchParamsString={useLocation().search}
          />
        ),
      },
    ]);

    const screen = await render(
      <RoutesStub initialEntries={['/?cleared=&active=selected']} />,
    );
    const rowSelects = screen.getByRole('combobox', {
      name: 'divaClient_paginationRowsPerPageText',
    });
    await rowSelects.first().selectOptions('40');
    await vi.waitFor(() => {
      const url = loader.mock.results.at(-1)?.value;
      expect(url).toBeDefined();
      if (!url) throw new Error('Page size was not submitted');
      const params = new URL(url).searchParams;
      expect(params.get('rows')).toBe('40');
      expect(params.getAll('cleared')).toEqual(['']);
      expect(params.getAll('active')).toEqual(['selected']);
    });

    await screen
      .getByRole('button', { name: 'divaClient_paginationNextPageText' })
      .last()
      .click();
    await vi.waitFor(() => {
      const url = loader.mock.results.at(-1)?.value;
      expect(url).toBeDefined();
      if (!url) throw new Error('Page was not submitted');
      const params = new URL(url).searchParams;
      expect(params.get('start')).toBe('21');
      expect(params.getAll('cleared')).toEqual(['']);
      expect(params.getAll('active')).toEqual(['selected']);
    });
  });
});
