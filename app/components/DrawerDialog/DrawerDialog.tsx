/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef, type ReactNode, type RefObject } from 'react';
import styles from './DrawerDialog.module.css';

interface DrawerDialogProps {
  children: ReactNode;
  ref: RefObject<HTMLDialogElement>;
  variant?: 'left' | 'right';
}

export const DrawerDialog = ({
  children,
  ref,
  variant = 'left',
}: DrawerDialogProps) => {
  const dialogPanelRef = useRef<HTMLDivElement>(null);
  return (
    <div className={styles['dialog-trigger-button']}>
      <dialog
        ref={ref}
        className={styles['dialog']}
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
    </div>
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
