import { Form } from 'react-router';
import { MainSearchInput } from './MainSearchInput';
import { Pagination } from './Pagination';
import { ActiveFilters, type ActiveFilter } from './ActiveFilters';
import { SearchResults } from './SearchResults';
import { Alert, AlertTitle } from '@/components/Alert/Alert';
import { SearchSlashIcon } from 'lucide-react';
import type { BFFSearchResult } from '@/types/record';
import type { BFFMetadata } from '@/cora/transform/bffTypes.server';
import { useTranslation } from 'react-i18next';

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
  userHasSearched: boolean;
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
  userHasSearched,
}: RecordSearchViewProps) => {
  const { t } = useTranslation();
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
        {searchResults.totalNo > 0 && (
          <div className='pagination'>
            <Pagination rowsPerPage={rows} searchResults={searchResults} />
          </div>
        )}
        {activeFilters.map((filter) => (
          <input
            key={filter.name}
            type='hidden'
            name={filter.name}
            value={filter.value}
          />
        ))}
      </Form>

      {activeFilters.length > 0 && (
        <ActiveFilters
          activeFilters={activeFilters}
          onRemoveFilter={onRemoveFilter}
          onClearAllFilters={onClearAllFilters}
        />
      )}

      {userHasSearched && searchResults.totalNo === 0 && (
        <Alert severity='info' icon={<SearchSlashIcon />}>
          <AlertTitle>{t('divaClient_noSearchResultsTitleText')}</AlertTitle>
          {t('divaClient_noSearchResultsBodyText')}
        </Alert>
      )}

      <SearchResults
        searchResults={searchResults}
        start={start}
        searching={searching}
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
    </>
  );
};
