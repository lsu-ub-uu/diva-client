import type { FilterDefinition } from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import { FunnelIcon, XIcon } from 'lucide-react';
import type { Ref } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-router';
import type { ActiveFilter } from '../utils/createActiveFilters.server';
import { Filter } from './Filter';
import { SearchHiddenInputs } from './SearchHiddenInputs';
import { IconButton } from '@/components/IconButton/IconButton';

interface FiltersProps {
  ref: Ref<HTMLFormElement>;
  filters: FilterDefinition[];
  activeFilters: ActiveFilter[];
  query: string;
  rows: number;
  onFilterChange: () => void;
  onClose: () => void;
}

export const Filters = ({
  ref,
  filters,
  activeFilters,
  query,
  rows,
  onFilterChange,
  onClose,
}: FiltersProps) => {
  const { t } = useTranslation();

  if (filters.length === 0) {
    return null;
  }

  return (
    <div className='filters'>
      <div className='filters-content desktop-filters'>
        <div className='filters-header'>
          <h2>
            <FunnelIcon /> {t('divaClient_filterTitleText')}
          </h2>
          <IconButton
            onClick={onClose}
            tooltip={t('divaClient_closeFiltersText')}
            className='filter-dialog-close-button'
          >
            <XIcon />
          </IconButton>
        </div>
        <Form method='GET' onChange={onFilterChange} ref={ref}>
          <SearchHiddenInputs query={query} rows={rows} start={1} />
          {filters.map((filter) => {
            const activeFilter = activeFilters.find(
              (f) => f.name === filter.name,
            );
            return (
              <Filter
                filter={filter}
                key={filter.id}
                currentValue={activeFilter?.value}
                currentValueText={activeFilter?.valueTextId}
                forceSubmit={onFilterChange}
              />
            );
          })}
        </Form>
      </div>
    </div>
  );
};
