import { FunnelIcon, XIcon } from 'lucide-react';
import { Form } from 'react-router';
import { Filter } from './Filter';
import type { Ref } from 'react';
import type { FilterDefinition } from '@/data/search/createFilterDefinition.server';
import type { ActiveFilter } from './ActiveFilters';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@/components/IconButton/IconButton';
import { SearchHiddenInputs } from './SearchHiddenInputs';

interface FiltersProps {
  open: boolean;
  ref: Ref<HTMLFormElement>;
  filters: FilterDefinition[];
  activeFilters: ActiveFilter[];
  query: string;
  rows: number;
  onFilterChange: () => void;
  onClose: () => void;
}

export const Filters = ({
  open,
  ref,
  filters,
  activeFilters,
  query,
  rows,
  onFilterChange,
  onClose,
}: FiltersProps) => {
  const { t } = useTranslation();
  return (
    <aside className='filters' data-open={open}>
      <button className='filters-backdrop' onClick={onClose} />
      <div className='filters-content'>
        <div className='filters-header'>
          <h2>
            <FunnelIcon /> {t('divaClient_filterTitleText')}
          </h2>
          <IconButton tooltip={t('divaClient_closeText')} onClick={onClose}>
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
                currentValue={activeFilter?.value1}
                currentValueText={activeFilter?.valueTextId}
                forceSubmit={onFilterChange}
              />
            );
          })}
        </Form>
      </div>
    </aside>
  );
};
