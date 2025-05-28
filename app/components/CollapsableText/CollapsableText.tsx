import { ChevronDownIcon } from '@/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CollapsableText.module.css';

interface CollapsableTextProps {
  text: string;
}

const MAX_LENGTH = 300;

export const CollapsableText = ({ text }: CollapsableTextProps) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <p aria-expanded={expanded} className={styles['collapsable-text']}>
      {!expanded ? `${text.slice(0, MAX_LENGTH)}...` : text}
      {text.length > MAX_LENGTH && (
        <button onClick={toggleExpanded} className={styles['expand-button']}>
          {expanded
            ? t('divaClient_showLessText')
            : t('divaClient_showMoreText')}
          <ChevronDownIcon className={styles['expand-icon']} />
        </button>
      )}
    </p>
  );
};
