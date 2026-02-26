import { IconButton } from '@/components/IconButton/IconButton';
import type { FilterDefinition } from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import { useDebouncedCallback } from '@/utils/useDebouncedCallback';
import { FunnelIcon, XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Form, useSubmit } from 'react-router';
import type { ActiveFilter } from '../utils/createActiveFilters.server';
import { Filter } from './Filter';
import { SearchHiddenInputs } from './SearchHiddenInputs';
import { useRef } from 'react';

interface FiltersProps {
  filters: FilterDefinition[];
  activeFilters: ActiveFilter[];
  query: string;
  rows: number;
  onClose: () => void;
}

export const Filters = ({
  filters,
  activeFilters,
  query,
  rows,
  onClose,
}: FiltersProps) => {
  const { t } = useTranslation();
  const submit = useSubmit();
  const formRef = useRef<HTMLFormElement>(null);

  const handleFilterChange = useDebouncedCallback(() => {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);

    for (const [key, value] of Array.from(formData.entries())) {
      if (typeof value === 'string' && value.trim() === '') {
        formData.delete(key);
      }
    }
    submit(formData, { method: 'GET' });
  }, 400);

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
        <Form method='GET' onChange={handleFilterChange} ref={formRef}>
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
                forceSubmit={() => handleFilterChange}
              />
            );
          })}
        </Form>
      </div>
    </div>
  );
};
