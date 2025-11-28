import { Term } from '@/routes/divaOutput/components/Term';
import { createTitle } from '@/routes/divaOutput/utils/createTitle';
import styles from './RelatedBook.module.css';
import { useLanguage } from '@/i18n/useLanguage';

interface RelatedBookProps {
  relatedBook: any;
}

export const RelatedBook = ({ relatedBook }: RelatedBookProps) => {
  const language = useLanguage();
  return (
    <div className={styles['related-book']}>
      <Term
        label={`${relatedBook?.__text?.[language]}:`}
        value={createTitle(relatedBook?.book?.linkedRecord.output.titleInfo)}
      />
    </div>
  );
};
