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

import type { SearchFormSchema } from '@/components/FormGenerator/types';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import type {
  BFFMetadataGroup,
  BFFPresentationGroup,
} from '@/cora/transform/bffTypes.server';

import { createLinkedRecordDefinition } from '@/data/formDefinition/createLinkedRecordDefinition.server';

export const getSearchForm = (dependencies: Dependencies, searchId: string) => {
  const searchFromPool = dependencies.searchPool.get(searchId);
  const searchMetadataGroup = dependencies.metadataPool.get(
    searchFromPool.metadataId,
  ) as BFFMetadataGroup;
  const searchPresentationGroup = dependencies.presentationPool.get(
    searchFromPool.presentationId,
  ) as BFFPresentationGroup;

  const { form } = createLinkedRecordDefinition(
    dependencies,
    searchMetadataGroup,
    searchPresentationGroup,
  );

  return {
    form,
    recordTypeToSearchIn: searchFromPool.recordTypeToSearchIn,
  } as unknown as SearchFormSchema;
};

export interface Search {
  form?: SearchFormSchema;
  error?: unknown;
}
