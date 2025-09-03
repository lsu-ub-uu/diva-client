import { CollapseContentIcon, ExpandContentIcon } from '@/icons';
import { clsx } from 'clsx';
import { use, type HTMLProps } from 'react';
import styles from './Card.module.css';
import { CardContext } from './CardContext';

interface CardExpandButtonProps extends HTMLProps<HTMLButtonElement> {
  expanded: boolean;
}

export const CardExpandButton = ({
  expanded,
  children,
  className,
  ...rest
}: CardExpandButtonProps) => {
  const { ids } = use(CardContext);
  return (
    <button
      {...rest}
      className={clsx(styles['expand-button'], className)}
      aria-expanded={expanded}
      id={ids.heading}
      aria-controls={ids.section}
      type='button'
    >
      {expanded ? <CollapseContentIcon /> : <ExpandContentIcon />}
      {children}
    </button>
  );
};
