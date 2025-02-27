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
import { ArticleIcon, DeleteForeverIcon, EditDocumentIcon } from '@/icons';
import { Button } from '@/components/Button/Button';
import { useTranslation } from 'react-i18next';

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
          <Button
            variant='icon'
            key={`${record.id}_rab_${userRight}`}
            as={Link}
            to={`/view/${record.recordType}/${record.id}`}
            aria-label={t('divaClient_viewRecordText')}
          >
            <ArticleIcon />
          </Button>
        );
      case 'update':
        return (
          <Button
            variant='icon'
            key={`${record.id}_rab_${userRight}`}
            as={Link}
            to={`/update/${record.recordType}/${record.id}`}
            aria-label={t('divaClient_editRecordText')}
          >
            <EditDocumentIcon />
          </Button>
        );
      case 'delete':
        return (
          <fetcher.Form
            key={`${record.id}_rab_${userRight}`}
            method='POST'
            action={`/delete/${record.recordType}/${record.id}`}
          >
            <Button
              variant='icon'
              type='submit'
              aria-label={t('divaClient_deleteRecordText')}
            >
              <DeleteForeverIcon />
            </Button>
          </fetcher.Form>
        );
      default:
        return null;
    }
  });
};
