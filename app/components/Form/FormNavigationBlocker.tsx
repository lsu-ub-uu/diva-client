import { useFormState, type Control } from 'react-hook-form';
import {
  ConfirmDialog,
  useConfirmDialog,
} from '../ConfirmDialog/ConfirmDialog';
import { useBlocker } from 'react-router';
import { useEffect } from 'react';

export const FormNavigationBlocker = ({ control }: { control: Control }) => {
  const { showConfirmDialog, confirmDialogRef } = useConfirmDialog();
  const { dirtyFields } = useFormState({ control });
  const isDirty = Object.keys(dirtyFields).length > 0;
  const blocker = useBlocker(isDirty);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  useEffect(() => {
    if (blocker.state === 'blocked') {
      showConfirmDialog(blocker.proceed, blocker.reset);
    }
  }, [blocker.state, blocker.proceed, blocker.reset, showConfirmDialog]);

  return (
    <ConfirmDialog
      ref={confirmDialogRef}
      headingText='Osparade ändringar'
      messageText='Är du säker på att du vill lämna formuläret? Dina ändringar kommer inte att sparas'
      confirmButtonText='Ja, lämna'
      cancelButtonText='Nej, stanna kvar'
    />
  );
};
