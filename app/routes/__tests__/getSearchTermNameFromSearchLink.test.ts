/*
 * Copyright 2023 Uppsala University Library
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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { listToPool } from '@/utils/structs/listToPool';
import type {
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMetadata,
  BFFMetadataGroup,
  BFFMetadataTextVariable,
  BFFPresentationBase,
  BFFPresentationGroup,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFTheme,
  BFFValidationType,
} from '@/cora/transform/bffTypes.server';
import type { Lookup } from '@/utils/structs/lookup';

import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { getSearchTermNameFromSearchLink } from '@/routes/autocompleteSearch';

describe('getSearchTermNameFromSearchLink', () => {
  let metadataPool: Lookup<string, BFFMetadata>;
  let searchPool: Lookup<string, BFFSearch>;

  let dependencies: Dependencies;

  beforeEach(() => {
    metadataPool = listToPool<BFFMetadata>([
      nationalSubjectCategoryAutocompleteSearchGroup,
      nationalSubjectCategoryAutocompleteIncludeGroup,
      nationalSubjectCategoryAutocompleteIncludePartGroup,
      nationalSubjectCategoryAutocompleteTextVar,
    ]);

    searchPool = listToPool<BFFSearch>([someBFFSearch]);

    dependencies = {
      validationTypePool: listToPool<BFFValidationType>([]),
      metadataPool,
      textPool: listToPool<BFFText>([]),
      presentationPool: listToPool<BFFPresentationBase | BFFPresentationGroup>(
        [],
      ),
      recordTypePool: listToPool<BFFRecordType>([]),
      loginUnitPool: listToPool<BFFLoginUnit>([]),
      loginPool: listToPool<BFFLoginWebRedirect>([]),
      searchPool,
      themePool: listToPool<BFFTheme>([]),
    };
  });

  const someBFFSearch: BFFSearch = {
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
    nameInData: 'include',
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
    nameInData: 'search',
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

  const nationalSubjectCategoryAutocompleteIncludePartGroup: BFFMetadataGroup =
    {
      id: 'nationalSubjectCategoryAutocompleteIncludePartGroup',
      nameInData: 'include',
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

  it('finds some search', () => {
    const searchLink = 'nationalSubjectCategorySearch';
    const searchTermName = getSearchTermNameFromSearchLink(
      dependencies,
      searchLink,
    );

    expect(searchTermName).toBe('nationalSubjectCategorySearchTerm');
  });
});
