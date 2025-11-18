import { CloseIcon } from '@/icons';
import { type HTMLProps } from 'react';
import { Button } from '../Button/Button';

import clsx from 'clsx';
import styles from './Popover.module.css';
import { useTranslation } from 'react-i18next';

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
  return (
    <div
      id={id}
      popover='auto'
      className={clsx(styles.popover, className)}
      {...rest}
    >
      <div className={styles['field-info-panel']}>
        <div className={styles['label-wrapper']}>
          {title && <h3>{title}</h3>}
          <Button
            popoverTarget={id}
            popoverTargetAction='hide'
            as={Button}
            variant='icon'
            size='small'
            aria-label={t('divaClient_closeText')}
            tooltipPosition='left'
          >
            <CloseIcon />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};
