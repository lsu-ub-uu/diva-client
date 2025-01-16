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

import { removeEmpty } from '@/utils/structs/removeEmpty';

export const convertChildStylesToGridColSpan = (styles: string[]): number => {
  const DEFAULT_COLSPAN = 12;
  const convertedColSpans = styles.length
    ? styles.map((style) => {
        switch (style) {
          case 'oneChildStyle':
            return 1;
          case 'twoChildStyle':
            return 2;
          case 'threeChildStyle':
            return 3;
          case 'fourChildStyle':
            return 4;
          case 'fiveChildStyle':
            return 5;
          case 'sixChildStyle':
            return 6;
          case 'sevenChildStyle':
            return 7;
          case 'eightChildStyle':
            return 8;
          case 'nineChildStyle':
            return 9;
          case 'tenChildStyle':
            return 10;
          case 'elevenChildStyle':
            return 11;
          case 'twelveChildStyle':
            return DEFAULT_COLSPAN;
          default:
            return null;
        }
      })
    : [DEFAULT_COLSPAN];

  const cleaned = removeEmpty(convertedColSpans)[0];
  return cleaned ?? DEFAULT_COLSPAN;
};
export const convertChildStylesToShortName = (
  styles: string[] | undefined,
): unknown[] | never[] => {
  return styles?.length
    ? styles.map((style) => {
        return convertStylesToShortName(style);
      })
    : [''];
};
export const convertStylesToShortName = (styles: string): string => {
  switch (styles) {
    case 'compactChildStyle':
      return 'compact';
    case 'frameChildStyle':
      return 'frame';
    case 'blockChildStyle':
      return 'block';
    case 'specificationChildStyle':
      return 'specification';
    case 'rowBasedChildStyle':
      return 'row';
    case undefined:
      return '';
    default:
      return styles;
  }
};
