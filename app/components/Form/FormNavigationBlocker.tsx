import { SquareArrowRightExitIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useBlocker } from 'react-router';
import {
  ConfirmDialog,
  useConfirmDialog,
} from '../ConfirmDialog/ConfirmDialog';

interface FormNavigationBlockerProps {
  isDirty: boolean;
}

export const FormNavigationBlocker = ({
  isDirty,
}: FormNavigationBlockerProps) => {
  const { t } = useTranslation();
  const { showConfirmDialog, confirmDialogRef } = useConfirmDialog();
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname && isDirty,
  );

  // Block browser navigation (closing tab, refreshing, etc.)
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

  // Block in-app navigation
  useEffect(() => {
    if (blocker.state === 'blocked') {
      showConfirmDialog(blocker.proceed, blocker.reset);
    }
  }, [blocker.state, blocker.proceed, blocker.reset, showConfirmDialog]);

  return (
    <ConfirmDialog
      ref={confirmDialogRef}
      headingText={t('divaClient_unsavedChangesConfirmHeadingText')} //Osparade ändringar
      messageText={t('divaClient_unsavedChangesConfirmMessageText')} //Är du säker på att du vill lämna formuläret? Dina ändringar kommer inte att sparas
      confirmButtonText={
        <>
          {t('divaClient_unsavedChangesConfirmButtonText')}
          <SquareArrowRightExitIcon />
        </>
      } //Ja, lämna
      cancelButtonText={t('divaClient_unsavedChangesCancelButtonText')} //Nej, stanna kvar
    />
  );
};
