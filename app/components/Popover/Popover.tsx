import { type HTMLProps, type ToggleEventHandler } from 'react';
import { Button } from '../Button/Button';

import { supportsAnchorPositioning } from '@/utils/supportsAnchorPositioning';
import clsx from 'clsx';
import { XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Popover.module.css';
import { IconButton } from '../IconButton/IconButton';

interface PopoverProps extends HTMLProps<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}

export const Popover = ({
  id,
  title,
  children,
  className,
  ...rest
}: PopoverProps) => {
  const { t } = useTranslation();

  const handleBeforeToggle: ToggleEventHandler<HTMLDivElement> = (e: any) => {
    if (e.newState === 'open' && !supportsAnchorPositioning()) {
      // Remove this workaround when support for CSS anchor positioning is widespread. (https://caniuse.com/css-anchor-positioning)
      requestAnimationFrame(() => positionPopoverWithinViewport(e.target));
    }
    if (e.newState === 'closed') {
      e.target.style.top = '';
      e.target.style.right = '';
      e.target.style.bottom = '';
      e.target.style.left = '';
    }
  };

  return (
    <div
      id={id}
      popover='auto'
      className={clsx(styles.popover, className)}
      onBeforeToggle={handleBeforeToggle}
      {...rest}
    >
      <div className={styles['field-info-panel']}>
        <div className={styles['label-wrapper']}>
          {title && <h3>{title}</h3>}
          <IconButton
            popoverTarget={id}
            popoverTargetAction='hide'
            as={Button}
            size='small'
            tooltip={t('divaClient_closeText')}
          >
            <XIcon />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
};

const positionPopoverWithinViewport = (popover: HTMLDivElement) => {
  const { top, right, bottom, left } = popover.getBoundingClientRect();
  const { scrollX, scrollY, innerHeight, innerWidth } = window;

  if (top < 0) {
    popover.style.top = `${scrollY + 8}px`;
  }
  if (left < 0) {
    popover.style.left = `${scrollX + 8}px`;
  }
  if (right > innerWidth) {
    popover.style.right = `${8 - scrollX}px`;
  }
  if (bottom > innerHeight) {
    popover.style.bottom = `${8 - scrollY}px`;
  }
};
