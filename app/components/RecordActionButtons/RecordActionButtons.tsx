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

import { IconButton } from '@mui/material';
import { Link, useFetcher } from 'react-router';
import FeedIcon from '@mui/icons-material/Feed';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import type { BFFDataRecord } from '@/types/record';

interface RecordActionButtonProps {
  record: BFFDataRecord;
}

export const RecordActionButtons = ({ record }: RecordActionButtonProps) => {
  const fetcher = useFetcher();

  return record.userRights?.map((userRight) => {
    switch (userRight) {
      case 'read':
        return (
          <IconButton
            key={`${record.id}_rab_${userRight}`}
            component={Link}
            to={`/view/${record.recordType}/${record.id}`}
          >
            <FeedIcon />
          </IconButton>
        );
      case 'update':
        return (
          <IconButton
            key={`${record.id}_rab_${userRight}`}
            component={Link}
            to={`/update/${record.recordType}/${record.id}`}
          >
            <EditIcon />
          </IconButton>
        );
      case 'delete':
        return (
          <fetcher.Form
            key={`${record.id}_rab_${userRight}`}
            method='POST'
            action={`/delete/${record.recordType}/${record.id}`}
          >
            <IconButton type='submit'>
              <DeleteForeverIcon />
            </IconButton>
          </fetcher.Form>
        );
      default:
        return null;
    }
  });
};
