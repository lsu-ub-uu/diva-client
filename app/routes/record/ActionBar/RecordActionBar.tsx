import {
  ArchiveRestoreIcon,
  ChevronDownIcon,
  CopyPlusIcon,
  EllipsisIcon,
  FilePenIcon,
  FileTextIcon,
  OldRecordIcon,
  PublishIcon,
  ShredderIcon,
  Trash2Icon,
  UnpublishIcon,
} from '@/icons/icons';
import { Menu, useMenu } from '@/components/Menu/Menu';
import { MenuItem } from '@/components/Menu/MenuItem';
import type { UserRightActionLink } from '@/data/getUserRightsForRecordType.server';
import type { BFFDataRecord } from '@/types/record';
import { useTranslation } from 'react-i18next';
import { href, Link, useFetcher, useMatches } from 'react-router';
import { ActionBar } from './ActionBar';
import { ActionBarButton } from './ActionBarButton';
import { RecordActionMenu, type RecordMenuAction } from './RecordActionMenu';

interface ActionBarProps {
  record: BFFDataRecord;
  recordTypeUserRights: UserRightActionLink[];
  className?: string;
}
export const RecordActionBar = ({
  record,
  className,
  recordTypeUserRights,
}: ActionBarProps) => {
  const matches = useMatches();
  const { t } = useTranslation();
  const isOnUpdatePage = matches.at(-1)?.id === 'routes/record/recordUpdate';
  const isOnViewPage =
    matches.at(-1)?.id === 'routes/record/recordView' ||
    matches.at(-1)?.id === 'routes/divaOutput/divaOutputView';
  const recordUserRights = record.userRights ?? [];

  const hasActions =
    (isOnUpdatePage && recordUserRights.includes('update')) ||
    (!isOnViewPage && recordUserRights.includes('read')) ||
    (!isOnUpdatePage && recordUserRights.includes('update')) ||
    recordTypeUserRights.includes('create') ||
    recordUserRights.includes('create') ||
    recordUserRights.includes('publish') ||
    recordUserRights.includes('unpublish') ||
    recordUserRights.includes('trash') ||
    recordUserRights.includes('untrash') ||
    recordUserRights.includes('delete') ||
    recordUserRights.includes('viewOldRecord');

  if (!hasActions) {
    return null;
  }

  return (
    <ActionBar className={className}>
      {!isOnUpdatePage && recordUserRights.includes('update') && (
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
      {!isOnViewPage && recordUserRights.includes('read') && (
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

      <RecordActionMenu
        record={record}
        recordTypeUserRights={recordTypeUserRights}
        excludeActions={['view', 'update']}
      >
        <EllipsisIcon /> {t('divaClient_moreNavigationText')}{' '}
        <ChevronDownIcon />
      </RecordActionMenu>
    </ActionBar>
  );
};
