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
  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className={styles['active-filters']}>
      <div>{t('divaClient_activeFiltersText')}</div>

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
              onClick={() => handleRemoveFilter(filter.name)}
            >
              <XIcon />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
};
