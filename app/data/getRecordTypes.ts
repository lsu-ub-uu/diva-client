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

export const getRecordTypes = async (
  dependencies: Dependencies,
  auth?: Auth,
) => {
  const divaClientRecordTypes = Array.from(
    dependencies.recordTypePool.values(),
  ).filter((recordType) =>
    recordType.recordTypeCategory.includes('clientNavigation'),
  );

  const userRecordTypes = await Promise.all(
    divaClientRecordTypes.map((recordType) =>
      getRecordDataById<RecordWrapper>(
        'recordType',
        recordType.id,
        auth?.data?.token,
      ),
    ),
  );

  return userRecordTypes
    .map((response) => response.data)
    .filter((recordType) => recordType.record.actionLinks.search !== undefined)
    .map(transformRecordType);
};
