import { TrashIcon, UntrashIcon } from '@/icons/icons';
import { useTranslation } from 'react-i18next';
import { href, useFetcher } from 'react-router';
import { Alert, AlertTitle } from '../Alert/Alert';
import { Button } from '../Button/Button';
import { CircularLoader } from '../Loader/CircularLoader';

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
      icon={<TrashIcon />}
      action={
        <Button variant='secondary' onClick={untrash}>
          {t('divaClient_untrashRecordText')}
          {submitting ? <CircularLoader /> : <UntrashIcon />}
        </Button>
      }
    >
      <AlertTitle>{t('divaClient_trashWarningText')}</AlertTitle>
      <p>{t('divaClient_trashWarningBodyText')}</p>
    </Alert>
  );
};
