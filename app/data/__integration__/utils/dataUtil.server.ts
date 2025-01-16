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

import type {
  DataGroup,
  RecordWrapper,
} from '@/cora/cora-data/CoraData.server';
import {
  getFirstChildWithNameInData,
  getFirstDataAtomicWithNameInData,
} from '@/cora/cora-data/CoraDataUtils.server';
import { deleteRecordDataById } from '@/cora/deleteRecordDataById.server';
import { postRecordData } from '@/cora/postRecordData.server';

export interface CreatedRecord {
  id: string;
  tsCreated: string;
  updated: DataGroup;
}

export const createDivaOutput = async (
  payload: DataGroup,
  authToken: string,
): Promise<CreatedRecord> => {
  const response = await postRecordData(payload, 'diva-output', authToken);
  const record = response.data as RecordWrapper;
  const recordInfo = getFirstChildWithNameInData(
    record.record.data,
    'recordInfo',
  ) as DataGroup;
  const id = getFirstDataAtomicWithNameInData(recordInfo, 'id');
  const tsCreated = getFirstDataAtomicWithNameInData(recordInfo, 'tsCreated');
  const updated = getFirstChildWithNameInData(
    recordInfo,
    'updated',
  ) as DataGroup;
  return { id: id.value, tsCreated: tsCreated.value, updated };
};

export const deleteDivaOutput = (recordId: string, authToken: string) => {
  return deleteRecordDataById(recordId, 'diva-output', authToken);
};
