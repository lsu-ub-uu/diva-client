/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef, type ReactNode, type RefObject } from 'react';
import styles from './DrawerDialog.module.css';
import { clsx } from 'clsx';

interface DrawerDialogProps {
  children: ReactNode;
  ref: RefObject<HTMLDialogElement | null>;
  variant?: 'left' | 'right';
  className?: string;
}

export const DrawerDialog = ({
  children,
  ref,
  variant = 'left',
  className,
}: DrawerDialogProps) => {
  const dialogPanelRef = useRef<HTMLDivElement>(null);
  return (
    <dialog
      ref={ref}
      className={clsx(styles['dialog'], className)}
      data-variant={variant}
      onClick={(e) => {
        if (!dialogPanelRef.current?.contains(e.target as Node)) {
          ref?.current?.close();
        }
      }}
    >
      <div ref={dialogPanelRef} className={styles['dialog-panel']}>
        {children}
      </div>
    </dialog>
  );
};

export const useDrawerDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return {
    showDrawerDialog: () => dialogRef.current?.showModal(),
    closeDrawerDialog: () => dialogRef.current?.close(),
    drawerDialogRef: dialogRef,
  };
};
