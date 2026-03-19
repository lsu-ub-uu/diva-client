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

import type { BFFDataRecord } from '@/types/record';
import type { Auth } from '@/auth/Auth';
import { createFormMetaData } from '@/data/formMetadata.server';
import { createFormMetaDataPathLookup } from '@/utils/structs/metadataPathLookup';
import {
  transformToCoraData,
  type Data,
} from '@/cora/transform/transformToCora.server';
import type { DataGroup, RecordWrapper } from '@/cora/cora-data/types.server';
import { transformRecord } from '@/cora/transform/transformRecord.server';
import type { Dependencies } from '@/cora/bffTypes.server';
import { updateRecordDataById } from '@/cora/updateRecordDataById.server';

export const updateRecord = async (
  dependencies: Dependencies,
  validationTypeId: string,
  recordId: string,
  data: BFFDataRecord,
  auth?: Auth,
) => {
  const { validationTypePool } = dependencies;
  const recordType =
    validationTypePool.get(validationTypeId).validatesRecordTypeId;
  if (!validationTypePool.has(validationTypeId)) {
    throw new Error(`Validation type [${validationTypeId}] does not exist`);
  }

  const FORM_MODE_UPDATE = 'update';

  const formMetaData = createFormMetaData(
    dependencies,
    validationTypeId,
    FORM_MODE_UPDATE,
  );
  const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);

  const transformData = transformToCoraData(formMetaDataPathLookup, data);

  let response;
  if (recordType === 'diva-output') {
    const classicRecordAs2026 =
      convertClassicQualityTo2026Quality(transformData);
    try {
      response = await updateRecordDataById<RecordWrapper>(
        recordId,
        classicRecordAs2026[0] as DataGroup,
        recordType,
        auth?.data.token,
      );
    } catch {
      response = await updateRecordDataById<RecordWrapper>(
        recordId,
        transformData[0] as DataGroup,
        recordType,
        auth?.data.token,
      );
    }
  } else {
    response = await updateRecordDataById<RecordWrapper>(
      recordId,
      transformData[0] as DataGroup,
      recordType,
      auth?.data.token,
    );
  }

  return transformRecord(dependencies, response.data, FORM_MODE_UPDATE);
};

const convertClassicQualityTo2026Quality = (recordData: unknown): Data[] => {
  const findChildren = (data: any): any => {
    if (Array.isArray(data)) return data.map(findChildren);
    if (data && typeof data === 'object') {
      const node = { ...data };
      if (
        node.name === 'linkedRecordId' &&
        node.value === 'classic_publication_report'
      ) {
        node.value = 'publication_report';
      }
      if (node.name === 'dataQuality' && node.value === 'classic') {
        node.value = '2026';
      }
      if (node.children) node.children = findChildren(node.children);
      return node;
    }
    return data;
  };
  return findChildren(recordData);
};
