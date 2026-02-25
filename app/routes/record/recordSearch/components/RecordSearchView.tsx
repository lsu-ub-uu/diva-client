import type { BFFMetadata } from '@/cora/transform/bffTypes.server';
import type { BFFSearchResult } from '@/types/record';
import { Form } from 'react-router';
import type { ActiveFilter } from '../utils/createActiveFilters.server';
import { ActiveFilters } from './ActiveFilters';
import { MainSearchInput } from './MainSearchInput';
import { Pagination } from './Pagination';
import { SearchHiddenInputs } from './SearchHiddenInputs';
import { SearchResultButtons } from './SearchResultButtons';
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
  showFilterDialog: () => void;
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
  showFilterDialog,
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

      <SearchResultButtons
        searchResults={searchResults}
        apiUrl={apiUrl}
        activeFilters={activeFilters}
        onClearAllFilters={onClearAllFilters}
        showFilterDialog={showFilterDialog}
      />

      <ActiveFilters
        activeFilters={activeFilters}
        onRemoveFilter={onRemoveFilter}
      />

      {searchResults.data.length > 0 && (
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

      {searchResults.data.length > 0 && (
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
