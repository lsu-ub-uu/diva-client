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

import type { BFFSearchResult } from '@/types/record';
import type { Auth } from '@/auth/Auth';
import type { Dependencies } from '@/.server/data/formDefinition/formDefinitionsDep';
import type { FormMetaData } from '@/.server/data/formDefinition/formDefinition';
import type {
  BFFMetadataGroup,
  BFFPresentationGroup,
} from '@/.server/cora/transform/bffTypes';
import {
  createBFFMetadataReference,
  createMetaDataFromChildReference,
} from '@/.server/data/formDefinition/formMetadata';
import { createFormMetaDataPathLookup } from '@/utils/structs/metadataPathLookup';
import { transformToCoraData } from '@/.server/cora/transform/transformToCora';
import { getSearchResultDataListBySearchType } from '@/.server/cora/getSearchResultDataListBySearchType';
import type {
  DataGroup,
  DataListWrapper,
} from '@/.server/cora/cora-data/CoraData';
import { transformRecords } from '@/.server/cora/transform/transformRecord';
import { createLinkedRecordDefinition } from '@/.server/data/formDefinition/createLinkedRecordDefinition';

export const searchRecords = async (
  dependencies: Dependencies,
  searchType: string,
  query: any,
  auth?: Auth,
) => {
  if (!dependencies.searchPool.has(searchType)) {
    throw new Error(`Search [${searchType}] does not exist`);
  }

  const search = dependencies.searchPool.get(searchType);

  const searchMetadata = createSearchMetaData(dependencies, search.metadataId);
  const formMetaDataPathLookup = createFormMetaDataPathLookup(searchMetadata);
  const transformData = transformToCoraData(formMetaDataPathLookup, query);

  const response = await getSearchResultDataListBySearchType<DataListWrapper>(
    searchType,
    transformData[0] as DataGroup,
    auth?.data.token,
  );

  const transformedRecords = transformRecords(dependencies, response.data);

  const { fromNo, toNo, totalNo, containDataOfType } = response.data.dataList;

  transformedRecords.forEach((transformedRecord) => {
    const recordType = dependencies.recordTypePool.get(
      transformedRecord.recordType,
    );
    const { listPresentationViewId } = recordType;

    const presentationGroup = dependencies.presentationPool.get(
      listPresentationViewId,
    ) as BFFPresentationGroup;
    const metadataGroup = dependencies.metadataPool.get(
      presentationGroup.presentationOf,
    ) as BFFMetadataGroup;
    transformedRecord.presentation = createLinkedRecordDefinition(
      dependencies,
      metadataGroup,
      presentationGroup,
    );
  });

  return {
    fromNo: Number(fromNo),
    toNo: Number(toNo),
    totalNo: Number(totalNo),
    containDataOfType,
    data: transformedRecords,
  } as BFFSearchResult;
};

const createSearchMetaData = (
  dependencies: Dependencies,
  id: string,
): FormMetaData => {
  const { metadataPool } = dependencies;
  const metadata = metadataPool.get(id);

  const metadataGroup: BFFMetadataGroup = metadataPool.get(
    metadata.id,
  ) as BFFMetadataGroup;

  const formRootReference = createBFFMetadataReference(metadataGroup.id);
  return createMetaDataFromChildReference(formRootReference, metadataPool);
};
