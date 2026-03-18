import { ValueIcon } from '@/icons/ValueIcon';
import { clsx } from 'clsx';
import {
  ArrowLeftRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { use, type HTMLProps } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { ids, boxed } = use(CardContext);

  const getIcon = () => {
    if (expanded === 'bothEqual') {
      return <ArrowLeftRightIcon />;
    }
    return expanded ? <ChevronUpIcon /> : <ChevronDownIcon />;
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
      {boxed && getIcon()}
      {children}
      {!boxed && getIcon()}
      <ValueIcon aria-hidden='true' className={styles['value-icon']} />
      <TriangleAlertIcon className={styles['error-icon']} aria-hidden='true' />
    </button>
  );
};
