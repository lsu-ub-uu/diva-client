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
  const divaClientRecordTypes = Array.from(
    dependencies.recordTypePool.values(),
  )

  const userRecordTypes = await Promise.allSettled(
    divaClientRecordTypes.map((recordType) =>
      getRecordDataById<RecordWrapper>(
        'recordType',
        recordType.id,
        auth?.data?.token,
      ),
    ),
  );

  userRecordTypes
    .filter((result) => result.status === 'fulfilled')
    .map((result) => result.value)
    .map((response) => response.data)
    .filter((recordType) => recordType.record.actionLinks.search !== undefined)
    .map(transformRecordType);

  const mainNavigationItems = divaClientRecordTypes
    .filter((recordType) =>
      recordType.recordTypeCategory.includes('clientNavigation'),
    )
    .map((recordType) => ({
      link: `/records/${recordType.id}`,
      textId: recordType.textId,
    }));

  return { mainNavigationItems, otherNavigationItems };



};

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
