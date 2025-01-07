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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */
import emptyDataList from '@/__mocks__/bff/emptyDataList.json';
import { transformCoraSearch } from '../transformCoraSearch';
import coraSearch from '@/__mocks__/bff/coraSearch.json';
import coraSearchWithSearchResultPresentation from '@/__mocks__/bff/coraSearchWithSearchResultPresentation.json';
import coraSearchWithTwoRecordTypeToSearchIn from '@/__mocks__/bff/coraSearchWithTwoRecordTypeToSearchIn.json';

describe('transformSearch', () => {
  it('Empty list should return empty list', () => {
    const transformData = transformCoraSearch(emptyDataList);
    expect(transformData).toStrictEqual([]);
  });
  it('Returns one search entry', () => {
    const searchDataList = transformCoraSearch(coraSearch);
    expect(searchDataList).toHaveLength(1);
  });
  it('Returns one BFFSearch entry', () => {
    const searchDataList = transformCoraSearch(coraSearch);
    expect(searchDataList[0]).toStrictEqual({
      id: 'personSearch',
      metadataId: 'personAutocompleteSearchGroup',
      presentationId: 'personAutocompleteSearchPGroup',
      recordTypeToSearchIn: ['person'],
      searchGroup: 'autocomplete',
      searchDefText: 'personSearchDefText',
      searchText: 'personSearchText',
    });
  });
  it('Returns one BFFSearch entry with two recordTypeToSearchIn', () => {
    const searchDataList = transformCoraSearch(
      coraSearchWithTwoRecordTypeToSearchIn,
    );
    expect(searchDataList[0]).toStrictEqual({
      id: 'personSearch',
      metadataId: 'personAutocompleteSearchGroup',
      presentationId: 'personAutocompleteSearchPGroup',
      recordTypeToSearchIn: ['person', 'nationalSubjectCategory'],
      searchGroup: 'autocomplete',
      searchDefText: 'personSearchDefText',
      searchText: 'personSearchText',
    });
  });
  it('Returns one BFFSearch entry with an searchResultPresentation', () => {
    const searchDataList = transformCoraSearch(
      coraSearchWithSearchResultPresentation,
    );
    expect(searchDataList[0]).toStrictEqual({
      id: 'diva-personMinimalSearch',
      metadataId: 'personMinimalSearchGroup',
      presentationId: 'outputSearchPGroup',
      recordTypeToSearchIn: ['diva-person'],
      searchDefText: 'diva-personSearchDefText',
      searchGroup: 'autocomplete',
      searchText: 'diva-personSearchText',
      searchResultPresentation: 'someSearchResultPresentation',
    });
  });
});
