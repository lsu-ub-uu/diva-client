import { IconButton } from '@/components/IconButton/IconButton';
import { XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ActiveFilter } from '../utils/createActiveFilters.server';
import styles from './ActiveFilters.module.css';

interface ActiveFiltersProps {
  activeFilters: ActiveFilter[];
  onRemoveFilter: (name: string) => void;
}

export const ActiveFilters = ({
  activeFilters,
  onRemoveFilter,
}: ActiveFiltersProps) => {
  const { t } = useTranslation();

  const hasActiveFilters = activeFilters.length > 0;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className={styles['active-filters']}>
      <h2>{t('divaClient_activeFiltersText')}</h2>
      <ul>
        {activeFilters.map((filter) => (
          <li
            key={filter.name}
            className={styles['active-filter']}
            aria-label={t(filter.textId)}
          >
            <div className={styles['active-filter-texts']}>
              <div className={styles['active-filter-name']}>
                {t(filter.textId)}:
              </div>
              <div className={styles['active-filter-value']}>
                &quot;
                {filter.valueTextId ? t(filter.valueTextId) : filter.value}
                &quot;
              </div>
            </div>

            <IconButton
              tooltip={t('divaClient_filterRemoveText')}
              size='small'
              type='submit'
              onClick={() => onRemoveFilter(filter.name)}
            >
              <XIcon />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
};
