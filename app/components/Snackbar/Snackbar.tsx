import { Alert, type AlertProps } from '@/components/Alert/Alert';
import { createPortal } from 'react-dom';
import { type ReactNode, useEffect } from 'react';

import styles from './Snackbar.module.css';
import { Transition } from '@headlessui/react';

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
    <Transition show={open && text !== undefined} unmount={true}>
      <div role='alert' aria-live={ariaLive} className={styles['snackbar']}>
        <Alert severity={severity}>{text}</Alert>
      </div>
    </Transition>,
    document.body,
  );
};
