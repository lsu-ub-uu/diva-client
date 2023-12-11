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

import { BFFRecordType, BFFText } from '../../../config/bffTypes';
import { listToPool } from '../listToPool';

const someListWithThreeRecordTypes: BFFRecordType[] = [
  {
    id: '1',
    presentationViewId: '',
    listPresentationViewId: '',
    menuPresentationViewId: '',
    autocompletePresentationView: ''
  },
  {
    id: '2',
    presentationViewId: '',
    listPresentationViewId: '',
    menuPresentationViewId: '',
    autocompletePresentationView: ''
  },
  {
    id: '3',
    presentationViewId: '',
    listPresentationViewId: '',
    menuPresentationViewId: '',
    autocompletePresentationView: ''
  },
];

const someListWithTwoTexts: BFFText[] = [
  { id: '1', en: 'hello', sv: 'hej' },
  { id: '2', en: 'good bye', sv: 'hej då' }
];

describe('listToPool', () => {
  it('should take an empty list and create an empty pool', () => {
    const pool = listToPool<BFFText>([]);
    expect(pool.size()).toBe(0);
  });

  it('should take a list of BFFTexts and populate pool', () => {
    const pool = listToPool<BFFText>(someListWithTwoTexts);
    expect(pool.size()).toBe(2);
  });

  it('should take a list of BFFRecordTypes and populate pool', () => {
    const pool = listToPool<BFFRecordType>(someListWithThreeRecordTypes);
    expect(pool.size()).toBe(3);
  });
});
