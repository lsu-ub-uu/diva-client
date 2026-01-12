import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import styles from './InfoBox.module.css';

interface InfoBoxProps {
  output: DivaOutputGroup;
}
export const InfoBox = ({ output }: InfoBoxProps) => {
  const language = useLanguage();
  const yearIssued = output?.originInfo?.dateIssued?.year?.value;
  const publicationType =
    output?.genre_type_outputType?.__valueText?.[language];

  return (
    <span className={styles['info-box']}>
      {yearIssued && (
        <p className={styles['item']}>
          <time dateTime={yearIssued}>{yearIssued}</time>
        </p>
      )}
      {publicationType && <p className={styles['item']}>{publicationType}</p>}
    </span>
  );
};
