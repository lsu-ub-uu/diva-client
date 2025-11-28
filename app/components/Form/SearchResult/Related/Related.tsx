import type { RelatedOutputGroup } from '@/generatedTypes/divaTypes';
import styles from './Related.module.css';
import { useLanguage } from '@/i18n/useLanguage';
import { createTitle } from '@/routes/divaOutput/utils/createTitle';
import { Term } from '@/routes/divaOutput/components/Term';

interface RelatedProps {
  related: RelatedOutputGroup[] | undefined;
}

export const Related = ({ related }: RelatedProps) => {
  const language = useLanguage();

  if (!related) {
    return null;
  }

  return related.map((related, i) => {
    return (
      <div key={i} className={styles['related-book']}>
        <Term
          label={`${related.__text?.[language]}:`}
          value={createTitle(related.output?.linkedRecord?.output?.titleInfo)}
        />
      </div>
    );
  });
};
