import type { BFFSearchResult } from '@/types/record';

import styles from './SearchResults.module.css';
import { RecordActionButtons } from '@/components/RecordActionButtons/RecordActionButtons';
import { DivaOutputSearchResult } from '@/components/Form/SearchResult/DivaOutputSearchResult';
import { SearchResultForm } from '@/components/Form/SearchResultForm';
import { Alert, AlertTitle } from '@/components/Alert/Alert';
import { SearchSlashIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SearchResultsProps {
  searchResults: BFFSearchResult;
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
  return (
    <div className={styles['search-result']}>
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
              {record.recordType && record.recordType === 'diva-output' ? (
                <DivaOutputSearchResult searchResult={record} />
              ) : (
                <SearchResultForm
                  record={record}
                  formSchema={record.presentation!}
                />
              )}
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
