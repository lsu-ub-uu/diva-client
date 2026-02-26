import {
  DrawerDialog,
  useDrawerDialog,
} from '@/components/DrawerDialog/DrawerDialog';
import type { SearchFormDefinition } from '@/routes/record/recordSearch/utils/createSearchFormDefinition.server';
import type { ActiveFilter } from '../utils/createActiveFilters.server';
import { Filters } from './Filters';
import { RecordSearchView } from './RecordSearchView';

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
  userRights: string[];
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
  userRights,
}: SearchLayoutProps) => {
  const { showDrawerDialog, closeDrawerDialog, drawerDialogRef } =
    useDrawerDialog();

  return (
    <div className='grid'>
      <div className='grid-col-12'>{children}</div>

      {userRights.includes('search') && (
        <>
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
              apiUrl={apiUrl}
              showFilterDialog={showDrawerDialog}
            />
          </main>
          <div className='grid-col-3 grid-col-l-hidden'>
            <Filters
              filters={searchFormDefinition.filters}
              activeFilters={activeFilters}
              query={query}
              rows={rows}
              onClose={closeDrawerDialog}
            />
          </div>
          <DrawerDialog
            ref={drawerDialogRef}
            variant='right'
            className='filter-dialog'
          >
            <Filters
              filters={searchFormDefinition.filters}
              activeFilters={activeFilters}
              query={query}
              rows={rows}
              onClose={closeDrawerDialog}
            />
          </DrawerDialog>
        </>
      )}
    </div>
  );
};
