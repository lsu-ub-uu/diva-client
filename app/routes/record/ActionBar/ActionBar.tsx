import { Button } from '@/components/Button/Button';
import type { BFFDataRecord } from '@/types/record';
import {
  CodeIcon,
  FilePenIcon,
  FileTextIcon,
  ShredderIcon,
  Trash2Icon,
  XIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { href, Link, useFetcher, useMatches, useNavigate } from 'react-router';
import styles from './ActionBar.module.css';
import clsx from 'clsx';
import {
  ConfirmDialog,
  useConfirmDialog,
} from '@/components/ConfirmDialog/ConfirmDialog';

interface ActionBarProps {
  record: BFFDataRecord;
  apiUrl?: string;
  className?: string;
}
export const ActionBar = ({ record, apiUrl, className }: ActionBarProps) => {
  const matches = useMatches();
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const {
    showConfirmDialog: showDeleteConfirmDialog,
    confirmDialogRef: deleteConfirmDialogRef,
  } = useConfirmDialog();

  const {
    showConfirmDialog: showTrashConfirmDialog,
    confirmDialogRef: trashConfirmDialogRef,
  } = useConfirmDialog();

  const isOnUpdatePage = matches.at(-1)?.id === 'routes/record/recordUpdate';
  const isOnViewPage =
    matches.at(-1)?.id === 'routes/record/record' ||
    matches.at(-1)?.id === 'routes/divaOutput/divaOutputView';

  function isInTrashBin() {
    const rootGroup = Object.values(record.data)[0];
    return rootGroup.recordInfo?.inTrashBin?.value === 'true';
  }

  const deleteRecord = () => {
    fetcher.submit(
      { redirect: true },
      {
        method: 'post',
        action: `/${record.recordType}/${record.id}/delete`,
      },
    );
  };

  const trashRecord = () => {
    fetcher.submit(
      { redirect: true },
      {
        method: 'post',
        action: `/${record.recordType}/${record.id}/trash`,
      },
    );
  };

  return (
    <div className={clsx(styles['action-bar'], className)}>
      {isOnUpdatePage && (
        <div className={styles['action-bar-button']}>
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
        </div>
      )}
      {isOnViewPage && record.userRights?.includes('update') && (
        <div className={styles['action-bar-button']}>
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
        </div>
      )}
      {record.userRights?.includes('delete') && (
        <div className={styles['action-bar-button']}>
          <Button
            type='submit'
            variant='tertiary'
            onClick={() => showDeleteConfirmDialog(deleteRecord)}
          >
            <ShredderIcon />
            {t('divaClient_deleteRecordText')}
          </Button>
          <ConfirmDialog
            headingText={t('divaClient_confirmDeleteHeadingText')}
            messageText={t('divaClient_confirmDeleteText')}
            confirmButtonText={
              <>
                {t('divaClient_confirmText')} <ShredderIcon />
              </>
            }
            cancelButtonText={<>{t('divaClient_cancelText')}</>}
            ref={deleteConfirmDialogRef}
          />
        </div>
      )}
      {!isInTrashBin() && record.userRights?.includes('trash') && (
        <div className={styles['action-bar-button']}>
          <Button
            type='submit'
            variant='tertiary'
            onClick={() => showTrashConfirmDialog(trashRecord)}
          >
            <Trash2Icon />
            {t('divaClient_trashRecordText')}
          </Button>
          <ConfirmDialog
            headingText={t('divaClient_confirmTrashHeadingText')}
            messageText={t('divaClient_confirmTrashText')}
            confirmButtonText={
              <>
                {t('divaClient_confirmText')}
                <Trash2Icon />
              </>
            }
            cancelButtonText={<>{t('divaClient_cancelText')}</>}
            ref={trashConfirmDialogRef}
          />
        </div>
      )}
      {apiUrl && (
        <div className={styles['action-bar-button']}>
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
        </div>
      )}
    </div>
  );
};
