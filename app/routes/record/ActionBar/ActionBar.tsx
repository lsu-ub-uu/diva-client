import { Button } from '@/components/Button/Button';
import type { BFFDataRecord } from '@/types/record';
import { CodeIcon, ShredderIcon, Trash2Icon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router';
import styles from './ActionBar.module.css';
import clsx from 'clsx';

interface ActionBarProps {
  record: BFFDataRecord;
  apiUrl?: string;
  outputPage: boolean;
}
export const ActionBar = ({ record, apiUrl, outputPage }: ActionBarProps) => {
  const { t } = useTranslation();
  const fetcher = useFetcher();

  return (
    <div
      className={clsx(
        styles['action-bar'],
        !outputPage && styles['dynamic-page-margin'],
      )}
    >
      {record.userRights?.includes('delete') && (
        <fetcher.Form
          key={`${record.id}_ab_delete`}
          method='POST'
          action={`/${record.recordType}/${record.id}/delete`}
          onSubmit={(e: any) => {
            if (!window.confirm(t('divaClient_confirmDeleteText'))) {
              e.preventDefault();
            }
          }}
        >
          <Button
            type='submit'
            variant='tertiary'
            className={styles['action-bar-button']}
          >
            <ShredderIcon />
            {t('divaClient_deleteRecordText')}
          </Button>
        </fetcher.Form>
      )}
      {record.userRights?.includes('trash') && (
        <fetcher.Form
          key={`${record.id}_ab_trash`}
          method='POST'
          action={`/${record.recordType}/${record.id}/trash`}
          onSubmit={(e: any) => {
            if (!window.confirm(t('divaClient_confirmTrashText'))) {
              e.preventDefault();
            }
          }}
        >
          <Button
            type='submit'
            variant='tertiary'
            target='_blank'
            className={styles['action-bar-button']}
          >
            <Trash2Icon />
            {t('divaClient_trashRecordText')}
          </Button>
        </fetcher.Form>
      )}
      {apiUrl && (
        <Button
          variant='tertiary'
          as='a'
          href={apiUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          <CodeIcon />
          {t('divaClient_viewInApiText')}
        </Button>
      )}
    </div>
  );
};
