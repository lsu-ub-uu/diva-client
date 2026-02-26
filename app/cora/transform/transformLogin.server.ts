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

import type {
  DataListWrapper,
  RecordWrapper,
} from '@/cora/cora-data/types.server';
import type { BFFLoginPassword, BFFLoginWebRedirect } from '../bffTypes.server';
import {
  extractIdFromRecordInfo,
  extractLinkedRecordIdFromNamedRecordLink,
} from '@/cora/cora-data/CoraDataTransforms.server';
import { getAllDataAtomicValueFromDataGroup } from '@/cora/cora-data/CoraDataUtils.server';

export const transformLogin = (
  dataListWrapper: DataListWrapper,
): (BFFLoginWebRedirect | BFFLoginPassword)[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecords = dataListWrapper.dataList.data;
  return coraRecords
    .map(transformCoraLoginToBFFLogin)
    .filter((item) => item !== undefined);
};

const transformCoraLoginToBFFLogin = (
  coraRecordWrapper: RecordWrapper,
): BFFLoginWebRedirect | BFFLoginPassword => {
  const coraRecord = coraRecordWrapper.record;

  const dataRecordGroup = coraRecord.data;

  const { attributes } = dataRecordGroup;
  const type = attributes?.type as string;
  const id = extractIdFromRecordInfo(dataRecordGroup);

  const getValues = getAllDataAtomicValueFromDataGroup(dataRecordGroup);

  let getMetadataAndPresentation;
  if (type === 'password') {
    const viewDefinition = extractLinkedRecordIdFromNamedRecordLink(
      dataRecordGroup,
      'viewDefinition',
    );
    const viewPresentation = extractLinkedRecordIdFromNamedRecordLink(
      dataRecordGroup,
      'viewPresentation',
    );
    getMetadataAndPresentation = { viewDefinition, viewPresentation };
  }
  return { id, type, ...getValues, ...getMetadataAndPresentation } as
    | BFFLoginWebRedirect
    | BFFLoginPassword;
};
