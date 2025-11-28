import { useId, useState } from 'react';

import styles from './CollapsableText.module.css';
import { ShowMoreOrLessButton } from './ShowMoreOrLessButton';

interface CollapsableTextProps {
  text: string;
  maxLength?: number;
}

const MAX_LENGTH = 300;

export const CollapsableText = ({
  text,
  maxLength = MAX_LENGTH,
}: CollapsableTextProps) => {
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const expandable = text.length > maxLength;

  if (!expandable) {
    return <p className={styles['collapsable-text']}>{text}</p>;
  }

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <p className={styles['collapsable-text']} id={id} data-expanded={expanded}>
      {!expanded ? `${text.slice(0, maxLength)}...` : text}
      <ShowMoreOrLessButton
        onClick={toggleExpanded}
        expanded={expanded}
        aria-controls={id}
      />
    </p>
  );
};
