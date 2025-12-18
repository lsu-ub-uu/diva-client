/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import { Link, useFetcher } from 'react-router';

import type { BFFDataRecord } from '@/types/record';
import {
  ArchiveRestoreIcon,
  BookCheckIcon,
  BookDashedIcon,
  FilePenIcon,
  FileTextIcon,
  ShredderIcon,
  Trash2Icon,
} from 'lucide-react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { href } from 'react-router';
import {
  ConfirmDialog,
  useConfirmDialog,
} from '../ConfirmDialog/ConfirmDialog';
import { IconButton } from '../IconButton/IconButton';
import { CircularLoader } from '../Loader/CircularLoader';

interface RecordActionButtonProps {
  record: BFFDataRecord;
}

export const RecordActionButtons = ({ record }: RecordActionButtonProps) => {
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

  const deleteRecord = () => {
    fetcher.submit(null, {
      method: 'post',
      action: `/${record.recordType}/${record.id}/delete`,
    });
  };

  const trashRecord = () => {
    fetcher.submit(null, {
      method: 'post',
      action: `/${record.recordType}/${record.id}/trash`,
    });
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
    fetcher.submit(null, {
      method: 'post',
      action: `/${record.recordType}/${record.id}/publish`,
    });
  };

  const unpublishRecord = () => {
    fetcher.submit(null, {
      method: 'post',
      action: `/${record.recordType}/${record.id}/unpublish`,
    });
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

  return record.userRights?.map((userRight) => {
    switch (userRight) {
      case 'read':
        return (
          <IconButton
            size='small'
            key={`${record.id}_rab_${userRight}`}
            as={Link}
            to={`/${record.recordType}/${record.id}`}
            tooltip={t('divaClient_viewRecordText')}
          >
            <FileTextIcon />
          </IconButton>
        );
      case 'update':
        return (
          <IconButton
            size='small'
            key={`${record.id}_rab_${userRight}`}
            as={Link}
            to={`/${record.recordType}/${record.id}/update`}
            tooltip={t('divaClient_editRecordText')}
          >
            <FilePenIcon />
          </IconButton>
        );
      case 'publish':
        return (
          <IconButton
            size='small'
            key={`${record.id}_rab_${userRight}`}
            tooltip={t('divaClient_publishRecordText')}
            onClick={publishRecord}
          >
            {isPublishing ? <CircularLoader /> : <BookCheckIcon />}
          </IconButton>
        );
      case 'unpublish':
        return (
          <IconButton
            size='small'
            key={`${record.id}_rab_${userRight}`}
            tooltip={t('divaClient_unpublishRecordText')}
            onClick={unpublishRecord}
          >
            {isUnpublishing ? <CircularLoader /> : <BookDashedIcon />}
          </IconButton>
        );
      case 'delete':
        return (
          <Fragment key={`${record.id}_rab_${userRight}`}>
            <IconButton
              size='small'
              tooltip={t('divaClient_deleteRecordText')}
              onClick={() => showDeleteConfirmDialog(deleteRecord)}
            >
              {isDeleting ? <CircularLoader /> : <ShredderIcon />}
            </IconButton>
            <ConfirmDialog
              headingText={t('divaClient_confirmDeleteHeadingText')}
              messageText={t('divaClient_confirmDeleteText')}
              confirmButtonText={
                <>
                  {t('divaClient_deleteRecordText')}
                  <ShredderIcon />
                </>
              }
              cancelButtonText={t('divaClient_cancelText')}
              ref={deleteConfirmDialogRef}
            />
          </Fragment>
        );
      case 'trash':
        return (
          <Fragment key={`${record.id}_rab_${userRight}`}>
            <IconButton
              size='small'
              tooltip={t('divaClient_trashRecordText')}
              onClick={() => showTrashConfirmDialog(trashRecord)}
            >
              {isTrashing ? <CircularLoader /> : <Trash2Icon />}
            </IconButton>
            <ConfirmDialog
              headingText={t('divaClient_confirmTrashHeadingText')}
              messageText={t('divaClient_confirmTrashText')}
              confirmButtonText={
                <>
                  {t('divaClient_trashRecordText')} <Trash2Icon />
                </>
              }
              cancelButtonText={t('divaClient_cancelText')}
              ref={trashConfirmDialogRef}
            />
          </Fragment>
        );
      case 'untrash':
        return (
          <IconButton
            size='small'
            key={`${record.id}_rab_${userRight}`}
            tooltip={t('divaClient_untrashButtonText')}
            onClick={untrashRecord}
          >
            {isUntrashing ? <CircularLoader /> : <ArchiveRestoreIcon />}
          </IconButton>
        );
      default:
        return null;
    }
  });
};
