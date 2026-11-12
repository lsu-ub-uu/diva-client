import { DivaOutputSearchResult } from '@/routes/record/recordSearch/components/SearchResult/DivaOutputSearchResult';

import type { BFFDataRecord, Metadata } from '@/types/record';
import { Link, href } from 'react-router';
import { getRecordTitle } from '@/utils/getRecordTitle';
import { useLanguage } from '@/i18n/useLanguage';

interface SearchResultItemProps {
  record: BFFDataRecord<Metadata>;
}

export const SearchResultItem = ({ record }: SearchResultItemProps) => {
  const language = useLanguage();
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
    <Link
      to={href('/:recordType/:recordId', {
        recordType: record.recordType,
        recordId: record.id,
      })}
    >
      <h2>{getRecordTitle(record, language)}</h2>
    </Link>
  );
};
