import { Alert, type AlertProps } from '@/components/Alert/Alert';
import { type ReactNode, useEffect, useRef } from 'react';

import { XIcon } from '@/icons/icons';
import { useTranslation } from 'react-i18next';
import { IconButton } from '../IconButton/IconButton';
import styles from './Snackbar.module.css';

interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  autoCloseDelay?: number;
  severity: AlertProps['severity'];
  text: ReactNode;
}

export const Snackbar = ({
  open,
  onClose,
  autoCloseDelay = 5000,
  text,
  severity,
}: SnackbarProps) => {
  const { t } = useTranslation();
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = popoverRef.current;
    if (!el) return;
    const isOpen = el.matches(':popover-open');

    if (open && !isOpen) {
      el.showPopover();
    } else if (!open && isOpen) {
      el.hidePopover();
    }
  }, [open]);

  useEffect(() => {
    if (autoCloseDelay) {
      const autoCloseTimeout = setTimeout(onClose, autoCloseDelay);
      return () => clearTimeout(autoCloseTimeout);
    }
  }, [open, onClose, autoCloseDelay]);

  return (
    <div
      ref={popoverRef}
      popover='manual'
      role='alert'
      aria-live='polite'
      className={styles['snackbar']}
    >
      <Alert severity={severity}>
        <div className={styles['alert-content']}>
          {text}
          <IconButton
            size='small'
            tooltip={t('divaClient_closeText')}
            onClick={onClose}
          >
            <XIcon />
          </IconButton>
        </div>
      </Alert>
    </div>
  );
};
