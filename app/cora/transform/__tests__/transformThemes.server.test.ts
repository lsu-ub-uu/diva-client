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
import emptyDataList from '@/__mocks__/bff/emptyDataList.json';
import divaThemeList from '@/__mocks__/bff/divaThemeList.json';
import { transformThemes } from '@/cora/transform/transformThemes.server';

describe('transformTheme', () => {
  it('transforms empty list', () => {
    const transformData = transformThemes(emptyDataList);
    expect(transformData).toStrictEqual([]);
  });

  it('transforms the theme list', () => {
    const transformData = transformThemes(divaThemeList);
    expect(transformData).toHaveLength(2);
    expect(transformData).toStrictEqual([
      {
        id: 'uu-theme',
        pageTitle: {
          sv: 'Uppsala Universitet',
          en: 'Uppsala University',
        },
        backgroundColor: '#CCCCCC',
        textColor: '#990000',
        publicLinks: {
          sv: {
            url: 'https://www.uu.se/bibliotek',
            displayLabel: 'Uppsala universitetsbibliotek',
          },
          en: {
            url: 'https://www.uu.se/en/library',
            displayLabel: 'Uppsala University Library',
          },
        },
        adminLinks: { sv: '', en: '' },
        logo: {
          url: 'http://localhost:8080/img/logo.png',
          svg: '<svg></svg>',
        },
      },
      {},
    ]);
  });
});
