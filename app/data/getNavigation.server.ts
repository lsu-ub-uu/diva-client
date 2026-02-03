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

import type { Auth } from '@/auth/Auth';
import type { RecordWrapper } from '@/cora/cora-data/types.server';
import { getRecordDataById } from '@/cora/getRecordDataById.server';
import type {
  BFFMember,
  BFFRecordType,
} from '@/cora/transform/bffTypes.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { href } from 'react-router';

export interface NavigationItem {
  id: string;
  link: string;
  textId: string;
}

export interface Navigation {
  mainNavigationItems: NavigationItem[];
  otherNavigationItems: NavigationItem[];
}

const CLIENT_NAVIGATION_RECORD_TYPE_CATEGORY = 'clientNavigation';
const MAIN_NAVIGATION_RECORD_TYPE_GROUP = 'publicationType';

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
  member?: BFFMember,
  auth?: Auth,
): Promise<Navigation> => {
  const recordTypes = Array.from(dependencies.recordTypePool.values())
    .filter((recordType) =>
      recordType.recordTypeCategory.includes(
        CLIENT_NAVIGATION_RECORD_TYPE_CATEGORY,
      ),
    )
    .sort(recordTypeComparator);

  const navigation = {
    mainNavigationItems: recordTypes
      .filter((recordType) =>
        recordType.groupOfRecordType.includes(
          MAIN_NAVIGATION_RECORD_TYPE_GROUP,
        ),
      )
      .map(createNavigationItemFromRecordType),
    otherNavigationItems: auth
      ? recordTypes
          .filter(
            (recordType) =>
              !recordType.groupOfRecordType.includes(
                MAIN_NAVIGATION_RECORD_TYPE_GROUP,
              ),
          )
          .map(createNavigationItemFromRecordType)
      : [],
  };

  if (await canEditMemberSettings(member, auth)) {
    navigation.otherNavigationItems.push({
      id: 'diva-member',
      link: href('/:recordType/:recordId/update', {
        recordType: 'diva-member',
        recordId: member!.id,
      }),
      textId: 'divaClient_memberSettingsText',
    });
  }

  return navigation;
};

const createNavigationItemFromRecordType = (recordType: BFFRecordType) => ({
  id: recordType.id,
  link: href('/:recordType', { recordType: recordType.id }),
  textId: recordType.pluralTextId,
});

const recordTypeComparator = (a: BFFRecordType, b: BFFRecordType) => {
  const aIndex = sortOrder.indexOf(a.id);
  const bIndex = sortOrder.indexOf(b.id);
  return (
    (aIndex === -1 ? Infinity : aIndex) - (bIndex === -1 ? Infinity : bIndex)
  );
};

const canEditMemberSettings = async (member?: BFFMember, auth?: Auth) => {
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
