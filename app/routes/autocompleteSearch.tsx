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

import { getAuthentication, getSessionFromCookie } from '@/.server/sessions';
import { Dependencies } from '@/.server/data/formDefinition/formDefinitionsDep';
import { BFFMetadataGroup } from '@/.server/cora/transform/bffTypes';
import { searchRecords } from '@/.server/data/searchRecords';
import { invariant } from '@/utils/invariant';
import type { Route } from '../../.react-router/types/app/routes/+types/autocompleteSearch';

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const url = new URL(request.url);

  const searchType = url.searchParams.get('searchType');
  invariant(searchType, 'Missing searchType param');

  const searchTermValue = url.searchParams.get('searchTermValue');
  invariant(searchTermValue, 'Missing searchTermValue param');

  const session = await getSessionFromCookie(request);
  const auth = getAuthentication(session);

  const searchTermName = getSearchTermNameFromSearchLink(
    context.dependencies,
    searchType,
  );

  const query = {
    search: {
      include: {
        includePart: {
          [searchTermName]: [
            {
              value: searchTermValue,
            },
          ],
        },
      },
    },
  };

  const result = await searchRecords(
    context.dependencies,
    searchType,
    query,
    auth,
  );

  return Response.json(result.data);
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
