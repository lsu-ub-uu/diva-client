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

import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import {
  getAllDataAtomicsWithNameInData,
  getAllDataGroupsWithNameInDataAndAttributes,
  getAllRecordLinksWithNameInData,
  getFirstDataGroupWithNameInData,
  getFirstResourceLinkWithNameInData,
  hasChildWithNameInData,
} from '@/cora/cora-data/CoraDataUtils.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import {
  extractLinkedRecordIdFromNamedRecordLink,
  fetchLinkedRecordForRecordLinkWithNameInData,
} from '@/cora/cora-data/CoraDataTransforms.server';
import type { BFFMember } from '../bffTypes.server';

export const transformMembers = (
  dataListWrapper: DataListWrapper,
): Promise<BFFMember[]> => {
  return Promise.all(dataListWrapper.dataList.data.map(transformMember));
};

export const transformMember = async (
  recordWrapper: RecordWrapper,
): Promise<BFFMember> => {
  const data = recordWrapper.record.data;
  return removeEmpty({
    id: getFirstDataAtomicValueWithNameInData(
      getFirstDataGroupWithNameInData(data, 'recordInfo'),
      'id',
    ),
    memberPermissionUnit: hasChildWithNameInData(data, 'memberPermissionUnit')
      ? extractLinkedRecordIdFromNamedRecordLink(data, 'memberPermissionUnit')
      : undefined,
    pageTitle: {
      sv: getFirstDataAtomicValueWithNameInData(data, 'pageTitleSv'),
      en: getFirstDataAtomicValueWithNameInData(data, 'pageTitleEn'),
    },
    backgroundColor: getFirstDataAtomicValueWithNameInData(
      data,
      'backgroundColor',
    ),
    textColor: getFirstDataAtomicValueWithNameInData(data, 'textColor'),
    backgroundColorDarkMode: hasChildWithNameInData(
      data,
      'backgroundColorDarkMode',
    )
      ? getFirstDataAtomicValueWithNameInData(data, 'backgroundColorDarkMode')
      : undefined,
    textColorDarkMode: hasChildWithNameInData(data, 'textColorDarkMode')
      ? getFirstDataAtomicValueWithNameInData(data, 'textColorDarkMode')
      : undefined,
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
    loginUnitIds: getAllRecordLinksWithNameInData(data, 'loginUnit').map(
      (recordLink) => recordLink.id,
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
    return masterResourceLink.actionLinks!.read.url;
  } catch (error) {
    console.error('Failed to fetch logo binary', error);
    return undefined;
  }
};
