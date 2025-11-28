import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import type { BFFDataRecord } from '@/types/record';
import clsx from 'clsx';
import { CircleCheckBig, TriangleAlert } from 'lucide-react';
import { Link } from 'react-router';
import { Attachments } from './Attachments/Attachments';
import styles from './DivaOutputSearchResult.module.css';
import { Persons } from './Persons';
import { Related } from './Related/Related';
import { RelatedBook } from './RelatedBook/RelatedBook';

interface DivaOutputSearchResultProps {
  searchResult: BFFDataRecord;
}
export const DivaOutputSearchResult = ({
  searchResult,
}: DivaOutputSearchResultProps) => {
  const language = useLanguage();
  const output = searchResult.data.output as DivaOutputGroup;
  return (
    <div className={styles['layout']}>
      <div>
        <h2>
          <Link to={`/${searchResult.recordType}/${searchResult.id}`}>
            {output?.titleInfo?.title?.value}
          </Link>
        </h2>
        <span>
          <Persons persons={output.name_type_personal} />
        </span>
        <span className={styles['info-box']}>
          <p className={styles['item']}>
            <time dateTime={output?.originInfo?.dateIssued?.year?.value}>
              {output?.originInfo?.dateIssued?.year?.value}
            </time>
          </p>
          <p className={styles['item']}>
            {output?.genre_type_outputType?.__valueText?.[language]}
          </p>
          <span className={clsx(styles['data-quality'], styles['item'])}>
            {output.dataQuality?.value === '2026' ? (
              <CircleCheckBig className={styles['data-quality-2026']} />
            ) : (
              <TriangleAlert className={styles['data-quality-classic']} />
            )}
            {output.dataQuality?.value}
          </span>
        </span>
        <RelatedBook relatedBook={output.relatedItem_type_book} />
        <Related related={output.related} />
      </div>
      <Attachments attachments={output.attachment} />
    </div>
  );
};
