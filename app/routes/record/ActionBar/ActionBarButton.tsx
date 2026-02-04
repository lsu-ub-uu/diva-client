import { CircularLoader } from '@/components/Loader/CircularLoader';
import styles from './ActionBar.module.css';
import { Button, type ButtonProps } from '@/components/Button/Button';
import {
  ConfirmDialog,
  useConfirmDialog,
} from '@/components/ConfirmDialog/ConfirmDialog';

interface ActionBarButtonProps extends ButtonProps {
  icon: React.ReactNode;
  pending?: boolean;
  onAction?: () => void;
  confirmDialog?: {
    headingText: string;
    messageText?: string;
    confirmButtonText: string;
    cancelButtonText?: string;
  };
}

export const ActionBarButton = ({
  children,
  icon,
  pending,
  onAction,
  confirmDialog,
  ...rest
}: ActionBarButtonProps) => {
  const { showConfirmDialog, confirmDialogRef } = useConfirmDialog();
  return (
    <div className={styles['action-bar-button']}>
      <Button
        size='small'
        variant='tertiary'
        disabled={pending}
        onClick={() => {
          if (onAction) {
            if (confirmDialog) {
              showConfirmDialog(onAction);
            } else {
              onAction();
            }
          }
        }}
        {...rest}
      >
        {pending ? <CircularLoader /> : icon}
        {children}
      </Button>
      {confirmDialog && (
        <ConfirmDialog
          ref={confirmDialogRef}
          headingText={confirmDialog.headingText}
          messageText={confirmDialog.messageText}
          confirmButtonText={
            <>
              {confirmDialog.confirmButtonText}
              {icon}
            </>
          }
          cancelButtonText={confirmDialog.cancelButtonText}
        />
      )}
    </div>
  );
};
