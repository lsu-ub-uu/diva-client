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
  FilePenIcon,
  FileTextIcon,
  ShredderIcon,
  Trash2Icon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '../IconButton/IconButton';

interface RecordActionButtonProps {
  record: BFFDataRecord;
}

export const RecordActionButtons = ({ record }: RecordActionButtonProps) => {
  const { t } = useTranslation();
  const fetcher = useFetcher();

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
      case 'delete':
        return (
          <fetcher.Form
            key={`${record.id}_rab_${userRight}`}
            method='POST'
            action={`/${record.recordType}/${record.id}/delete`}
            onSubmit={(e) => {
              if (!window.confirm(t('divaClient_confirmDeleteText'))) {
                e.preventDefault();
              }
            }}
          >
            <IconButton
              type='submit'
              size='small'
              tooltip={t('divaClient_deleteRecordText')}
            >
              <ShredderIcon />
            </IconButton>
          </fetcher.Form>
        );
      case 'trash':
        return (
          <fetcher.Form
            key={`${record.id}_rab_${userRight}`}
            method='POST'
            action={`/${record.recordType}/${record.id}/trash`}
            onSubmit={(e) => {
              if (!window.confirm(t('divaClient_confirmTrashText'))) {
                e.preventDefault();
              }
            }}
          >
            <IconButton
              type='submit'
              size='small'
              tooltip={t('divaClient_trashRecordText')}
            >
              <Trash2Icon />
            </IconButton>
          </fetcher.Form>
        );
      default:
        return null;
    }
  });
};
