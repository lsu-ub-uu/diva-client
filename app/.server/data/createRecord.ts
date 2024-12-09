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

import { BFFDataRecord } from '@/types/record';

import { RecordFormSchema } from '@/components/FormGenerator/types';
import { Auth } from '@/types/Auth';
import { createFormMetaData } from '@/.server/data/formDefinition/formMetadata';
import { createFormMetaDataPathLookup } from '@/utils/structs/metadataPathLookup';
import { transformToCoraData } from '@/.server/cora/transform/transformToCora';
import { transformRecord } from '@/.server/cora/transform/transformRecord';
import { DataGroup, RecordWrapper } from '@/.server/cora/cora-data/CoraData';
import { postRecordData } from '@/.server/cora/postRecordData';
import { Dependencies } from '@/.server/data/formDefinition/formDefinitionsDep';

export const createRecord = async (
  dependencies: Dependencies,
  formDefinition: RecordFormSchema,
  record: BFFDataRecord,
  auth: Auth,
) => {
  const validationTypeId = formDefinition.validationTypeId;
  const { validationTypePool } = dependencies;

  const recordType =
    validationTypePool.get(validationTypeId).validatesRecordTypeId;

  if (!validationTypePool.has(validationTypeId)) {
    throw new Error(`Validation type [${validationTypeId}] does not exist`);
  }

  const FORM_MODE_NEW = 'create';

  const formMetaData = createFormMetaData(
    dependencies,
    validationTypeId,
    FORM_MODE_NEW,
  );
  const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);

  const transformData = transformToCoraData(formMetaDataPathLookup, record);

  const response = await postRecordData<RecordWrapper>(
    transformData[0] as DataGroup,
    recordType,
    auth.data.token,
  );

  return transformRecord(dependencies, response.data);
};
