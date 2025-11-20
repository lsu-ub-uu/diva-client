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

import { Button } from '@/components/Button/Button';
import type { BFFDataRecord } from '@/types/record';
import { FilePenIcon, FileTextIcon, ShredderIcon } from 'lucide-react';
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
            variant='secondary'
            size='small'
            key={`${record.id}_rab_${userRight}`}
            as={Link}
            to={`/${record.recordType}/${record.id}`}
          >
            <FileTextIcon />
            {t('divaClient_viewRecordText')}
          </Button>
        );
      case 'update':
        return (
          <Button
            variant='secondary'
            size='small'
            key={`${record.id}_rab_${userRight}`}
            as={Link}
            to={`/${record.recordType}/${record.id}/update`}
          >
            <FilePenIcon />
            {t('divaClient_editRecordText')}
          </Button>
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
            <Button variant='secondary' type='submit' size='small'>
              <ShredderIcon />
              {t('divaClient_deleteRecordText')}
            </Button>
          </fetcher.Form>
        );
      default:
        return null;
    }
  });
};
