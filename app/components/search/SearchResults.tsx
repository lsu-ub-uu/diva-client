import type { BFFSearchResult } from '@/types/record';
import { DivaOutputSearchResult } from '../Form/SearchResult/DivaOutputSearchResult';
import { SearchResultForm } from '../Form/SearchResultForm';
import { RecordActionButtons } from '../RecordActionButtons/RecordActionButtons';

import styles from './SearchResults.module.css';

interface SearchResultsProps {
  searchResults: BFFSearchResult;
  searching?: boolean;
  start: number;
}

export const SearchResults = ({
  searchResults,
  searching,
  start,
}: SearchResultsProps) => {
  return (
    <div className={styles['search-result']}>
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
