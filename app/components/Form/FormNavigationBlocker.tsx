import { ExternalLinkIcon, SquareArrowRightExitIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useBlocker } from 'react-router';
import {
  ConfirmDialog,
  useConfirmDialog,
} from '../ConfirmDialog/ConfirmDialog';
import { Button } from '../Button/Button';

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
      showConfirmDialog((returnValue) => {
        if (returnValue === 'confirm') {
          blocker.proceed();
        }

        if (returnValue === 'openInNewTab') {
          blocker.reset();
          window.open(
            blocker.location.pathname + blocker.location.search,
            '_blank',
          );
        }

        if (returnValue === 'cancel') {
          blocker.reset();
        }
      });
    }
  }, [blocker, showConfirmDialog]);

  return (
    <ConfirmDialog
      ref={confirmDialogRef}
      headingText={t('divaClient_unsavedChangesConfirmHeadingText')}
      messageText={t('divaClient_unsavedChangesConfirmMessageText')}
      actions={
        <>
          <Button variant='secondary' value='cancel' type='submit'>
            {t('divaClient_unsavedChangesCancelButtonText')}
          </Button>
          <Button variant='secondary' value='openInNewTab' type='submit'>
            {t('divaClient_unsavedChangesOpenInNewTabButtonText')}
            <ExternalLinkIcon />
          </Button>
          <Button variant='primary' value='confirm' type='submit'>
            {t('divaClient_unsavedChangesConfirmButtonText')}
            <SquareArrowRightExitIcon />
          </Button>
        </>
      }
    />
  );
};
