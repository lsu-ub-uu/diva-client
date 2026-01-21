import { useDebouncedCallback } from '@/utils/useDebouncedCallback';
import { useRef, useState } from 'react';
import { useSubmit } from 'react-router';
import type { ActiveFilter } from './ActiveFilters';
import { Filters } from './Filters';
import { RecordSearchView } from './RecordSearchView';

interface SearchLayoutProps {
  query: string;
  mainSearchTerm: any;
  searching: boolean;
  searchResults: any;
  rows: number;
  start: number;
  filters: any;
  activeFilters: ActiveFilter[];
  onQueryChange: (form: HTMLFormElement) => void;
  onClearMainQuery: () => void;
  onRemoveFilter: (filterName: string) => void;
  onClearAllFilters: () => void;
  children?: React.ReactNode;
}

export const SearchLayout = ({
  query,
  mainSearchTerm,
  searching,
  searchResults,
  rows,
  start,
  filters,
  activeFilters,
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
    <div className='search-layout'>
      <main className='search-main'>
        {children}
        <RecordSearchView
          query={query}
          onQueryChange={onQueryChange}
          mainSearchTerm={mainSearchTerm}
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
        />
      </main>
      <Filters
        open={filtersOpen}
        ref={filterFormRef}
        filters={filters}
        activeFilters={activeFilters}
        query={query}
        start={start}
        rows={rows}
        onFilterChange={handleFilterChange}
        onClose={() => setFiltersOpen(false)}
      />
    </div>
  );
};
