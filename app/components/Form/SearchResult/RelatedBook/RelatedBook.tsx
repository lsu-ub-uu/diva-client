import type { RelatedItemBookGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { Term } from '@/routes/divaOutput/components/Term';
import { getTitleFromTitleInfo } from '@/utils/getRecordTitle';
import styles from './RelatedBook.module.css';

interface RelatedBookProps {
  relatedBook: RelatedItemBookGroup | undefined;
}

export const RelatedBook = ({ relatedBook }: RelatedBookProps) => {
  const language = useLanguage();
  return (
    <div className={styles['related-book']}>
      <Term
        label={`${relatedBook?.__text?.[language]}:`}
        value={getTitleFromTitleInfo(
          relatedBook?.book
            ? relatedBook?.book?.linkedRecord.output.titleInfo
            : relatedBook?.titleInfo,
        )}
      />
    </div>
  );
};
