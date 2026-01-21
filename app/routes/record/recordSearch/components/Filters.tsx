import { FunnelIcon } from 'lucide-react';
import { Form } from 'react-router';
import { Filter } from './Filter';
import type { Ref } from 'react';
import type { FilterType } from '@/data/search/createFilterDefinition.server';
import type { ActiveFilter } from './ActiveFilters';
import { useTranslation } from 'react-i18next';

interface FiltersProps {
  ref: Ref<HTMLFormElement>;
  filters: FilterType[];
  activeFilters: ActiveFilter[];
  query: string;
  start: number;
  rows: number;
  onFilterChange: () => void;
}

export const Filters = ({
  ref,
  filters,
  activeFilters,
  query,
  start,
  rows,
  onFilterChange,
}: FiltersProps) => {
  const { t } = useTranslation();
  return (
    <div className='filters'>
      <h2>
        <FunnelIcon /> {t('divaClient_filterTitleText')}
      </h2>
      <Form method='GET' onChange={onFilterChange} ref={ref}>
        <input type='hidden' name='q' value={query} />
        <input type='hidden' name='start' value={start} />
        <input type='hidden' name='rows' value={rows} />
        {filters.map((filter) => {
          const value = activeFilters.find(
            (f) => f.name === filter.name,
          )?.value;
          return (
            <Filter
              filter={filter}
              key={filter.id}
              currentValue={value}
              forceSubmit={onFilterChange}
            />
          );
        })}
      </Form>
    </div>
  );
};
