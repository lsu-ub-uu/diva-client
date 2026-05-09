import { useCallback, useRef, type ReactNode, type Ref } from 'react';
import styles from './ConfirmDialog.module.css';

interface ConfirmDialogProps {
  headingText: string;
  messageText?: string;
  actions?: ReactNode;
  ref: Ref<HTMLDialogElement>;
}

export const ConfirmDialog = ({
  headingText,
  messageText,
  actions,
  ref,
}: ConfirmDialogProps) => {
  return (
    <dialog ref={ref} className={styles.dialog}>
      <form method='dialog'>
        <h2 className={styles['heading']}>{headingText}</h2>
        <p>{messageText}</p>
        <div className={styles['button-container']}>{actions}</div>
      </form>
    </dialog>
  );
};

export const useConfirmDialog = () => {
  const confirmDialogRef = useRef<HTMLDialogElement>(null);

  const showConfirmDialog = useCallback(
    (onClose: (returnValue: string) => void) => {
      confirmDialogRef.current?.showModal();
      confirmDialogRef.current?.addEventListener(
        'close',
        () => {
          onClose(confirmDialogRef.current?.returnValue ?? '');
        },
        { once: true },
      );
    },
    [],
  );

  return {
    showConfirmDialog,
    confirmDialogRef,
  };
};
