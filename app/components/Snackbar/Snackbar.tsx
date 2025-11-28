import { Alert, type AlertProps } from '@/components/Alert/Alert';
import { createPortal } from 'react-dom';
import { type ReactNode, useEffect } from 'react';

import styles from './Snackbar.module.css';
import { Transition } from '@headlessui/react';
import { Button } from '@/components/Button/Button';
import { useTranslation } from 'react-i18next';
import { XIcon } from 'lucide-react';
import { IconButton } from '../IconButton/IconButton';

interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  autoCloseDelay?: number;
  severity: AlertProps['severity'];
  text: ReactNode;
  ariaLive?: 'assertive' | 'polite' | 'off';
}

export const Snackbar = ({
  open,
  onClose,
  autoCloseDelay = 5000,
  text,
  severity,
  ariaLive = 'assertive',
}: SnackbarProps) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (autoCloseDelay) {
      const autoCloseTimeout = setTimeout(onClose, autoCloseDelay);
      return () => clearTimeout(autoCloseTimeout);
    }
  }, [open, onClose, autoCloseDelay]);

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <Transition show={open} unmount={true} appear={true}>
      <div role='alert' aria-live={ariaLive} className={styles['snackbar']}>
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
    </Transition>,
    document.body,
  );
};
