import { type HTMLProps } from 'react';
import { Button } from '../Button/Button';

import clsx from 'clsx';
import { XIcon } from '@/components/Icons/Icons';
import { useTranslation } from 'react-i18next';
import styles from './Popover.module.css';
import { IconButton } from '../IconButton/IconButton';

interface PopoverProps extends HTMLProps<HTMLDivElement> {
  title?: string;
  closeButton?: boolean;
  anchor?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

export const Popover = ({
  id,
  title,
  anchor = 'bottom',
  closeButton = true,
  children,
  className,
  ...rest
}: PopoverProps) => {
  const { t } = useTranslation();

  return (
    <div
      id={id}
      popover='auto'
      data-anchor={anchor}
      className={clsx(styles.popover, className)}
      {...rest}
    >
      <div className={styles['field-info-panel']}>
        <div className={styles['label-wrapper']}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {closeButton && (
            <IconButton
              popoverTarget={id}
              popoverTargetAction='hide'
              as={Button}
              size='small'
              tooltip={t('divaClient_closeText')}
            >
              <XIcon />
            </IconButton>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};
