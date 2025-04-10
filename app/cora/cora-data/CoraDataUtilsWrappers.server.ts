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

import {
  containsChildWithNameInData,
  getAllDataAtomicsWithNameInData,
  getFirstDataAtomicWithNameInData,
  getFirstDataGroupWithNameInData,
  getFirstDataGroupWithNameInDataAndAttributes,
} from './CoraDataUtils.server';
import type { Attributes, DataGroup } from '@/cora/cora-data/types.server';

export function getFirstDataAtomicValueWithNameInData(
  dataGroup: DataGroup,
  nameInData: string,
): string {
  const dataAtomic = getFirstDataAtomicWithNameInData(dataGroup, nameInData);

  return dataAtomic.value;
}

export function getAllDataAtomicValuesWithNameInData(
  dataGroup: DataGroup,
  nameInData: string,
): string[] {
  const dataAtomics = getAllDataAtomicsWithNameInData(dataGroup, nameInData);
  return dataAtomics.map((dataAtomic) => {
    return dataAtomic.value;
  });
}

export const getOptionalAtomicValueByName = (
  childReference: DataGroup,
  nameInData: string,
) => {
  return containsChildWithNameInData(childReference, nameInData)
    ? getFirstDataAtomicValueWithNameInData(childReference, nameInData)
    : undefined;
};

export const extractFirstDataGroupWithAttributesFollowingNameInDatas = (
  dataGroup: DataGroup,
  nameInDatas: string[],
  attributesToMatch?: Attributes,
): DataGroup | undefined => {
  if (nameInDatas.length === 0 || dataGroup.children.length === 0) {
    return undefined;
  }

  const finalDataGroup = getFinalDataGroup(dataGroup, nameInDatas);

  if (finalDataGroup === undefined) {
    return undefined;
  }

  const lastNameInData = getLastNameInData(nameInDatas);
  return getFirstDataGroupWithNameInDataAndAttributes(
    finalDataGroup,
    lastNameInData,
    attributesToMatch,
  );
};
const getLastNameInData = (nameInDatas: string[]) => {
  return nameInDatas[nameInDatas.length - 1];
};

const getFinalDataGroup = (dataGroup: DataGroup, nameInDatas: string[]) => {
  if (nameInDatas.length === 1) {
    return dataGroup;
  }

  const firstNameInDatas = nameInDatas.slice(0, -1);
  return extractDataGroupFollowingNameInDatas(dataGroup, firstNameInDatas);
};

export const extractDataGroupFollowingNameInDatas = (
  dataGroup: DataGroup,
  nameInDatas: string[],
): DataGroup | undefined => {
  if (nameInDatas.length === 0 || dataGroup.children.length === 0) {
    return undefined;
  }

  const nextDataGroup = getFirstDataGroupWithNameInData(
    dataGroup,
    nameInDatas[0],
  );

  if (nameInDatas.length === 1 || nextDataGroup === undefined) {
    return nextDataGroup;
  }

  const nextNameInDatas = nameInDatas.slice(1);
  return extractDataGroupFollowingNameInDatas(nextDataGroup, nextNameInDatas);
};

export default {
  getFirstDataAtomicWithNameInData,
  getAllDataAtomicValuesWithNameInData,
  extractDataGroupFollowingNameInDatas,
  extractFirstDataGroupWithAttributesFollowingNameInDatas,
};
