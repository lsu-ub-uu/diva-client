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
import type { DataGroup, DataListWrapper } from '@/cora/cora-data/types.server';
import { getSearchResultDataListBySearchType } from '@/cora/getSearchResultDataListBySearchType.server';
import type {
  BFFMetadataGroup,
  BFFPresentationGroup,
  BFFSearch,
} from '@/cora/transform/bffTypes.server';
import { transformRecords } from '@/cora/transform/transformRecord.server';
import { transformToCoraData } from '@/cora/transform/transformToCora.server';
import { createLinkedRecordDefinition } from '@/data/formDefinition/createLinkedRecordDefinition.server';
import type { FormMetaData } from '@/data/formDefinition/formDefinition.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import {
  createBFFMetadataReference,
  createMetaDataFromChildReference,
} from '@/data/formDefinition/formMetadata.server';
import type { BFFSearchResult } from '@/types/record';
import { createFormMetaDataPathLookup } from '@/utils/structs/metadataPathLookup';

export const searchRecords = async (
  dependencies: Dependencies,
  searchType: string,
  query: any,
  auth?: Auth,
  decorated = false,
) => {
  if (!dependencies.searchPool.has(searchType)) {
    throw new Error(`Search [${searchType}] does not exist`);
  }

  const search = dependencies.searchPool.get(searchType);
  const coraQuery = createCoraSearchQuery(dependencies, search, query);
  const response = await getSearchResultDataListBySearchType<DataListWrapper>(
    searchType,
    coraQuery,
    auth?.data.token,
    decorated,
  );

  const transformedRecords = transformRecords(
    dependencies,
    response.data,
    'list',
  );

  const { fromNo, toNo, totalNo, containDataOfType } = response.data.dataList;

  transformedRecords.forEach((transformedRecord) => {
    const recordType = dependencies.recordTypePool.get(
      transformedRecord.recordType,
    );
    const { listPresentationViewId } = recordType;

    const presentationGroup = dependencies.presentationPool.get(
      search.searchResultPresentation ?? listPresentationViewId,
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

export const createCoraSearchQuery = (
  dependencies: Dependencies,
  search: BFFSearch,
  query: any,
) => {
  const searchMetadata = createSearchMetaData(dependencies, search.metadataId);
  const formMetaDataPathLookup = createFormMetaDataPathLookup(searchMetadata);
  return transformToCoraData(formMetaDataPathLookup, query)[0] as DataGroup;
};

const createSearchMetaData = (
  dependencies: Dependencies,
  id: string,
): FormMetaData => {
  const { metadataPool } = dependencies;
  const formRootReference = createBFFMetadataReference(id);
  return createMetaDataFromChildReference(formRootReference, metadataPool);
};
