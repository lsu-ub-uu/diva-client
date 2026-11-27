import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Filters } from '../Filters';
import { createRoutesStub } from 'react-router';
import type { FilterDefinition } from '../../../utils/createFilterDefinition.server';
import type { ActiveFilter } from '../../../utils/createActiveFilters.server';
import { userEvent } from '@testing-library/user-event/dist/cjs/setup/index.js';
import { act } from 'react';

vi.mock('@/utils/useDebouncedCallback', () => ({
  useDebouncedCallback: (callback: () => void) => callback,
}));

describe('Filters', () => {
  it('renders filters and handles changes', async () => {
    const user = userEvent.setup();
    const loaderSpy = vi.fn().mockResolvedValue({});
    const filters: FilterDefinition[] = [
      {
        id: 'filter1',
        name: 'Filter 1',
        labelTextId: 'Filter1Text',
        type: 'text',
        placeholderTextId: 'Filter1Placeholder',
        repeat: { repeatMin: 0, repeatMax: 1 },
        regEx: '.*',
      },
    ];
    const activeFilters: ActiveFilter[] = [];
    const query = '';
    const rows = 10;
    const defaultFilters: Record<string, string> = {};
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        loader: loaderSpy,
        Component: () => (
          <Filters
            filters={filters}
            activeFilters={activeFilters}
            query={query}
            rows={rows}
            onClose={vi.fn()}
            validationErrors={new Map()}
            defaultFilters={defaultFilters}
          />
        ),
      },
    ]);

    await act(() => render(<RoutesStub />));

    await user.type(screen.getByRole('textbox', { name: 'Filter1Text' }), 't');

    await waitFor(() => {
      expect(loaderSpy).toHaveBeenCalled();
    });
  });

  it('removes empty filter params from the submitted URL', async () => {
    const user = userEvent.setup();
    const loaderSpy = vi.fn().mockResolvedValue({});
    const filters: FilterDefinition[] = [
      {
        id: 'filter1',
        name: 'filter1',
        labelTextId: 'Filter1Text',
        type: 'text',
        placeholderTextId: 'Filter1Placeholder',
        repeat: { repeatMin: 0, repeatMax: 1 },
        regEx: '.*',
      },
    ];
    const defaultFilters: Record<string, string> = {};
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        loader: loaderSpy,
        Component: () => (
          <Filters
            filters={filters}
            activeFilters={[]}
            query=''
            rows={10}
            onClose={vi.fn()}
            validationErrors={new Map()}
            defaultFilters={defaultFilters}
          />
        ),
      },
    ]);

    await act(() => render(<RoutesStub />));

    const input = screen.getByRole('textbox', { name: 'Filter1Text' });
    await user.type(input, 'published');
    await user.clear(input);

    await waitFor(() => {
      const request = loaderSpy.mock.calls.at(-1)?.[0].request as Request;
      const searchParams = new URL(request.url).searchParams;
      expect(searchParams.get('filter1')).toBeNull();
      expect(searchParams.has('clearDefaultFilter')).toBe(false);
    });
  });
});
