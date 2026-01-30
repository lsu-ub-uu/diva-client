import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchLayout } from '../SearchLayout';
import type { ActiveFilter } from '../ActiveFilters';
import { createRoutesStub } from 'react-router';

describe('SearchLayout', () => {
  it('renders a form', () => {
    const query = '';
    const activeFilters = [] as ActiveFilter[];
    const mainSearchTerm = {
      nameInData: 'genericSearchTerm',
      regEx: '.+',
      id: 'genericSearchTextVar',
      type: 'textVariable',
      textId: 'genericSearchTextVarText',
      defTextId: 'genericSearchTextVarDefText',
    };
    const rows = 10;
    const starts = 0;
    const searching = false;
    const searchResults = {
      fromNo: 1,
      toNo: 0,
      totalNo: 0,
      containDataOfType: 'mix',
      data: [],
    };
    const filters = [
      {
        id: 'searchRecordIdTextVar',
        name: 'recordIdSearchTerm',
        textId: 'searchRecordIdTextVarText',
        placeholderTextId: 'searchRecordIdTextVarDefText',
        type: 'text',
      },
    ];

    const onQueryChange = vi.fn();
    const onClearMainQuery = vi.fn();
    const onRemoveFilter = vi.fn();
    const onClearAllFilters = vi.fn();

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <SearchLayout
            query={query}
            mainSearchTerm={mainSearchTerm}
            searching={searching}
            searchResults={searchResults}
            rows={rows}
            start={starts}
            filters={filters}
            activeFilters={activeFilters}
            onQueryChange={onQueryChange}
            onClearMainQuery={onClearMainQuery}
            onRemoveFilter={onRemoveFilter}
            onClearAllFilters={onClearAllFilters}
            apiUrl=''
          />
        ),
      },
    ]);

    render(<RoutesStub />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });
});
