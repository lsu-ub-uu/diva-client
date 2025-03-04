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

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LinkedRecordForm } from '@/components/Form/LinkedRecordForm';
import { useFetcher } from 'react-router';
import type { loader } from '@/routes/getRecord';
import { CircularLoader } from '@/components/Loader/CircularLoader';

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
  const { t } = useTranslation();
  const { load, data, state } = useFetcher<typeof loader>();
  const isLoading = state === 'loading';
  const record = state === 'idle' && data?.record;
  const error = state === 'idle' && data?.error;

  useEffect(() => {
    load(
      `/record/${recordType}/${id}?presentationRecordLinkId=${presentationRecordLinkId}`,
    );
  }, [load, recordType, id, presentationRecordLinkId]);

  if (isLoading) {
    return (
      <div>
        {t('divaClient_loadingText')} <CircularLoader />
      </div>
    );
  }

  if (error) {
    return <div>{t('divaClient_FailedToGetRecordText')}</div>;
  }

  if (record) {
    return <LinkedRecordForm record={record} />;
  }
};
