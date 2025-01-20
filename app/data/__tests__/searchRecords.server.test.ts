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

import { searchRecords } from '@/data/searchRecords.server';
import { mock } from 'vitest-mock-extended';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import type { Auth } from '@/types/Auth';
import type { BFFMetadata, BFFSearch } from '@/cora/transform/bffTypes.server';
import { listToPool } from '@/utils/structs/listToPool';

vi.mock('@/cora/getSearchResultDataListBySearchType.server');

describe('searchRecords', () => {
  it.todo('returns search result', () => {
    const searchMock = mock<BFFSearch>();
    const searchPoolMock = listToPool(searchMock);

    const searchMetadataGroup = mock<BFFMetadata>({
      id: 'searchGroup',
      nameInData: 'searchGroupNameInData',
      type: 'group',
      children: [
        {
          repeatMin: '1',
          repeatMax: '1',
          childId: 'searchTextVariable',
        },
      ],
    });

    const metadataPoolMock = listToPool([searchMetadataGroup]);

    const dependencies = mock<Dependencies>({
      searchPool: searchPoolMock,
      metadataPool: metadataPoolMock,
    });
    const searchType = 'someSearchType';
    const query = {};
    const auth = mock<Auth>();

    const actual = searchRecords(dependencies, searchType, query, auth);
  });
  it.todo('returns no hits');
  it.todo('uses searchResultPresentation if present');
});
