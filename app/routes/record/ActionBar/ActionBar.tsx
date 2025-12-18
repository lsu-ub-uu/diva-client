import { Button } from '@/components/Button/Button';
import {
  ConfirmDialog,
  useConfirmDialog,
} from '@/components/ConfirmDialog/ConfirmDialog';
import type { BFFDataRecord } from '@/types/record';
import clsx from 'clsx';
import {
  ArchiveRestoreIcon,
  BookCheckIcon,
  BookDashedIcon,
  CodeIcon,
  FilePenIcon,
  FileTextIcon,
  ShredderIcon,
  Trash2Icon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { href, Link, useFetcher, useMatches } from 'react-router';
import styles from './ActionBar.module.css';
import { CircularLoader } from '@/components/Loader/CircularLoader';

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
    matches.at(-1)?.id === 'routes/record/recordView' ||
    matches.at(-1)?.id === 'routes/divaOutput/divaOutputView';

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

  const untrashRecord = () => {
    fetcher.submit(
      {},
      {
        method: 'post',
        action: href('/:recordType/:recordId/untrash', {
          recordType: record.recordType,
          recordId: record.id,
        }),
      },
    );
  };

  const publishRecord = () => {
    fetcher.submit(
      {},
      {
        method: 'post',
        action: href('/:recordType/:recordId/publish', {
          recordType: record.recordType,
          recordId: record.id,
        }),
      },
    );
  };

  const unpublishRecord = () => {
    fetcher.submit(
      {},
      {
        method: 'post',
        action: href('/:recordType/:recordId/unpublish', {
          recordType: record.recordType,
          recordId: record.id,
        }),
      },
    );
  };

  const isDeleting =
    fetcher.state !== 'idle' && fetcher.formAction?.includes('/delete');
  const isTrashing =
    fetcher.state !== 'idle' && fetcher.formAction?.includes('/trash');
  const isUntrashing =
    fetcher.state !== 'idle' && fetcher.formAction?.includes('/untrash');
  const isPublishing =
    fetcher.state !== 'idle' && fetcher.formAction?.includes('/publish');
  const isUnpublishing =
    fetcher.state !== 'idle' && fetcher.formAction?.includes('/unpublish');

  return (
    <div className={clsx(styles['action-bar'], className)}>
      {!isOnViewPage && record.userRights?.includes('read') && (
        <div className={styles['action-bar-button']}>
          <Button
            as={Link}
            to={href('/:recordType/:recordId', {
              recordType: record.recordType,
              recordId: record.id,
            })}
            size='small'
            variant='tertiary'
          >
            <FileTextIcon /> {t('divaClient_viewRecordText')}
          </Button>
        </div>
      )}
      {!isOnUpdatePage && record.userRights?.includes('update') && (
        <div className={styles['action-bar-button']}>
          <Button
            as={Link}
            to={href('/:recordType/:recordId/update', {
              recordType: record.recordType,
              recordId: record.id,
            })}
            variant='tertiary'
            size='small'
          >
            <FilePenIcon /> {t('divaClient_editRecordText')}
          </Button>
        </div>
      )}
      {record.userRights?.includes('publish') && (
        <div className={styles['action-bar-button']}>
          <Button
            variant='tertiary'
            size='small'
            onClick={publishRecord}
            disabled={isPublishing || isUnpublishing}
          >
            {isPublishing ? <CircularLoader /> : <BookCheckIcon />}
            {t('divaClient_publishRecordText')}
          </Button>
        </div>
      )}
      {record.userRights?.includes('unpublish') && (
        <div className={styles['action-bar-button']}>
          <Button
            variant='tertiary'
            size='small'
            onClick={unpublishRecord}
            disabled={isPublishing || isUnpublishing}
          >
            {isUnpublishing ? <CircularLoader /> : <BookDashedIcon />}
            {t('divaClient_unpublishRecordText')}
          </Button>
        </div>
      )}

      {record.userRights?.includes('trash') && (
        <div className={styles['action-bar-button']}>
          <Button
            variant='tertiary'
            size='small'
            onClick={() => showTrashConfirmDialog(trashRecord)}
          >
            {isTrashing ? <CircularLoader /> : <Trash2Icon />}
            {t('divaClient_trashRecordText')}
          </Button>
          <ConfirmDialog
            headingText={t('divaClient_confirmTrashHeadingText')}
            messageText={t('divaClient_confirmTrashText')}
            confirmButtonText={
              <>
                {t('divaClient_trashRecordText')}
                <Trash2Icon />
              </>
            }
            cancelButtonText={t('divaClient_cancelText')}
            ref={trashConfirmDialogRef}
          />
        </div>
      )}
      {record.userRights?.includes('untrash') && (
        <div className={styles['action-bar-button']}>
          <Button variant='tertiary' size='small' onClick={untrashRecord}>
            {isUntrashing ? <CircularLoader /> : <ArchiveRestoreIcon />}
            {t('divaClient_untrashButtonText')}
          </Button>
        </div>
      )}
      {record.userRights?.includes('delete') && (
        <div className={styles['action-bar-button']}>
          <Button
            variant='tertiary'
            size='small'
            onClick={() => showDeleteConfirmDialog(deleteRecord)}
          >
            {isDeleting ? <CircularLoader /> : <ShredderIcon />}
            {t('divaClient_deleteRecordText')}
          </Button>
          <ConfirmDialog
            headingText={t('divaClient_confirmDeleteHeadingText')}
            messageText={t('divaClient_confirmDeleteText')}
            confirmButtonText={
              <>
                {t('divaClient_deleteRecordText')} <ShredderIcon />
              </>
            }
            cancelButtonText={t('divaClient_cancelText')}
            ref={deleteConfirmDialogRef}
          />
        </div>
      )}
      {apiUrl && (
        <div className={styles['action-bar-button']}>
          <Button
            size='small'
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
