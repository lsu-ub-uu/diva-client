import type { DataGroup } from '@/cora/cora-data/types.server';
import { LinkIcon, PublishFileIcon, UnpublishFileIcon } from '@/icons/icons';
import type { BFFUserRight } from '@/types/record';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { href, Link, useFetcher } from 'react-router';
import type { FormSchema } from '../FormGenerator/types';
import { IconButton } from '../IconButton/IconButton';
import { CircularLoader } from '../Loader/CircularLoader';
import { OutputPresentation } from './OutputPresentation';
import styles from './OutputPresentation.module.css';
import { OutputRecordLinkWithoutPresentation } from './OutputRecordLinkWithoutPresentation';

interface OutputRecordLinkWithPresentationProps {
  linkedRecordType: string;
  linkedRecordId: string;
  presentationRecordLinkId: string;
  hasReadAccess: boolean;
  actionButtons?: ReactNode;
  mode?: 'input' | 'output';
}

export const OutputRecordLinkWithPresentation = ({
  linkedRecordType,
  linkedRecordId,
  presentationRecordLinkId,
  hasReadAccess,
  actionButtons,
  mode = 'output',
}: OutputRecordLinkWithPresentationProps) => {
  const { data, load, state } = useFetcher();

  const loading = state === 'loading' && !data;

  useEffect(() => {
    load(
      `/linkedRecord/${linkedRecordType}/${linkedRecordId}?presentationRecordLinkId=${presentationRecordLinkId}`,
    );
  }, [load, linkedRecordType, linkedRecordId, presentationRecordLinkId]);

  if (loading) {
    return <CircularLoader />;
  }

  const dataGroup = data?.record?.record?.data as DataGroup;
  const presentation = data?.presentation as FormSchema;
  const userRights = (data?.userRights as BFFUserRight[]) ?? [];

  if (!dataGroup || !presentation) {
    return (
      <OutputRecordLinkWithoutPresentation
        linkedRecordType={linkedRecordType}
        linkedRecordId={linkedRecordId}
        hasReadAccess={hasReadAccess}
      />
    );
  }

  return (
    <div className={styles['record-link-with-presentation']}>
      <div className={styles['linked-presentation']}>
        <OutputPresentation formSchema={presentation} data={dataGroup} />
      </div>
      <div className={styles['action-buttons']}>
        {hasReadAccess && (
          <IconButton
            size='small'
            as={Link}
            tooltip={`${linkedRecordType}/${linkedRecordId}`}
            to={href('/:recordType/:recordId', {
              recordType: linkedRecordType,
              recordId: linkedRecordId,
            })}
          >
            <LinkIcon />
          </IconButton>
        )}
        {actionButtons}
        {linkedRecordType === 'binary' && mode === 'input' && (
          <BinaryLinkActionButtons
            userRights={userRights}
            binaryId={linkedRecordId}
          />
        )}
      </div>
    </div>
  );
};

interface BinaryLinkActionButtonsProps {
  userRights: BFFUserRight[];
  binaryId: string;
}

const BinaryLinkActionButtons = ({
  userRights,
  binaryId: linkedRecordId,
}: BinaryLinkActionButtonsProps) => {
  const { t } = useTranslation();
  const { submit, state, formAction } = useFetcher();

  const isPublishing = state !== 'idle' && formAction?.includes('/publish');
  const isUnpublishing = state !== 'idle' && formAction?.includes('/unpublish');

  const canPublish = userRights.includes('publish');
  const canUnpublish = userRights.includes('unpublish');

  return (
    <>
      {canPublish && (
        <IconButton
          size='small'
          tooltip={t('divaClient_publishBinaryText')}
          disabled={isPublishing}
          onClick={() => {
            submit(
              {},
              {
                method: 'post',
                action: href('/:recordType/:recordId/publish', {
                  recordType: 'binary',
                  recordId: linkedRecordId,
                }),
              },
            );
          }}
        >
          {isPublishing ? <CircularLoader /> : <PublishFileIcon />}
        </IconButton>
      )}
      {canUnpublish && (
        <IconButton
          size='small'
          tooltip={t('divaClient_unpublishBinaryText')}
          disabled={isUnpublishing}
          onClick={() => {
            submit(
              {},
              {
                method: 'post',
                action: href('/:recordType/:recordId/unpublish', {
                  recordType: 'binary',
                  recordId: linkedRecordId,
                }),
              },
            );
          }}
        >
          {isUnpublishing ? <CircularLoader /> : <UnpublishFileIcon />}
        </IconButton>
      )}
    </>
  );
};
