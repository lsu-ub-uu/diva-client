import {
  CircleFilledIcon,
  CollapseContentIcon,
  ExpandContentIcon,
  SwapIcon,
  WarningIcon,
} from '@/icons';
import { clsx } from 'clsx';
import { use, type HTMLProps } from 'react';
import styles from './Card.module.css';
import { CardContext } from './CardContext';

interface CardExpandButtonProps extends HTMLProps<HTMLButtonElement> {
  expanded: boolean | 'bothEqual';
}

export const CardExpandButton = ({
  expanded,
  children,
  className,
  ...rest
}: CardExpandButtonProps) => {
  const { ids } = use(CardContext);

  const getIcon = () => {
    if (expanded === 'bothEqual') {
      return <SwapIcon />;
    }
    return expanded ? <CollapseContentIcon /> : <ExpandContentIcon />;
  };

  return (
    <button
      {...rest}
      className={clsx(styles['expand-button'], className)}
      aria-expanded={expanded === 'bothEqual' ? undefined : expanded}
      id={ids.heading}
      aria-controls={ids.section}
      type='button'
      data-action-button
    >
      {getIcon()}
      {children}
      <CircleFilledIcon className={styles['value-icon']} aria-hidden='true' />
      <WarningIcon className={styles['error-icon']} aria-hidden='true' />
    </button>
  );
};
