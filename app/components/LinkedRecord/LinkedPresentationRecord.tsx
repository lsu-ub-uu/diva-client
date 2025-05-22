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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { LinkedRecordForm } from '@/components/Form/LinkedRecordForm';
import type { loader } from '@/routes/resourceRoutes/getRecord';
import { useEffect } from 'react';
import { useFetcher } from 'react-router';
import styles from './LinkedPresentationRecord.module.css';

interface LinkedRecordProps {
  recordType: string;
  id: string;
  presentationRecordLinkId: string;
}

export const LinkedRecord = ({
  recordType,
  id,
  presentationRecordLinkId,
}: LinkedRecordProps) => {
  const { load, data, state } = useFetcher<typeof loader>();
  const record = state === 'idle' && data?.record;

  useEffect(() => {
    load(
      `/record/${recordType}/${id}?presentationRecordLinkId=${presentationRecordLinkId}`,
    );
  }, [load, recordType, id, presentationRecordLinkId]);

  if (record) {
    return (
      <div className={styles['linked-record-wrapper']}>
        <LinkedRecordForm record={record} />
      </div>
    );
  }
};
