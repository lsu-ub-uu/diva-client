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

import {
  parseFormDataFromSearchParams,
  parseFormEntries,
} from '@/utils/parseFormData';
import { describe } from 'vitest';

describe('parseFormData', () => {
  describe('parseFormDaraFormSearchParam', () => {
    it('handles a single nested param', () => {
      const searchParams = new URLSearchParams(
        'search.include.includePart.genericSearchTerm.value=**',
      );
      const actual = parseFormDataFromSearchParams(searchParams);
      expect(actual).toStrictEqual({
        search: {
          include: {
            includePart: {
              genericSearchTerm: {
                value: '**',
              },
            },
          },
        },
      });
    });

    it('handles two params with shared parent', () => {
      const searchParams = new URLSearchParams(
        'search.include.includePart.genericSearchTerm1.value=1&search.include.includePart.genericSearchTerm2.value=2',
      );
      const actual = parseFormDataFromSearchParams(searchParams);
      expect(actual).toStrictEqual({
        search: {
          include: {
            includePart: {
              genericSearchTerm1: {
                value: '1',
              },
              genericSearchTerm2: {
                value: '2',
              },
            },
          },
        },
      });
    });

    it('handles arrays', () => {
      const searchParams = new URLSearchParams(
        'search.include.includePart.genericSearchTerm.value=**&search.rows[0].value=10&search.start[0].value=11',
      );
      const actual = parseFormDataFromSearchParams(searchParams);
      expect(actual).toStrictEqual({
        search: {
          include: {
            includePart: {
              genericSearchTerm: {
                value: '**',
              },
            },
          },
          rows: [{ value: '10' }],
          start: [{ value: '11' }],
        },
      });
    });

    it('handles arrays with multiple repeats', () => {
      const searchParams = new URLSearchParams(
        'search.include.includePart.genericSearchTerm.value=**&search.rows[0].value=10&search.rows[1].value=11',
      );
      const actual = parseFormDataFromSearchParams(searchParams);
      expect(actual).toStrictEqual({
        search: {
          include: {
            includePart: {
              genericSearchTerm: {
                value: '**',
              },
            },
          },
          rows: [{ value: '10' }, { value: '11' }],
        },
      });
    });

    it('handles array leafs', () => {
      const searchParams = new URLSearchParams(
        'search.include.includePart.genericSearchTerm.value=**&search.rows.values[0]=10',
      );
      const actual = parseFormDataFromSearchParams(searchParams);
      expect(actual).toStrictEqual({
        search: {
          include: {
            includePart: {
              genericSearchTerm: {
                value: '**',
              },
            },
          },
          rows: { values: ['10'] },
        },
      });
    });
  });

  it('merges values on the same object with array', () => {
    const actual = parseFormEntries([
      [
        'output.language[0].languageTerm_authority_iso639-2b_type_code.value',
        'ace',
      ],
      [
        'output.language[0].languageTerm_authority_iso639-2b_type_code._type',
        'code',
      ],
    ]);
    expect(actual).toStrictEqual({
      output: {
        language: [
          {
            'languageTerm_authority_iso639-2b_type_code': {
              _type: 'code',
              value: 'ace',
            },
          },
        ],
      },
    });
  });
});
