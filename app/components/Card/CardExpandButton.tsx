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
import { useTranslation } from 'react-i18next';

interface CardExpandButtonProps extends HTMLProps<HTMLButtonElement> {
  expanded: boolean | 'bothEqual';
}

export const CardExpandButton = ({
  expanded,
  children,
  className,
  ...rest
}: CardExpandButtonProps) => {
  const { t } = useTranslation();
  const { ids } = use(CardContext);

  const getIcon = () => {
    if (expanded === 'bothEqual') {
      return <SwapIcon />;
    }
    return expanded ? <CollapseContentIcon /> : <ExpandContentIcon />;
  };

  const getAriaLabel = () => {
    if (expanded === 'bothEqual') {
      return 'divaClient_swapPresentationText';
    }
    return expanded ? 'divaClient_showLessText' : 'divaClient_showMoreText';
  };

  return (
    <button
      {...rest}
      className={clsx(styles['expand-button'], className)}
      aria-expanded={expanded === 'bothEqual' ? undefined : expanded}
      id={ids.heading}
      aria-controls={ids.section}
      aria-label={children ? undefined : t(getAriaLabel())}
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
