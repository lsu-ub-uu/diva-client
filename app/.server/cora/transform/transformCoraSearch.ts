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

import type {
  DataListWrapper,
  RecordWrapper,
} from '@/.server/cora/cora-data/CoraData';
import type { BFFSearch } from './bffTypes';
import {
  extractIdFromRecordInfo,
  extractLinkedRecordIdFromNamedRecordLink,
} from '@/.server/cora/cora-data/CoraDataTransforms';
import {
  getAllRecordLinksWithNameInData,
  hasChildWithNameInData,
} from '@/.server/cora/cora-data/CoraDataUtils';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import { getFirstDataAtomicValueWithNameInData } from '@/.server/cora/cora-data/CoraDataUtilsWrappers';

export const transformCoraSearch = (
  dataListWrapper: DataListWrapper,
): BFFSearch[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecordWrappers = dataListWrapper.dataList.data;
  return coraRecordWrappers.map(transformCoraSearchToBFFSearch);
};
const transformCoraSearchToBFFSearch = (
  coraRecordWrapper: RecordWrapper,
): BFFSearch => {
  const dataRecordGroup = coraRecordWrapper.record.data;
  const id = extractIdFromRecordInfo(dataRecordGroup);

  const metadataId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'metadataId',
  );

  const presentationId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'presentationId',
  );

  const recordTypeToSearchIn: string[] = [];
  const groupedRecordLinks = getAllRecordLinksWithNameInData(
    dataRecordGroup,
    'recordTypeToSearchIn',
  );
  groupedRecordLinks.forEach((recordLink) => {
    recordTypeToSearchIn.push(recordLink.id as string);
  });

  const searchGroup = getFirstDataAtomicValueWithNameInData(
    dataRecordGroup,
    'searchGroup',
  );

  const searchText = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'textId',
  );

  const searchDefText = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'defTextId',
  );

  const hasSearchResultPresentation = hasChildWithNameInData(
    dataRecordGroup,
    'searchResultPresentation',
  );

  const searchResultPresentation = hasSearchResultPresentation
    ? extractLinkedRecordIdFromNamedRecordLink(
        dataRecordGroup,
        'searchResultPresentation',
      )
    : undefined;

  return removeEmpty({
    id,
    metadataId,
    presentationId,
    recordTypeToSearchIn,
    searchGroup,
    searchDefText,
    searchText,
    searchResultPresentation,
  } as BFFSearch);
};
