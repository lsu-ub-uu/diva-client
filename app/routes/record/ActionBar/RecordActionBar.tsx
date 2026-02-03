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
          icon={<FileTextIcon />}
        >
          {t('divaClient_viewRecordText')}
        </ActionBarButton>
      )}
      {!isOnUpdatePage && record.userRights?.includes('update') && (
        <ActionBarButton
          as={Link}
          to={href('/:recordType/:recordId/update', {
            recordType: record.recordType,
            recordId: record.id,
          })}
          icon={<FilePenIcon />}
        >
          {t('divaClient_editRecordText')}
        </ActionBarButton>
      )}
      {record.userRights?.includes('publish') && (
        <ActionBarButton
          onAction={publishRecord}
          disabled={isPublishing || isUnpublishing}
          icon={<BookCheckIcon />}
          pending={isPublishing}
        >
          ´ {t('divaClient_publishRecordText')}
        </ActionBarButton>
      )}
      {record.userRights?.includes('unpublish') && (
        <ActionBarButton
          onAction={unpublishRecord}
          disabled={isPublishing || isUnpublishing}
          icon={<BookDashedIcon />}
          pending={isUnpublishing}
        >
          {t('divaClient_unpublishRecordText')}
        </ActionBarButton>
      )}

      {record.userRights?.includes('trash') && (
        <ActionBarButton
          onAction={trashRecord}
          icon={<Trash2Icon />}
          pending={isTrashing}
          confirmDialog={{
            headingText: t('divaClient_confirmTrashHeadingText'),
            messageText: t('divaClient_confirmTrashText'),
            confirmButtonText: t('divaClient_trashRecordText'),
          }}
        >
          {t('divaClient_trashRecordText')}
        </ActionBarButton>
      )}
      {record.userRights?.includes('untrash') && (
        <ActionBarButton
          onAction={untrashRecord}
          icon={<ArchiveRestoreIcon />}
          pending={isUntrashing}
        >
          {t('divaClient_untrashButtonText')}
        </ActionBarButton>
      )}
      {record.userRights?.includes('delete') && (
        <ActionBarButton
          onAction={deleteRecord}
          icon={<ShredderIcon />}
          pending={isDeleting}
          confirmDialog={{
            headingText: t('divaClient_confirmDeleteHeadingText'),
            messageText: t('divaClient_confirmDeleteText'),
            confirmButtonText: t('divaClient_deleteRecordText'),
          }}
        >
          {t('divaClient_deleteRecordText')}
        </ActionBarButton>
      )}
      {apiUrl && (
        <ActionBarButton
          as='a'
          href={apiUrl}
          target='_blank'
          rel='noopener noreferrer'
          icon={<CodeIcon />}
        >
          {t('divaClient_viewInApiText')}
        </ActionBarButton>
      )}
    </ActionBar>
  );
};
