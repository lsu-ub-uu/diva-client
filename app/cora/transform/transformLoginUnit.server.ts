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
  DataGroup,
  DataListWrapper,
  RecordWrapper,
} from '@/cora/cora-data/types.server';
import type { BFFLoginUnit } from '../bffTypes.server';
import {
  extractIdFromRecordInfo,
  extractLinkedRecordIdFromNamedRecordLink,
} from '@/cora/cora-data/CoraDataTransforms.server';
import { getFirstDataGroupWithNameInData } from '@/cora/cora-data/CoraDataUtils.server';

export const transformLoginUnits = (
  dataListWrapper: DataListWrapper,
): BFFLoginUnit[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecords = dataListWrapper.dataList.data;
  return coraRecords
    .map(transformCoraLoginUnitToBFFLoginUnit)
    .filter((item) => item !== undefined);
};

export const transformCoraLoginUnitToBFFLoginUnit = (
  coraRecordWrapper: RecordWrapper,
) => {
  const coraRecord = coraRecordWrapper.record;

  const dataRecordGroup = coraRecord.data;
  return transformRecordGroupLoginUnitToBFF(dataRecordGroup) as BFFLoginUnit;
};

const transformRecordGroupLoginUnitToBFF = (dataRecordGroup: DataGroup) => {
  return transformSingleLoginUnit(dataRecordGroup) as BFFLoginUnit;
};

const transformSingleLoginUnit = (dataRecordGroup: DataGroup) => {
  const id = extractIdFromRecordInfo(dataRecordGroup);
  const loginInfo = getFirstDataGroupWithNameInData(
    dataRecordGroup,
    'loginInfo',
  );
  const login = extractLinkedRecordIdFromNamedRecordLink(loginInfo, 'login');
  const loginDescription = extractLinkedRecordIdFromNamedRecordLink(
    loginInfo,
    'loginDescription',
  );
  return { id, login, loginDescription };
};
