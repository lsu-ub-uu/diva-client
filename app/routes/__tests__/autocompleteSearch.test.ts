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

import { createMockAuth } from '@/auth/__mocks__/auth';
import { getAuth } from '@/auth/sessions.server';
import type {
  BFFMetadata,
  BFFMetadataGroup,
  BFFMetadataTextVariable,
  BFFSearch,
} from '@/cora/transform/bffTypes.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { searchRecords } from '@/data/searchRecords.server';
import { loader } from '@/routes/autocompleteSearch';
import type { BFFDataRecord } from '@/types/record';
import { listToPool } from '@/utils/structs/listToPool';
import type { i18n } from 'i18next';
import { describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';

vi.mock('@/auth/sessions.server');
vi.mock('@/data/searchRecords.server');
vi.mock('@/utils/invariant');

describe('autocompleteSearch', () => {
  describe('loader', () => {
    it('calls searchRecords with correct query', async () => {
      const request = mock<Request>({
        url: 'http://diva-portal.org/autocompleteSearch/nationalSubjectCategory?nationalSubjectCategorySearch.include.includePart.nationalSubjectCategorySearchTerm[0].value=searchQuery',
      });

      const mockDependencies = {
        searchPool: listToPool<BFFSearch>([nationalSubjectCategorySearch]),
        metadataPool: listToPool<BFFMetadata>([
          nationalSubjectCategoryAutocompleteSearchGroup,
          nationalSubjectCategoryAutocompleteIncludeGroup,
          nationalSubjectCategoryAutocompleteIncludePartGroup,
          nationalSubjectCategoryAutocompleteTextVar,
        ]),
      } as Dependencies;

      const mockContext = {
        dependencies: Promise.resolve(mockDependencies),
        i18n: mock<i18n>(),
        refreshDependencies: vi.fn(),
      };

      const mockAuth = createMockAuth();
      vi.mocked(getAuth).mockReturnValue(mockAuth);
      vi.mocked(searchRecords).mockResolvedValue({
        data: [],
        fromNo: 0,
        toNo: 0,
        totalNo: 0,
        containDataOfType: 'nationalSubjectCategory',
      });

      const response = await loader({
        request,
        context: mockContext,
        params: {
          searchType: 'nationalSubjectCategorySearch',
        },
      });

      expect(searchRecords).toHaveBeenCalledWith(
        mockDependencies,
        'nationalSubjectCategorySearch',
        {
          nationalSubjectCategorySearch: {
            include: {
              includePart: {
                nationalSubjectCategorySearchTerm: [
                  {
                    value: 'searchQuery',
                  },
                ],
              },
            },
          },
        },
        mockAuth,
      );

      expect(response.result).toEqual([]);
    });

    it('returns search results', async () => {
      const request = mock<Request>({
        url: 'http://diva-portal.org/autocompleteSearch/nationalSubjectCategory?nationalSubjectCategorySearch.include.includePart.nationalSubjectCategorySearchTerm[0].value=searchQuery',
      });

      const mockContext = {
        dependencies: Promise.resolve({
          searchPool: listToPool<BFFSearch>([nationalSubjectCategorySearch]),
          metadataPool: listToPool<BFFMetadata>([
            nationalSubjectCategoryAutocompleteSearchGroup,
            nationalSubjectCategoryAutocompleteIncludeGroup,
            nationalSubjectCategoryAutocompleteIncludePartGroup,
            nationalSubjectCategoryAutocompleteTextVar,
          ]),
        } as Dependencies),
        i18n: mock<i18n>(),
        refreshDependencies: vi.fn(),
      };

      vi.mocked(getAuth).mockReturnValue(createMockAuth());
      vi.mocked(searchRecords).mockResolvedValue({
        data: [{ id: 'result1' }, { id: 'result2' }] as BFFDataRecord[],
        fromNo: 1,
        toNo: 2,
        totalNo: 2,
        containDataOfType: 'nationalSubjectCategory',
      });

      const response = await loader({
        request,
        context: mockContext,
        params: { searchType: 'nationalSubjectCategorySearch' },
      });

      expect(response.result).toEqual([{ id: 'result1' }, { id: 'result2' }]);
    });
  });
});

const nationalSubjectCategorySearch: BFFSearch = {
  id: 'nationalSubjectCategorySearch',
  metadataId: 'nationalSubjectCategoryAutocompleteSearchGroup',
  presentationId: 'nationalSubjectCategoryAutocompleteSearchPGroup',
  recordTypeToSearchIn: ['nationalSubjectCategory'],
  searchGroup: 'autocomplete',
  searchDefText: 'someSearchDefText',
  searchText: 'someSearchText',
};

const nationalSubjectCategoryAutocompleteSearchGroup: BFFMetadataGroup = {
  id: 'nationalSubjectCategoryAutocompleteSearchGroup',
  nameInData: 'nationalSubjectCategorySearch',
  type: 'group',
  textId: '',
  defTextId: '',
  children: [
    {
      childId: 'nationalSubjectCategoryAutocompleteIncludeGroup',
      repeatMax: '1',
      repeatMin: '1',
    },
  ],
};

const nationalSubjectCategoryAutocompleteIncludeGroup: BFFMetadataGroup = {
  id: 'nationalSubjectCategoryAutocompleteIncludeGroup',
  nameInData: 'include',
  type: 'group',
  textId: '',
  defTextId: '',
  children: [
    {
      childId: 'nationalSubjectCategoryAutocompleteIncludePartGroup',
      repeatMax: '1',
      repeatMin: '1',
    },
  ],
};

const nationalSubjectCategoryAutocompleteIncludePartGroup: BFFMetadataGroup = {
  id: 'nationalSubjectCategoryAutocompleteIncludePartGroup',
  nameInData: 'includePart',
  type: 'group',
  textId: '',
  defTextId: '',
  children: [
    {
      childId: 'nationalSubjectCategoryAutocompleteTextVar',
      repeatMax: '1',
      repeatMin: '1',
    },
  ],
};

const nationalSubjectCategoryAutocompleteTextVar: BFFMetadataTextVariable = {
  regEx: '.+',
  id: 'nationalSubjectCategoryAutocompleteTextVar',
  nameInData: 'nationalSubjectCategorySearchTerm',
  type: 'textVariable',
  textId: '',
  defTextId: '',
};
