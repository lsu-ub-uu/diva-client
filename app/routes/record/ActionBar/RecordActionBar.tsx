import { Button } from '@/components/Button/Button';
import type { UserRightActionLink } from '@/data/getUserRightsForRecordType.server';
import { ApiIcon, ClassicQualityIcon, EditIcon, ViewIcon } from '@/icons/icons';
import type { BFFDataRecord } from '@/types/record';
import { useUser } from '@/utils/rootLoaderDataUtils';
import { useTranslation } from 'react-i18next';
import { href, Link, useFetcher, useMatches } from 'react-router';
import { ActionBar } from './ActionBar';
import styles from './ActionBar.module.css';
import { ActionBarButton } from './ActionBarButton';
import { RecordActionMenu } from './RecordActionMenu';

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
  const convertFetcher = useFetcher();

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
        <ApiIcon />
        {t('divaClient_viewInApiText')}
      </Button>
    );
  }

  return (
    <ActionBar className={className} data-testid='record-action-bar'>
      {record.recordType === 'diva-output' &&
        recordUserRights.includes('update') &&
        record.validationType.startsWith('classic_') && (
          <ActionBarButton
            icon={<ClassicQualityIcon />}
            pending={convertFetcher.state !== 'idle'}
            onAction={() =>
              convertFetcher.submit(
                { intent: 'convertClassicValidationType' },
                {
                  method: 'post',
                  action: href('/:recordType/:recordId/update', {
                    recordType: record.recordType,
                    recordId: record.id,
                  }),
                },
              )
            }
            confirmDialog={
              isOnUpdatePage
                ? {
                    headingText: t(
                      'divaClient_confirmConvertClassicHeadingText',
                      {
                        defaultValue: 'Convert saved record?',
                      },
                    ),
                    messageText: t('divaClient_confirmConvertClassicText', {
                      defaultValue:
                        'This converts the saved record. Unsaved changes may be lost.',
                    }),
                    confirmButtonText: t(
                      'divaClient_convertClassicValidationTypeText',
                      {
                        defaultValue: 'Convert to 2026',
                      },
                    ),
                    cancelButtonText: t('divaClient_cancelText'),
                  }
                : undefined
            }
          >
            {t('divaClient_convertClassicValidationTypeText', {
              defaultValue: 'Convert to 2026',
            })}
          </ActionBarButton>
        )}
      {!isOnUpdatePage && recordUserRights.includes('update') && (
        <ActionBarButton
          as={Link}
          to={href('/:recordType/:recordId/update', {
            recordType: record.recordType,
            recordId: record.id,
          })}
          icon={<EditIcon />}
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
          icon={<ViewIcon />}
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
        icon={<ApiIcon />}
      >
        {t('divaClient_viewInApiText')}
      </ActionBarButton>
      <div className={styles['action-bar-button']}>
        <RecordActionMenu
          record={record}
          recordTypeUserRights={recordTypeUserRights}
          variant='actionBar'
        />
      </div>
    </ActionBar>
  );
};
