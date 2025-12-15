import { Button } from '@/components/Button/Button';
import type { BFFDataRecord } from '@/types/record';
import {
  CodeIcon,
  FilePenIcon,
  FileTextIcon,
  ShredderIcon,
  Trash2Icon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  href,
  Link,
  useFetcher,
  useMatch,
  useMatches,
  useRoutes,
} from 'react-router';
import styles from './ActionBar.module.css';
import clsx from 'clsx';

interface ActionBarProps {
  record: BFFDataRecord;
  apiUrl?: string;
  className?: string;
}
export const ActionBar = ({ record, apiUrl, className }: ActionBarProps) => {
  const matches = useMatches();
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const isOnUpdatePage = matches.at(-1)?.id === 'routes/record/recordUpdate';
  const isOnViewPage =
    matches.at(-1)?.id === 'routes/record/record' ||
    matches.at(-1)?.id === 'routes/divaOutput/divaOutputView';
  return (
    <div className={clsx(styles['action-bar'], className)}>
      {isOnUpdatePage && (
        <Button
          as={Link}
          to={href('/:recordType/:recordId', {
            recordType: record.recordType,
            recordId: record.id,
          })}
          variant='tertiary'
        >
          <FileTextIcon /> {t('divaClient_viewRecordText')}
        </Button>
      )}
      {isOnViewPage && record.userRights?.includes('update') && (
        <Button
          as={Link}
          to={href('/:recordType/:recordId/update', {
            recordType: record.recordType,
            recordId: record.id,
          })}
          variant='tertiary'
        >
          <FilePenIcon /> {t('divaClient_editRecordText')}
        </Button>
      )}
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
