import type { BFFMetadata } from '@/cora/transform/bffTypes.server';
import type { BFFSearchResult } from '@/types/record';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-router';
import { ActiveFilters, type ActiveFilter } from './ActiveFilters';
import { MainSearchInput } from './MainSearchInput';
import { Pagination } from './Pagination';
import { SearchHiddenInputs } from './SearchHiddenInputs';
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
  apiUrl: string;
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
  apiUrl,
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
        <SearchHiddenInputs
          rows={rows}
          start={1}
          activeFilters={activeFilters}
        />
      </Form>

      <ActiveFilters
        activeFilters={activeFilters}
        onRemoveFilter={onRemoveFilter}
        onClearAllFilters={onClearAllFilters}
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
        apiUrl={apiUrl}
      />

      {searchResults.totalNo > 0 && (
        <Pagination
          rowsPerPage={rows}
          searchResults={searchResults}
          start={start}
          query={query}
          onQueryChange={onQueryChange}
          activeFilters={activeFilters}
        />
      )}

      <SearchResults
        searchResults={searchResults}
        start={start}
        searching={searching}
        userHasSearched={query.length > 0 || activeFilters.length > 0}
      />

      {searchResults.totalNo > 0 && (
        <Pagination
          rowsPerPage={rows}
          searchResults={searchResults}
          start={start}
          query={query}
          onQueryChange={onQueryChange}
          activeFilters={activeFilters}
        />
      )}
    </>
  );
};
