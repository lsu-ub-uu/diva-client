import { useRef, type ReactNode, type Ref } from 'react';
import { Button } from '../Button/Button';
import styles from './ConfirmDialog.module.css';
import { useTranslation } from 'react-i18next';

interface ConfirmDialogProps {
  headingText: string;
  messageText?: string;
  confirmButtonText: ReactNode;
  cancelButtonText?: ReactNode;
  ref: Ref<HTMLDialogElement>;
}

export const ConfirmDialog = ({
  headingText,
  messageText,
  confirmButtonText,
  cancelButtonText,
  ref,
}: ConfirmDialogProps) => {
  const { t } = useTranslation();
  return (
    <dialog ref={ref} className={styles.dialog} closedby='any'>
      <form method='dialog'>
        <h2 className={styles['heading']}>{headingText}</h2>
        <p>{messageText}</p>
        <div className={styles['button-container']}>
          <Button
            data-testid='dialog-cancel-button'
            variant='secondary'
            value='cancel'
            type='submit'
          >
            {cancelButtonText ?? t('divaClient_cancelText')}
          </Button>
          <Button
            data-testid='dialog-confirm-button'
            variant='primary'
            value='confirm'
            type='submit'
          >
            {confirmButtonText}
          </Button>
        </div>
      </form>
    </dialog>
  );
};

export const useConfirmDialog = () => {
  const confirmDialogRef = useRef<HTMLDialogElement>(null);
  return {
    showConfirmDialog: (onConfirm: () => void) => {
      confirmDialogRef.current?.showModal();
      confirmDialogRef.current?.addEventListener(
        'close',
        () => {
          if (confirmDialogRef.current?.returnValue === 'confirm') {
            onConfirm();
          }
        },
        { once: true },
      );
    },
    confirmDialogRef,
  };
};
