import { ArchiveRestoreIcon, Trash2Icon } from 'lucide-react';
import { Alert, AlertTitle } from '../Alert/Alert';
import { Button } from '../Button/Button';
import { href, useFetcher } from 'react-router';
import { CircularLoader } from '../Loader/CircularLoader';
import { useTranslation } from 'react-i18next';

interface TrashAlertProps {
  recordType: string;
  recordId: string;
}

export const TrashAlert = ({ recordType, recordId }: TrashAlertProps) => {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const submitting =
    fetcher.state !== 'idle' && fetcher.formAction?.includes('/untrash');
  const untrash = () => {
    fetcher.submit(
      {},
      {
        method: 'post',
        action: href('/:recordType/:recordId/untrash', {
          recordType,
          recordId,
        }),
      },
    );
  };
  return (
    <Alert
      severity='neutral'
      icon={<Trash2Icon />}
      action={
        <Button variant='secondary' onClick={untrash}>
          {t('divaClient_untrashButtonText')}
          {submitting ? <CircularLoader /> : <ArchiveRestoreIcon />}
        </Button>
      }
    >
      <AlertTitle>{t('divaClient_trashWarningText')}</AlertTitle>
      <p>{t('divaClient_trashWarningBodyText')}</p>
    </Alert>
  );
};
