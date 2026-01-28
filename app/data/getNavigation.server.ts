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

import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import type { Auth } from '@/auth/Auth';
import { getRecordDataById } from '@/cora/getRecordDataById.server';
import type { RecordWrapper } from '@/cora/cora-data/types.server';
import { transformRecordType } from '@/cora/transform/transformRecordTypes.server';
import type {
  BFFMember,
  BFFRecordType,
} from '@/cora/transform/bffTypes.server';
import { searchRecords } from './searchRecords.server';
import type { BFFSearchResult } from '@/types/record';
import { map } from 'lodash';

export interface NavigationItem {
  link: string;
  textId: string;
}

export interface Navigation {
  mainNavigationItems: NavigationItem[];
  otherNavigationItems: NavigationItem[];
}

/**
 * Byt namn till getNavigation (typa upp den)
 *
 * Lägg till recordTypeCategory clientMainNavigation på output, person, project
 *
 * Ta med "special items" här. Member settings, dev links.
 */

const sortOrder = [
  'diva-output',
  'diva-person',
  'diva-project',
  'diva-course',
  'diva-organisation',
  'diva-journal',
  'diva-subject',
  'diva-programme',
  'diva-series',
  'diva-localLabel',
  'diva-publisher',
  'diva-funder',
];

export const getNavigation = async (
  dependencies: Dependencies,
  auth?: Auth,
): Promise<Navigation> => {
  const searchQuery = {
    recordTypeSearch: {
      include: {
        includePart: {
          recordTypeCategorySearchTerm: 'clientMainNavigation',
        },
      },
    },
  };

  const searchResult = await searchRecords<BFFRecordType>(
    dependencies,
    'recordTypeSearch',
    searchQuery,
    auth,
  );

  const navigationRecordTypes = searchResult.data
    .filter((result) => result.actionLinks.search !== undefined)
    .map((result) => result.data)
    .sort(recordTypeComparator);

  const mainNavigationItems = navigationRecordTypes
    .filter(({ recordTypeCategory }) =>
      recordTypeCategory.includes('clientMainNavigation'),
    )
    .map(createNavigationItemFromRecordType);

  const otherNavigationItems = navigationRecordTypes
    .filter(
      ({ recordTypeCategory }) =>
        !recordTypeCategory.includes('clientMainNavigation'),
    )
    .map(createNavigationItemFromRecordType);

  return { mainNavigationItems, otherNavigationItems };
};

const recordTypeComparator = (a: BFFRecordType, b: BFFRecordType) => {
  const aIndex = sortOrder.indexOf(a.id);
  const bIndex = sortOrder.indexOf(b.id);
  return (
    (aIndex === -1 ? Infinity : aIndex) - (bIndex === -1 ? Infinity : bIndex)
  );
};

const createNavigationItemFromRecordType = (
  recordType: BFFRecordType,
): NavigationItem => ({
  link: `/` + recordType.id,
  textId: recordType.textId,
});

export const canEditMemberSettings = async (
  member?: BFFMember,
  auth?: Auth,
) => {
  if (!auth || !member) {
    return false;
  }
  try {
    const memberData = await getRecordDataById<RecordWrapper>(
      'diva-member',
      member.id,
      auth?.data?.token,
    );
    if (memberData.data.record.actionLinks.update === undefined) {
      return false;
    } else {
      return true;
    }
  } catch {
    return false;
  }
};
