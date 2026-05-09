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

import type {
  DataGroup,
  DataListWrapper,
  RecordWrapper,
} from '@/cora/cora-data/types.server';
import {
  extractAttributeValueByName,
  extractIdFromRecordInfo,
} from '@/cora/cora-data/CoraDataTransforms.server';
import { getAllChildrenWithNameInData } from '@/cora/cora-data/CoraDataUtils.server';
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import type { BFFText } from '../bffTypes.server';

export const transformCoraTexts = (
  dataListWrapper: DataListWrapper,
): BFFText[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecordWrappers = dataListWrapper.dataList.data;
  return coraRecordWrappers.map(transformCoraTextToBFFText);
};

export const transformCoraTextToBFFText = (
  coraRecordWrapper: RecordWrapper,
) => {
  const coraRecord = coraRecordWrapper.record;
  const dataRecordGroup = coraRecord.data;
  const id = extractIdFromRecordInfo(dataRecordGroup);
  const languages = extractLanguageTextCombinations(dataRecordGroup);

  return removeEmpty({ id, sv: languages.sv, en: languages.en }) as BFFText;
};

const extractLanguageTextCombinations = (dataRecordGroup: DataGroup) => {
  const textParts: DataGroup[] = getAllChildrenWithNameInData(
    dataRecordGroup,
    'textPart',
  ) as DataGroup[];
  return extractLanguageTextCombinationsFromTextParts(textParts);
};

const extractLanguageTextCombinationsFromTextParts = (
  textParts: DataGroup[],
) => {
  const languages: { [key: string]: string } = {};
  textParts.forEach((textPart) => {
    const langText = extractLanguageTextCombinationFromTextPart(textPart);
    languages[langText.lang] = langText.text;
  });
  return languages;
};

const extractLanguageTextCombinationFromTextPart = (textPart: DataGroup) => {
  const lang = extractAttributeValueByName(textPart, 'lang');
  const text = getFirstDataAtomicValueWithNameInData(textPart, 'text');
  return { lang, text };
};
