import styles from './InfoBox.module.css';
import clsx from 'clsx';
import { useLanguage } from '@/i18n/useLanguage';
import { CircleCheckBigIcon, FileExclamationPointIcon } from 'lucide-react';
import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';

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
      <span className={clsx(styles['data-quality'], styles['item'])}>
        {output.dataQuality?.value === '2026' ? (
          <CircleCheckBigIcon className={styles['data-quality-2026']} />
        ) : (
          <FileExclamationPointIcon
            className={styles['data-quality-classic']}
          />
        )}
        {output.dataQuality?.__valueText?.[language]}
      </span>
    </span>
  );
};
