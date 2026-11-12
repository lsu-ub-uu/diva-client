import { Button } from '@/components/Button/Button';
import type { UserRightActionLink } from '@/data/getUserRightsForRecordType.server';
import {
  ChevronDownIcon,
  CodeXmlIcon,
  EllipsisIcon,
  FilePenIcon,
  FileTextIcon,
} from '@/icons/icons';
import type { BFFDataRecord } from '@/types/record';
import { useTranslation } from 'react-i18next';
import { href, Link, useMatches } from 'react-router';
import { ActionBar } from './ActionBar';
import { ActionBarButton } from './ActionBarButton';
import { RecordActionMenu } from './RecordActionMenu';
import { useUser } from '@/utils/rootLoaderDataUtils';
import styles from './ActionBar.module.css';

interface ActionBarProps {
  record: BFFDataRecord;
  recordTypeUserRights: UserRightActionLink[];
  className?: string;
  apiUrl: string;
}
export const RecordActionBar = ({
  record,
  className,
  recordTypeUserRights,
  apiUrl,
}: ActionBarProps) => {
  const matches = useMatches();
  const { t } = useTranslation();
  const user = useUser();

  const isOnUpdatePage = matches.at(-1)?.id === 'routes/record/recordUpdate';
  const isOnViewPage =
    matches.at(-1)?.id === 'routes/record/recordView' ||
    matches.at(-1)?.id === 'routes/divaOutput/divaOutputView';
  const recordUserRights = record.userRights ?? [];

  if (!user) {
    return (
      <Button
        as='a'
        variant='tertiary'
        href={apiUrl}
        target='_blank'
        rel='noopener noreferrer nofollow'
        size='small'
      >
        <CodeXmlIcon />
        {t('divaClient_viewInApiText')}
      </Button>
    );
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

      <ActionBarButton
        as='a'
        variant='tertiary'
        href={apiUrl}
        target='_blank'
        rel='noopener noreferrer nofollow'
        icon={<CodeXmlIcon />}
      >
        {t('divaClient_viewInApiText')}
      </ActionBarButton>
      <div className={styles['action-bar-button']}>
        <RecordActionMenu
          record={record}
          recordTypeUserRights={recordTypeUserRights}
          excludeActions={['view', 'update']}
        >
          <EllipsisIcon />
          <span className={styles['action-bar-button-text']}>
            {t('divaClient_moreNavigationText')}
          </span>
          <ChevronDownIcon />
        </RecordActionMenu>
      </div>
    </ActionBar>
  );
};
