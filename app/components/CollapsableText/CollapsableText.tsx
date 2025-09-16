import { ChevronDownIcon } from '@/icons';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CollapsableText.module.css';
import { ShowMoreOrLessButton } from './ShowMoreOrLessButton';

interface CollapsableTextProps {
  text: string;
}

const MAX_LENGTH = 300;

export const CollapsableText = ({ text }: CollapsableTextProps) => {
  const id = useId();
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <p className={styles['collapsable-text']} id={id} data-expanded={expanded}>
      {!expanded ? `${text.slice(0, MAX_LENGTH)}...` : text}
      {text.length > MAX_LENGTH && (
        <ShowMoreOrLessButton
          onClick={toggleExpanded}
          expanded={expanded}
          aria-controls={id}
        />
      )}
    </p>
  );
};
