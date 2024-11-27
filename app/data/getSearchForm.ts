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

import { SearchFormSchema } from '@/components/FormGenerator/types';
import { Dependencies } from '@/data/formDefinition/formDefinitionsDep';
import { BFFMetadataGroup } from '@/cora/transform/bffTypes';
import { createLinkedRecordDefinition } from '@/data/formDefinition/formDefinition';

export const getSearchForm = (dependencies: Dependencies, searchId: string) => {
  const searchFromPool = dependencies.searchPool.get(searchId);
  const searchMetadataGroup = dependencies.metadataPool.get(
    searchFromPool.metadataId,
  ) as BFFMetadataGroup;
  const searchPresentationGroup = dependencies.presentationPool.get(
    searchFromPool.presentationId,
  );

  const { form } = createLinkedRecordDefinition(
    dependencies,
    searchMetadataGroup,
    searchPresentationGroup,
  );

  return {
    form,
    recordTypeToSearchIn: searchFromPool.recordTypeToSearchIn,
  } as SearchFormSchema;
};

export interface Search {
  form?: SearchFormSchema;
  error?: unknown;
}
