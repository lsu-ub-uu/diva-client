/*
 * Copyright 2024 Uppsala University Library
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
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { deleteRecordDataById } from '@/cora/deleteRecordDataById.server';

export const deleteRecord = async (
  dependencies: Dependencies,
  recordType: string,
  recordId: string,
  auth?: Auth,
) => {
  const { recordTypePool } = dependencies;

  if (!recordTypePool.has(recordType)) {
    console.error(`Record type [${recordType}] does not exist`);
    throw new Response(`Record type [${recordType}] does not exist`, {
      status: 404,
    });
  }

  await deleteRecordDataById(recordId, recordType, auth?.data.token);
};
