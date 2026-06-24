import { useNavigation, useSubmit } from 'react-router';
import type { SearchView } from '../utils/loadSearchView.server';
import { RecordSearchMain } from './RecordSearchMain';
import { useDebouncedCallback } from '@/utils/useDebouncedCallback';
import { Filters } from './Filters/Filters';
import {
  DrawerDialog,
  useDrawerDialog,
} from '@/components/DrawerDialog/DrawerDialog';

interface RecordSearchViewProps {
  searchView: SearchView;
}

export const RecordSearchView = ({ searchView }: RecordSearchViewProps) => {
  const {
    searchFormDefinition,
    query,
    start,
    rows,
    searchResults,
    activeFilters,
    validationErrors,
    apiUrl,
  } = searchView;

  const submit = useSubmit();
  const navigation = useNavigation();
  const { showDrawerDialog, closeDrawerDialog, drawerDialogRef } =
    useDrawerDialog();

  const searching = Boolean(
    navigation.state !== 'idle' &&
    navigation.formAction?.includes(location.pathname),
  );

  const handleQueryChange = useDebouncedCallback(
    (form: HTMLFormElement) => submit(form),
    400,
  );

  const handleRemoveFilter = (filterName: string) => {
    const formData = new FormData();
    formData.append('q', query);
    formData.append('start', start.toString());
    formData.append('rows', rows.toString());
    activeFilters.forEach((filter) => {
      if (filter.name !== filterName) {
        formData.append(filter.name, filter.value);
      }
    });
    submit(formData, { method: 'GET' });
  };

  const handleClearAllFilters = () => {
    const formData = new FormData();
    formData.append('q', query);
    formData.append('start', start.toString());
    formData.append('rows', rows.toString());
    submit(formData, { method: 'GET' });
  };

  const handleClearMainQuery = () => {
    const formData = new FormData();
    formData.append('start', start.toString());
    formData.append('rows', rows.toString());
    activeFilters.forEach((filter) => {
      formData.append(filter.name, filter.value);
    });
    submit(formData, { method: 'GET' });
  };

  return (
    <>
      <main className='grid-col-9 grid-col-l-12 search-main'>
        <RecordSearchMain
          query={query}
          onQueryChange={handleQueryChange}
          mainSearchTerm={searchFormDefinition.mainSearchTerm}
          searching={searching}
          onClearMainQuery={handleClearMainQuery}
          searchResults={searchResults}
          rows={rows}
          start={start}
          activeFilters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
          onClearAllFilters={handleClearAllFilters}
          apiUrl={apiUrl}
          showFilterDialog={showDrawerDialog}
          validationErrors={validationErrors}
        />
      </main>
      <div className='grid-col-3 grid-col-l-hidden'>
        <Filters
          filters={searchFormDefinition.filters}
          activeFilters={activeFilters}
          query={query}
          rows={rows}
          onClose={closeDrawerDialog}
          validationErrors={validationErrors}
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
          validationErrors={validationErrors}
        />
      </DrawerDialog>
    </>
  );
};
