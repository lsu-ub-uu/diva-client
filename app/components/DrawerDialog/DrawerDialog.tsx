import { useRef, type ReactNode, type Ref } from 'react';
import styles from './DrawerDialog.module.css';

interface DrawerDialogProps {
  children: ReactNode;
  ref: Ref<HTMLDialogElement>;
}

export const DrawerDialog = ({ children, ref }: DrawerDialogProps) => {
  return (
    <div className={styles['dialog-trigger-button']}>
      <dialog ref={ref} className={styles['dialog']}>
        <div className={styles['dialog-panel']}>{children}</div>
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
