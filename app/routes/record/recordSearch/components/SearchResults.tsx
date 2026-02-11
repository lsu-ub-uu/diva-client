import { Alert, AlertTitle } from '@/components/Alert/Alert';
import { RecordActionButtons } from '@/components/RecordActionButtons/RecordActionButtons';
import { CircleDashedIcon, SearchSlashIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { PerformSearchResult } from '../utils/performSearch.server';
import { SearchResultItem } from './SearchResultItem';
import styles from './SearchResults.module.css';

interface SearchResultsProps {
  searchResults: PerformSearchResult;
  searching?: boolean;
  start: number;
  userHasSearched: boolean;
}

export const SearchResults = ({
  searchResults,
  searching,
  start,
  userHasSearched,
}: SearchResultsProps) => {
  const { t } = useTranslation();

  if (searchResults.alert) {
    return (
      <Alert severity={searchResults.alert.severity}>
        <AlertTitle>{t(searchResults.alert.summary)}</AlertTitle>
        {searchResults.alert.details}
      </Alert>
    );
  }

  return (
    <div className={styles['search-result']}>
      {!userHasSearched && searchResults.totalNo === 0 && (
        <Alert severity='info' icon={<CircleDashedIcon />}>
          <AlertTitle>{t('divaClient_noPostResultsTitleText')}</AlertTitle>
          {t('divaClient_noPostResultsBodyText')}
        </Alert>
      )}

      {userHasSearched && searchResults.data.length === 0 && (
        <Alert severity='info' icon={<SearchSlashIcon />}>
          <AlertTitle>{t('divaClient_noSearchResultsTitleText')}</AlertTitle>
          {t('divaClient_noSearchResultsBodyText')}
        </Alert>
      )}

      <ol
        className={styles['result-list']}
        aria-busy={searching}
        start={start}
        style={{ counterReset: `result ${start - 1}` }}
      >
        {searchResults.data.map((record) => (
          <li key={record.id} className={styles['result-list-item']}>
            <div className={styles['result-list-item-content']}>
              <SearchResultItem record={record} />
              <div className={styles['record-action-buttons']}>
                <RecordActionButtons record={record} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
