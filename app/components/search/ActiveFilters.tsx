import { XIcon } from 'lucide-react';
import { IconButton } from '../IconButton/IconButton';
import { useTranslation } from 'react-i18next';
import styles from './ActiveFilters.module.css';

export interface ActiveFilter {
  name: string;
  value: string;
  textId: string;
  valueTextId?: string;
}

interface ActiveFiltersProps {
  activeFilters: ActiveFilter[];
  handleRemoveFilter: (name: string) => void;
}

export const ActiveFilters = ({
  activeFilters,
  handleRemoveFilter,
}: ActiveFiltersProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles['active-filters']}>
      <div>Aktiva filter: </div>

      {activeFilters.map((filter) => (
        <div key={filter.name} className={styles['active-filter']}>
          <div className={styles['active-filter-texts']}>
            <div className={styles['active-filter-name']}>
              {t(filter.textId)}:
            </div>
            <div className={styles['active-filter-value']}>
              &quot;{filter.valueTextId ? t(filter.valueTextId) : filter.value}
              &quot;
            </div>
          </div>

          <IconButton
            tooltip='Ta bort filter'
            size='small'
            type='submit'
            onClick={() => handleRemoveFilter(filter.name)}
            className='active-filter-remove-button'
          >
            <XIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
};
