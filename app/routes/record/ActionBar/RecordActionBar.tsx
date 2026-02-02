import {
  ConfirmDialog,
  useConfirmDialog,
} from '@/components/ConfirmDialog/ConfirmDialog';
import { CircularLoader } from '@/components/Loader/CircularLoader';
import type { BFFDataRecord } from '@/types/record';
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
import { ActionBar } from './ActionBar';
import { ActionBarButton } from './ActionBarButton';

interface ActionBarProps {
  record: BFFDataRecord;
  apiUrl?: string;
  className?: string;
}
export const RecordActionBar = ({
  record,
  apiUrl,
  className,
}: ActionBarProps) => {
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
    <ActionBar className={className}>
      {!isOnViewPage && record.userRights?.includes('read') && (
        <ActionBarButton
          as={Link}
          to={href('/:recordType/:recordId', {
            recordType: record.recordType,
            recordId: record.id,
          })}
        >
          <FileTextIcon /> {t('divaClient_viewRecordText')}
        </ActionBarButton>
      )}
      {!isOnUpdatePage && record.userRights?.includes('update') && (
        <ActionBarButton
          as={Link}
          to={href('/:recordType/:recordId/update', {
            recordType: record.recordType,
            recordId: record.id,
          })}
        >
          <FilePenIcon /> {t('divaClient_editRecordText')}
        </ActionBarButton>
      )}
      {record.userRights?.includes('publish') && (
        <ActionBarButton
          onClick={publishRecord}
          disabled={isPublishing || isUnpublishing}
        >
          {isPublishing ? <CircularLoader /> : <BookCheckIcon />}
          {t('divaClient_publishRecordText')}
        </ActionBarButton>
      )}
      {record.userRights?.includes('unpublish') && (
        <ActionBarButton
          onClick={unpublishRecord}
          disabled={isPublishing || isUnpublishing}
        >
          {isUnpublishing ? <CircularLoader /> : <BookDashedIcon />}
          {t('divaClient_unpublishRecordText')}
        </ActionBarButton>
      )}

      {record.userRights?.includes('trash') && (
        <ActionBarButton onClick={() => showTrashConfirmDialog(trashRecord)}>
          {isTrashing ? <CircularLoader /> : <Trash2Icon />}
          {t('divaClient_trashRecordText')}
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
        </ActionBarButton>
      )}
      {record.userRights?.includes('untrash') && (
        <ActionBarButton onClick={untrashRecord}>
          {isUntrashing ? <CircularLoader /> : <ArchiveRestoreIcon />}
          {t('divaClient_untrashButtonText')}
        </ActionBarButton>
      )}
      {record.userRights?.includes('delete') && (
        <ActionBarButton onClick={() => showDeleteConfirmDialog(deleteRecord)}>
          {isDeleting ? <CircularLoader /> : <ShredderIcon />}
          {t('divaClient_deleteRecordText')}
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
        </ActionBarButton>
      )}
      {apiUrl && (
        <ActionBarButton
          as='a'
          href={apiUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          <CodeIcon />
          {t('divaClient_viewInApiText')}
        </ActionBarButton>
      )}
    </ActionBar>
  );
};
