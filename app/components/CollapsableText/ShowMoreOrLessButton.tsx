import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@/icons';
import styles from './CollapsableText.module.css';
import type { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface ShowMoreOrLessButtonProps extends HTMLAttributes<HTMLButtonElement> {
  expanded: boolean;
}

export const ShowMoreOrLessButton = ({
  expanded,
  className,
  ...rest
}: ShowMoreOrLessButtonProps) => {
  const { t } = useTranslation();
  return (
    <button
      {...rest}
      className={clsx(styles['expand-button'], className)}
      aria-expanded={expanded}
    >
      {expanded ? t('divaClient_showLessText') : t('divaClient_showMoreText')}
      <ChevronDownIcon className={styles['expand-icon']} />
    </button>
  );
};
