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

import { parseFormDataFromSearchParams } from '@/utils/parseFormDataFromSearchParams';
import { describe, expect, it } from 'vitest';

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

  it('handles optional values', () => {
    const searchParams = new URLSearchParams(
      'search.include.includePart.genericSearchTerm.value=**&search.rows.value=10&search.start.value=11',
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
        rows: { value: '10' },
        start: { value: '11' },
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
