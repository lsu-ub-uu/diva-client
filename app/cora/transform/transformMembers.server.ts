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

import { extractLinkedRecordIdFromNamedRecordLink } from '@/cora/cora-data/CoraDataTransforms.server';
import {
  getAllDataAtomicsWithNameInData,
  getAllDataGroupsWithNameInData,
  getAllRecordLinksWithNameInData,
  getFirstDataGroupWithNameInData,
  hasChildWithNameInData,
} from '@/cora/cora-data/CoraDataUtils.server';
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import type {
  BFFImageAttribution,
  BFFMember,
  BFFMemberHero,
  BFFMemberLink,
} from '../bffTypes.server';
import { transformSweEngText } from './transformSweEngText.server';

export const transformMembers = (
  dataListWrapper: DataListWrapper,
): BFFMember[] => {
  return dataListWrapper.dataList.data.map(transformMember);
};

export const transformMember = (recordWrapper: RecordWrapper): BFFMember => {
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
      cimode: 'pageTitleText',
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
    },
    links: hasChildWithNameInData(data, 'link')
      ? transformLinks(getAllDataGroupsWithNameInData(data, 'link'))
      : undefined,
    hostnames: getAllDataAtomicsWithNameInData(data, 'hostname').map(
      (atomic) => atomic.value,
    ),
    loginUnitIds: getAllRecordLinksWithNameInData(data, 'loginUnit').map(
      (recordLink) => recordLink.id,
    ),
    hero: transformHero(getFirstDataGroupWithNameInData(data, 'hero')),
  } satisfies BFFMember);
};

const transformLinks = (data: DataGroup[]): BFFMemberLink[] => {
  return data.map(transformLink);
};

const transformLink = (data: DataGroup): BFFMemberLink => {
  return {
    visibility: data.attributes?.visibility as BFFMemberLink['visibility'],
    lang: data.attributes?.lang as BFFMemberLink['lang'],
    url: getFirstDataAtomicValueWithNameInData(data, 'url'),
    displayLabel: getFirstDataAtomicValueWithNameInData(data, 'displayLabel'),
  };
};

const transformHero = (data: DataGroup): BFFMemberHero => {
  return {
    title: transformSweEngText(getFirstDataGroupWithNameInData(data, 'title')),
    subTitle: hasChildWithNameInData(data, 'subTitle')
      ? transformSweEngText(getFirstDataGroupWithNameInData(data, 'subTitle'))
      : undefined,
    imageUrl: getFirstDataAtomicValueWithNameInData(data, 'imageUrl'),
    imageAttribution: transformImageAttribution(
      getFirstDataGroupWithNameInData(data, 'imageAttribution'),
    ),
  };
};

const transformImageAttribution = (data: DataGroup): BFFImageAttribution => {
  return {
    title: hasChildWithNameInData(data, 'title')
      ? transformSweEngText(getFirstDataGroupWithNameInData(data, 'title'))
      : undefined,
    author: hasChildWithNameInData(data, 'author')
      ? getFirstDataAtomicValueWithNameInData(data, 'author')
      : undefined,
    source: transformSourceOrLicense(
      getFirstDataGroupWithNameInData(data, 'source'),
    ) as BFFImageAttribution['source'],
    license: transformSourceOrLicense(
      getFirstDataGroupWithNameInData(data, 'license'),
    ),
  };
};

const transformSourceOrLicense = (data: DataGroup) => {
  return {
    displayLabel: getFirstDataAtomicValueWithNameInData(data, 'displayLabel'),
    url: hasChildWithNameInData(data, 'url')
      ? getFirstDataAtomicValueWithNameInData(data, 'url')
      : undefined,
  };
};
