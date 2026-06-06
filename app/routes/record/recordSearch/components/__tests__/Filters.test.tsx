import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Filters } from '../Filters';
import { createRoutesStub } from 'react-router';
import type { FilterDefinition } from '../../utils/createFilterDefinition.server';
import type { ActiveFilter } from '../../utils/createActiveFilters.server';
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
        textId: 'Filter1Text',
        type: 'text',
        placeholderTextId: 'Filter1Placeholder',
        repeat: { repeatMin: 0, repeatMax: 1 },
        regEx: '.*',
      },
    ];
    const activeFilters: ActiveFilter[] = [];
    const query = '';
    const rows = 10;
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
});
