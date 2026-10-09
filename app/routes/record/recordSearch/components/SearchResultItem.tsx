import { DivaOutputSearchResult } from '@/routes/record/recordSearch/components/SearchResult/DivaOutputSearchResult';
import { DivaPersonSearchResult } from '@/routes/record/recordSearch/components/SearchResult/DivaPersonSearchResult';
import { OutputPresentation } from '@/components/OutputPresentation/OutputPresentation';
import { transformToRaw } from '@/cora/transform/transformToRaw';
import type { BFFDataRecord, Metadata } from '@/types/record';

interface SearchResultItemProps {
  record: BFFDataRecord<Metadata>;
}

export const SearchResultItem = ({ record }: SearchResultItemProps) => {
  if (record.recordType === 'diva-output') {
    return <DivaOutputSearchResult searchResult={record} />;
  }

  if (record.recordType === 'diva-person') {
    return <DivaPersonSearchResult searchResult={record} />;
  }

  // diva-project

  // diva-course

  // diva-organization

  // diva-journal

  // diva-subject

  // diva-programme

  // diva-series

  // diva-localLabel

  // diva-publisher

  // diva-funder

  return (
    <div>
      <OutputPresentation
        data={transformToRaw(record.data)}
        formSchema={record.presentation!}
      />
    </div>
  );
};
