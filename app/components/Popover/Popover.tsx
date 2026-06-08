import { type HTMLProps } from 'react';
import { Button } from '../Button/Button';

import clsx from 'clsx';
import { XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '../IconButton/IconButton';
import styles from './Popover.module.css';

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
          {title && <h3 className={styles.title}>{title}</h3>}
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
