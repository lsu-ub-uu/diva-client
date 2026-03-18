import { useTranslation } from 'react-i18next';
import type { ActiveFilter } from '../utils/createActiveFilters.server';
import { Button } from '@/components/Button/Button';
import { CodeIcon, FunnelIcon, FunnelXIcon } from 'lucide-react';
import type { BFFSearchResult } from '@/types/record';

interface SearchResultButtonsProps {
  searchResults: BFFSearchResult;
  apiUrl: string;
  activeFilters: ActiveFilter[];
  onClearAllFilters: () => void;
  showFilterDialog: () => void;
}

export const SearchResultButtons = ({
  searchResults,
  apiUrl,
  activeFilters,
  onClearAllFilters,
  showFilterDialog,
}: SearchResultButtonsProps) => {
  const { t } = useTranslation();
  return (
    <div className='search-result-buttons'>
      {searchResults.data.length > 0 && (
        <Button
          variant='tertiary'
          as='a'
          href={apiUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          <CodeIcon />
          {t('divaClient_viewInApiText')}
        </Button>
      )}
      {activeFilters.length > 0 && (
        <Button onClick={onClearAllFilters} variant='tertiary'>
          <FunnelXIcon />
          {t('divaClient_clearAllFiltersText')}
        </Button>
      )}
      <Button
        onClick={showFilterDialog}
        variant='secondary'
        className='filters-dialog-button'
      >
        <FunnelIcon />
        {t('divaClient_showFiltersText')}
        {activeFilters.length > 0 && (
          <div className='filter-counter'>{activeFilters.length}</div>
        )}
      </Button>
    </div>
  );
};
