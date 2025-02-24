/*
 * Copyright 2025 Uppsala University Library
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

import type { DataListWrapper } from '@/cora/cora-data/types.server';
import type { BFFTheme } from '@/cora/transform/bffTypes.server';
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';

export const transformThemes = (
  dataListWrapper: DataListWrapper,
): BFFTheme[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecord = dataListWrapper.dataList.data;
  const backgroundColor = getFirstDataAtomicValueWithNameInData(
    coraRecord,
    'backgroundColor',
  );
  const textColor = getFirstDataAtomicValueWithNameInData(
    coraRecord,
    'textColor',
  );

  return {
    backgroundColor,
    textColor,
  };

  /*const data = recordWrapper.record.data;
  const backgroundColor = getFirstDataAtomicValueWithNameInData(
    data,
    'backgroundColor',
  );
  const textColor = getFirstDataAtomicValueWithNameInData(data, 'textColor');
  const binaryId = extractLinkedRecordIdFromNamedRecordLink(data, 'logo');
  const links = getAllDataAtomicsWithNameInData(data, 'link');

  const logoUrl = '';
  return {
    backgroundColor,
    textColor,
    logoUrl,
  };*/
};
