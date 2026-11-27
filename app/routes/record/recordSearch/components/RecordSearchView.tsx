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
  searchParamsString: string;
}

export const RecordSearchView = ({
  searchView,
  searchParamsString,
}: RecordSearchViewProps) => {
  const {
    searchFormDefinition,
    query,
    start,
    rows,
    searchResults,
    activeFilters,
    validationErrors,
    apiUrl,
    defaultFilters,
  } = searchView;

  const searchParams = new URLSearchParams(searchParamsString);
  const isDefaultFilterCleared = (filterName: string) =>
    searchParams.get(filterName) === '';

  const clearedDefaultFilters = Object.keys(defaultFilters).filter(
    isDefaultFilterCleared,
  );

  const submit = useSubmit();
  const navigation = useNavigation();
  const { showDrawerDialog, closeDrawerDialog, drawerDialogRef } =
    useDrawerDialog();

  const searching = Boolean(
    navigation.state !== 'idle' &&
    navigation.formAction?.includes(location.pathname),
  );

  const handleQueryChange = useDebouncedCallback(
    (form: HTMLFormElement) => submit(form, { replace: true }),
    400,
  );

  const handleRemoveFilter = (filterName: string) => {
    const formData = new FormData();
    const searchParams = new URLSearchParams(searchParamsString);

    for (const [key, value] of searchParams.entries()) {
      if (key !== filterName && key !== 'start') {
        formData.append(key, value);
      }
    }

    if (defaultFilters[filterName]) {
      formData.append(filterName, '');
    }

    submit(formData, { method: 'GET', replace: true });
  };

  const isDefaultFilterActiveOrCleared = (filterName: string) =>
    activeFilters.some((f) => f.name === filterName) ||
    isDefaultFilterCleared(filterName);

  const handleClearAllFilters = () => {
    const formData = new FormData();
    formData.append('q', query);
    formData.append('rows', rows.toString());

    for (const filterName of Object.keys(defaultFilters)) {
      if (isDefaultFilterActiveOrCleared(filterName)) {
        formData.append(filterName, '');
      }
    }

    submit(formData, { method: 'GET', replace: true });
  };

  const handleClearMainQuery = () => {
    const formData = new FormData();

    formData.append('rows', rows.toString());

    activeFilters.forEach((filter) => {
      formData.append(filter.name, filter.value);
    });

    for (const filterName of Object.keys(defaultFilters)) {
      if (isDefaultFilterActiveOrCleared(filterName)) {
        formData.append(filterName, '');
      }
    }

    submit(formData, { method: 'GET', replace: true });
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
          clearedDefaultFilters={clearedDefaultFilters}
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
          defaultFilters={defaultFilters}
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
          defaultFilters={defaultFilters}
        />
      </DrawerDialog>
    </>
  );
};
