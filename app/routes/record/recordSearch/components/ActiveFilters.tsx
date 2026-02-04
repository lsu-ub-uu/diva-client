import { CodeIcon, FunnelIcon, FunnelXIcon, XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './ActiveFilters.module.css';
import { Button } from '@/components/Button/Button';
import { IconButton } from '@/components/IconButton/IconButton';
import type { BFFSearchResult } from '@/types/record';

export interface ActiveFilter {
  name: string;
  value: string;
  textId: string;
  valueTextId?: string;
}

interface ActiveFiltersProps {
  activeFilters: ActiveFilter[];
  onRemoveFilter: (name: string) => void;
  onClearAllFilters: () => void;
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
  apiUrl: string;
  searchResults: BFFSearchResult;
}

export const ActiveFilters = ({
  activeFilters,
  onRemoveFilter,
  onClearAllFilters,
  filtersOpen,
  setFiltersOpen,
  apiUrl,
  searchResults,
}: ActiveFiltersProps) => {
  const { t } = useTranslation();

  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className={styles['active-filters']}>
      <div className={styles['active-filters-header']}>
        {hasActiveFilters && <h2>{t('divaClient_activeFiltersText')}</h2>}
        {searchResults.data.length > 0 && (
          <Button
            variant='tertiary'
            as='a'
            href={apiUrl}
            target='_blank'
            rel='noopener noreferrer'
            className={styles['api-link-button']}
          >
            <CodeIcon />
            {t('divaClient_viewInApiText')}
          </Button>
        )}
        {hasActiveFilters && (
          <Button onClick={onClearAllFilters} variant='tertiary'>
            <FunnelXIcon />
            {t('divaClient_clearAllFiltersText')}
          </Button>
        )}
        <Button
          onClick={() => setFiltersOpen(!filtersOpen)}
          variant='secondary'
          className='filters-toggle-button'
        >
          <FunnelIcon />
          {filtersOpen
            ? t('divaClient_hideFiltersText')
            : t('divaClient_showFiltersText')}
          {activeFilters.length > 0 && (
            <div className='filter-counter'>{activeFilters.length}</div>
          )}
        </Button>
      </div>
      {hasActiveFilters && (
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
      )}
    </div>
  );
};
