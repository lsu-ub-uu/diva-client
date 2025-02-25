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

import type {
  DataGroup,
  DataListWrapper,
  RecordWrapper,
} from '@/cora/cora-data/types.server';
import type { BFFTheme } from '@/cora/transform/bffTypes.server';
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import {
  getAllDataAtomicsWithNameInData,
  getAllDataGroupsWithNameInDataAndAttributes,
  getFirstDataGroupWithNameInData,
  getFirstResourceLinkWithNameInData,
  hasChildWithNameInData,
} from '@/cora/cora-data/CoraDataUtils.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import { fetchLinkedRecordForRecordLinkWithNameInData } from '@/cora/cora-data/CoraDataTransforms.server';

export const transformThemes = (
  dataListWrapper: DataListWrapper,
): Promise<BFFTheme[]> => {
  return Promise.all(dataListWrapper.dataList.data.map(transformTheme));
};

const transformTheme = async (
  recordWrapper: RecordWrapper,
): Promise<BFFTheme> => {
  const data = recordWrapper.record.data;
  return removeEmpty({
    id: getFirstDataAtomicValueWithNameInData(
      getFirstDataGroupWithNameInData(data, 'recordInfo'),
      'id',
    ),
    pageTitle: {
      sv: getFirstDataAtomicValueWithNameInData(data, 'pageTitleSv'),
      en: getFirstDataAtomicValueWithNameInData(data, 'pageTitleEn'),
    },
    backgroundColor: getFirstDataAtomicValueWithNameInData(
      data,
      'backgroundColor',
    ),
    textColor: getFirstDataAtomicValueWithNameInData(data, 'textColor'),
    logo: {
      svg: hasChildWithNameInData(data, 'logoSvg')
        ? getFirstDataAtomicValueWithNameInData(data, 'logoSvg')
        : undefined,
      url: await transformLogo(data),
    },
    publicLinks: hasChildWithNameInData(data, 'linkPublic')
      ? transformLinks(
          getAllDataGroupsWithNameInDataAndAttributes(data, 'linkPublic'),
        )
      : undefined,
    adminLinks: hasChildWithNameInData(data, 'linkAdmin')
      ? transformLinks(
          getAllDataGroupsWithNameInDataAndAttributes(data, 'linkAdmin'),
        )
      : undefined,
    hostnames: getAllDataAtomicsWithNameInData(data, 'hostname').map(
      (atomic) => atomic.value,
    ),
  });
};

const transformLinks = (data: DataGroup[]) => {
  return data.map((item) => {
    return {
      sv: transformLink(getFirstDataGroupWithNameInData(item, 'linkSv')),
      en: transformLink(getFirstDataGroupWithNameInData(item, 'linkEn')),
    };
  });
};

const transformLink = (data: DataGroup) => {
  return {
    url: getFirstDataAtomicValueWithNameInData(data, 'url'),
    displayLabel: getFirstDataAtomicValueWithNameInData(data, 'displayLabel'),
  };
};

const transformLogo = async (data: DataGroup) => {
  if (!hasChildWithNameInData(data, 'logo')) {
    return undefined;
  }

  try {
    const binaryRecordWrapper =
      await fetchLinkedRecordForRecordLinkWithNameInData(data, 'logo');
    const binaryDataGroup = binaryRecordWrapper.record.data;
    const binaryMasterGroup = getFirstDataGroupWithNameInData(
      binaryDataGroup,
      'master',
    );
    const masterResourceLink = getFirstResourceLinkWithNameInData(
      binaryMasterGroup,
      'master',
    );
    return masterResourceLink.actionLinks.read.url;
  } catch (error) {
    console.error('Failed to fetch logo binary', error);
    return undefined;
  }
};
