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

import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import type { BFFMetadataGroup } from '@/cora/transform/bffTypes.server';
import { searchRecords } from '@/data/searchRecords.server';
import { invariant } from '@/utils/invariant';

import type { Route } from './+types/autocompleteSearch';

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const url = new URL(request.url);

  const searchType = url.searchParams.get('searchType');
  invariant(searchType, 'Missing searchType param');

  const searchTermValue = url.searchParams.get('searchTermValue');
  invariant(searchTermValue, 'Missing searchTermValue param');

  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);

  const query = createQuery(
    await context.dependencies,
    searchType,
    searchTermValue,
  );

  try {
    const result = await searchRecords(
      await context.dependencies,
      searchType,
      query,
      auth,
    );
    return { result: result.data };
  } catch (error) {
    console.error(error);
    return { result: [] };
  }
};

export const createQuery = (
  dependencies: Dependencies,
  searchType: string,
  searchTermValue: string,
) => {
  const search = dependencies.searchPool.get(searchType);
  const metadataGroup = dependencies.metadataPool.get(
    search.metadataId,
  ) as BFFMetadataGroup;

  const includeGroup = dependencies.metadataPool.get(
    metadataGroup.children[0].childId,
  ) as BFFMetadataGroup;
  const includePartGroup = dependencies.metadataPool.get(
    includeGroup.children[0].childId,
  ) as BFFMetadataGroup;
  const firstSearchTerm = dependencies.metadataPool.get(
    includePartGroup.children[0].childId,
  );

  return {
    [metadataGroup.nameInData]: {
      [includeGroup.nameInData]: {
        [includePartGroup.nameInData]: {
          [firstSearchTerm.nameInData]: [
            {
              value: searchTermValue,
            },
          ],
        },
      },
    },
  };
};

export const getSearchTermNameFromSearchLink = (
  dependencies: Dependencies,
  searchLink: string,
) => {
  const searchName = dependencies.searchPool.get(searchLink);
  const metadataGroup = dependencies.metadataPool.get(
    searchName.metadataId,
  ) as BFFMetadataGroup;
  const includeGroup = dependencies.metadataPool.get(
    metadataGroup.children[0].childId,
  ) as BFFMetadataGroup;
  const includePartGroup = dependencies.metadataPool.get(
    includeGroup.children[0].childId,
  ) as BFFMetadataGroup;
  return dependencies.metadataPool.get(includePartGroup.children[0].childId)
    .nameInData;
};
