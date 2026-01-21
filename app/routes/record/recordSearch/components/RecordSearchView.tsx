import type { BFFMetadata } from '@/cora/transform/bffTypes.server';
import type { BFFSearchResult } from '@/types/record';
import { Form } from 'react-router';
import { ActiveFilters, type ActiveFilter } from './ActiveFilters';
import { MainSearchInput } from './MainSearchInput';
import { Pagination } from './Pagination';
import { SearchResults } from './SearchResults';

interface RecordSearchViewProps {
  query: string;
  onQueryChange: (form: HTMLFormElement) => void;
  mainSearchTerm: BFFMetadata;
  searching: boolean;
  onClearMainQuery: () => void;
  searchResults: BFFSearchResult;
  rows: number;
  start: number;
  activeFilters: ActiveFilter[];
  onRemoveFilter: (name: string) => void;
  onClearAllFilters: () => void;
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
}

export const RecordSearchView = ({
  query,
  onQueryChange,
  mainSearchTerm,
  searching,
  onClearMainQuery,
  searchResults,
  rows,
  start,
  activeFilters,
  onRemoveFilter,
  onClearAllFilters,
  filtersOpen,
  setFiltersOpen,
}: RecordSearchViewProps) => {
  return (
    <>
      <Form
        method='GET'
        onChange={(e) => onQueryChange(e.currentTarget)}
        className='main-query-form'
      >
        <MainSearchInput
          query={query}
          mainSearchTerm={mainSearchTerm}
          searching={searching}
          onClearMainQuery={onClearMainQuery}
        />
        <input type='hidden' name='start' value={start} />
        <input type='hidden' name='rows' value={rows} />
        {activeFilters.map((filter) => (
          <input
            key={filter.name}
            type='hidden'
            name={filter.name}
            value={filter.value}
          />
        ))}
      </Form>

      <ActiveFilters
        activeFilters={activeFilters}
        onRemoveFilter={onRemoveFilter}
        onClearAllFilters={onClearAllFilters}
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
      />

      {searchResults.totalNo > 0 && (
        <Form
          className='pagination'
          method='GET'
          onChange={(e) => onQueryChange(e.currentTarget)}
        >
          <input type='hidden' name='q' value={query} />
          {activeFilters.map((filter) => (
            <input
              key={filter.name}
              type='hidden'
              name={filter.name}
              value={filter.value}
            />
          ))}
          <Pagination rowsPerPage={rows} searchResults={searchResults} />
        </Form>
      )}

      <SearchResults
        searchResults={searchResults}
        start={start}
        searching={searching}
        userHasSearched={query.length > 0 || activeFilters.length > 0}
      />

      {searchResults.totalNo > 0 && (
        <Form method='GET' onChange={(e) => onQueryChange(e.currentTarget)}>
          <input type='hidden' name='q' value={query} />
          {activeFilters.map((filter) => (
            <input
              key={filter.name}
              type='hidden'
              name={filter.name}
              value={filter.value}
            />
          ))}
          <Pagination rowsPerPage={rows} searchResults={searchResults} />
        </Form>
      )}
    </>
  );
};
