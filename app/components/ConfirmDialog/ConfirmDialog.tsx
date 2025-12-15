import { useRef, type Ref } from 'react';

interface ConfirmDialogProps {
  headingText: string;
  messageText?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  ref: Ref<HTMLDialogElement>;
}

export const ConfirmDialog = ({
  headingText,
  messageText,
  confirmButtonText,
  cancelButtonText,
  ref,
}: ConfirmDialogProps) => {
  return (
    <dialog ref={ref}>
      <form method='dialog'>
        <h2>{headingText}</h2>
        <p>{messageText}</p>
        <button value='cancel'>{cancelButtonText}</button>
        <button value='confirm'>{confirmButtonText}</button>
      </form>
    </dialog>
  );
};

export const useConfirmDialog = () => {
  const confirmDialogRef = useRef<HTMLDialogElement>(null);
  return {
    showConfirmDialog: (onConfirm: () => void) => {
      confirmDialogRef.current?.showModal();
      confirmDialogRef.current?.addEventListener('close', () => {
        if (confirmDialogRef.current?.returnValue === 'confirm') {
          onConfirm();
        }
      });
    },
    confirmDialogRef,
  };
};
