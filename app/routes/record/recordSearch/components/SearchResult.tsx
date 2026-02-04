import { DivaOutputSearchResult } from '@/components/Form/SearchResult/DivaOutputSearchResult';
import { SearchResultForm } from '@/components/Form/SearchResultForm';
import { RecordActionButtons } from '@/components/RecordActionButtons/RecordActionButtons';
import styles from './SearchResult.module.css';

export const SearchResult = ({ record }: any) => {
  return (
    <div className={styles['result-list-item-content']}>
      {record.recordType && record.recordType === 'diva-output' ? (
        <DivaOutputSearchResult searchResult={record} />
      ) : (
        <SearchResultForm record={record} formSchema={record.presentation!} />
      )}
      <div className={styles['record-action-buttons']}>
        <RecordActionButtons record={record} />
      </div>
    </div>
  );
};
