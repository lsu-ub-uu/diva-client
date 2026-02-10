import { useDebouncedCallback } from '@/utils/useDebouncedCallback';
import { useRef, useState } from 'react';
import { useSubmit } from 'react-router';
import { Filters } from './Filters';
import { RecordSearchView } from './RecordSearchView';
import type { SearchFormDefinition } from '@/routes/record/recordSearch/utils/createSearchFormDefinition.server';
import type { ActiveFilter } from '../utils/createActiveFilters.server';

interface SearchLayoutProps {
  query: string;
  searchFormDefinition: SearchFormDefinition;
  searching: boolean;
  searchResults: any;
  rows: number;
  start: number;
  activeFilters: ActiveFilter[];
  apiUrl: string;
  onQueryChange: (form: HTMLFormElement) => void;
  onClearMainQuery: () => void;
  onRemoveFilter: (filterName: string) => void;
  onClearAllFilters: () => void;
  children?: React.ReactNode;
}

export const SearchLayout = ({
  query,
  searchFormDefinition,
  searching,
  searchResults,
  rows,
  start,
  activeFilters,
  apiUrl,
  onQueryChange,
  onClearMainQuery,
  onRemoveFilter,
  onClearAllFilters,
  children,
}: SearchLayoutProps) => {
  const submit = useSubmit();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterFormRef = useRef<HTMLFormElement>(null);

  const handleFilterChange = useDebouncedCallback(() => {
    if (filterFormRef.current) {
      const formData = new FormData(filterFormRef.current);

      for (const [key, value] of Array.from(formData.entries())) {
        if (typeof value === 'string' && value.trim() === '') {
          formData.delete(key);
        }
      }
      submit(formData, { method: 'GET' });
    }
  }, 400);

  return (
    <div className='grid'>
      <div className='grid-col-12'>{children}</div>
      <main className='grid-col-9 grid-col-l-12 search-main'>
        <RecordSearchView
          query={query}
          onQueryChange={onQueryChange}
          mainSearchTerm={searchFormDefinition.mainSearchTerm}
          searching={searching}
          onClearMainQuery={onClearMainQuery}
          searchResults={searchResults}
          rows={rows}
          start={start}
          activeFilters={activeFilters}
          onRemoveFilter={onRemoveFilter}
          onClearAllFilters={onClearAllFilters}
          filtersOpen={filtersOpen}
          setFiltersOpen={setFiltersOpen}
          apiUrl={apiUrl}
        />
      </main>
      <div className='grid-col-3'>
        <Filters
          open={filtersOpen}
          ref={filterFormRef}
          filters={searchFormDefinition.filters}
          activeFilters={activeFilters}
          query={query}
          rows={rows}
          onFilterChange={handleFilterChange}
          onClose={() => setFiltersOpen(false)}
        />
      </div>
    </div>
  );
};
