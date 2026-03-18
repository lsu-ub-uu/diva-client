import { DivaOutputSearchResult } from '@/components/Form/SearchResult/DivaOutputSearchResult';
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

  // diva-person

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
