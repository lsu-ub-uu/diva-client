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

import { describe, expect, it } from 'vitest';
import { removeEmpty } from '../removeEmpty';

describe('removeEmpty', () => {
  it.each([
    {
      description: 'should remove null and undefined properties',
      input: {
        prop1: 'hello',
        prop2: undefined,
        prop3: null,
        prop4: {
          innerProp: undefined,
          innerProp2: 'world',
        },
        prop5: [],
        prop6: ['a'],
        prop7: '',
        prop8: {},
      },
      expected: {
        prop1: 'hello',
        prop4: {
          innerProp2: 'world',
        },
        prop6: ['a'],
      },
    },
    {
      description: 'should remove empty values from a clean object',
      input: {
        prop1: 'hello',
        prop4: {
          innerProp2: 'world',
        },
        prop6: ['a'],
      },
      expected: {
        prop1: 'hello',
        prop4: {
          innerProp2: 'world',
        },
        prop6: ['a'],
      },
    },
    { description: 'should return number as is', input: 42, expected: 42 },
    {
      description: 'should return string as is',
      input: 'hello',
      expected: 'hello',
    },
    { description: 'should return true as is', input: true, expected: true },
    {
      description: 'should return false as is',
      input: false,
      expected: false,
    },
    { description: 'should return null as is', input: null, expected: null },
    {
      description: 'should return undefined as is',
      input: undefined,
      expected: undefined,
    },
  ])('$description', ({ input, expected }) => {
    expect(removeEmpty(input)).toStrictEqual(expected);
  });
});
