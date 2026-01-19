import type { BFFSearchResult } from '@/types/record';
import { DivaOutputSearchResult } from '../Form/SearchResult/DivaOutputSearchResult';
import { SearchResultForm } from '../Form/SearchResultForm';
import { RecordActionButtons } from '../RecordActionButtons/RecordActionButtons';

interface SearchResultsProps {
  searchResults: BFFSearchResult;
  searching?: boolean;
}

export const SearchResults = ({
  searchResults,
  searching,
}: SearchResultsProps) => {
  return (
    <div className='search-result'>
      <ol className={'result-list'} aria-busy={searching}>
        {searchResults.data.map((record) => (
          <li key={record.id} className={'result-list-item'}>
            <div className='result-list-item-content'>
              {record.recordType && record.recordType === 'diva-output' ? (
                <DivaOutputSearchResult searchResult={record} />
              ) : (
                <SearchResultForm
                  record={record}
                  formSchema={record.presentation!}
                />
              )}
              <div className='record-action-buttons'>
                <RecordActionButtons record={record} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
