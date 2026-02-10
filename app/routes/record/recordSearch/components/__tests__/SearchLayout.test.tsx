import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchLayout } from '../SearchLayout';
import { createRoutesStub } from 'react-router';
import type { SearchFormDefinition } from '../../utils/createSearchFormDefinition.server';
import type { ActiveFilter } from '../../utils/createActiveFilters.server';
import type { BFFMetadataTextVariable } from '@/cora/transform/bffTypes.server';
import type { FilterDefinition } from '../../utils/createFilterDefinition.server';

describe('SearchLayout', () => {
  it('renders a form', () => {
    const query = '';
    const activeFilters = [] as ActiveFilter[];
    const mainSearchTerm: BFFMetadataTextVariable = {
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
    const filters: FilterDefinition[] = [
      {
        id: 'searchRecordIdTextVar',
        name: 'recordIdSearchTerm',
        textId: 'searchRecordIdTextVarText',
        placeholderTextId: 'searchRecordIdTextVarDefText',
        type: 'text',
      },
    ];

    const searchFormDefinition: SearchFormDefinition = {
      searchRootName: 'search',
      mainSearchTerm,
      filters,
    };

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
            searchFormDefinition={searchFormDefinition}
            searching={searching}
            searchResults={searchResults}
            rows={rows}
            start={starts}
            activeFilters={activeFilters}
            onQueryChange={onQueryChange}
            onClearMainQuery={onClearMainQuery}
            onRemoveFilter={onRemoveFilter}
            onClearAllFilters={onClearAllFilters}
            apiUrl=''
            userRights={['search']}
          />
        ),
      },
    ]);

    render(<RoutesStub />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });
});
