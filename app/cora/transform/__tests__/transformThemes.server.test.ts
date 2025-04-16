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
import divaThemeListWithBinaryLogo from '@/__mocks__/bff/divaThemeListWithBinaryLogo.json';
import divaThemeListWithMemberPermissionUnit from '@/__mocks__/bff/divaThemeListWithMemberPermissionUnit.json';
import divaThemeListWithSvgLogo from '@/__mocks__/bff/divaThemeListWithSvgLogo.json';
import divaThemeLogoBinary from '@/__mocks__/bff/divaThemeLogoBinary.json';
import emptyDataList from '@/__mocks__/bff/emptyDataList.json';
import { getRecordDataById } from '@/cora/getRecordDataById.server';
import { transformThemes } from '@/cora/transform/transformThemes.server';
import type { AxiosResponse } from 'axios';
import { describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';

vi.mock('@/cora/getRecordDataById.server');

describe('transformTheme', () => {
  it('transforms empty list', async () => {
    const transformData = await transformThemes(emptyDataList);
    expect(transformData).toStrictEqual([]);
  });

  it('transforms a theme with links and svg logo', async () => {
    const transformData = await transformThemes(divaThemeListWithSvgLogo);
    expect(transformData).toHaveLength(1);
    expect(transformData[0]).toStrictEqual({
      id: 'uu-theme',
      pageTitle: {
        sv: 'Uppsala Universitet',
        en: 'Uppsala University',
      },
      backgroundColor: '#CCCCCC',
      textColor: '#990000',
      publicLinks: [
        {
          sv: {
            url: 'https://www.uu.se/bibliotek',
            displayLabel: 'Uppsala universitetsbibliotek',
          },
          en: {
            url: 'https://www.uu.se/en/library',
            displayLabel: 'Uppsala University Library',
          },
        },
        {
          sv: {
            url: 'http://libanswers.ub.uu.se',
            displayLabel: 'Fråga biblioteket',
          },
          en: {
            url: 'http://libanswers.ub.uu.se/en',
            displayLabel: 'Ask the Library',
          },
        },
      ],
      adminLinks: [
        {
          sv: {
            url: 'https://www.uu.se/support',
            displayLabel: 'Kontakta support',
          },
          en: {
            url: 'https://www.uu.se/en/support',
            displayLabel: 'Contact support',
          },
        },
      ],
      logo: {
        svg: '<svg></svg>',
      },
      hostnames: [
        'uu.localhost',
        'uu.cora.epc.ub.uu.se',
        'uu.pre.diva-portal.org',
      ],
    });
  });

  it('transforms a theme without links and binary logo', async () => {
    vi.mocked(getRecordDataById).mockResolvedValue(
      mock<AxiosResponse>({
        data: divaThemeLogoBinary,
      }),
    );
    const transformData = await transformThemes(divaThemeListWithBinaryLogo);
    expect(transformData).toHaveLength(1);
    expect(transformData[0]).toStrictEqual({
      backgroundColor: '#75598e',
      id: 'diva-theme',
      logo: {
        url: 'https://cora.epc.ub.uu.se/diva/rest/record/binary/binary:1719226498099516/master',
      },
      pageTitle: {
        en: 'DiVA',
        sv: 'DiVA',
      },
      textColor: '#ffffff',
      hostnames: ['localhost', 'cora.epc.ub.uu.se', 'pre.diva-portal.org'],
    });
  });

  it('transforms a theme memberPermissionUnit', async () => {
    vi.mocked(getRecordDataById).mockResolvedValue(
      mock<AxiosResponse>({
        data: divaThemeLogoBinary,
      }),
    );
    const transformData = await transformThemes(
      divaThemeListWithMemberPermissionUnit,
    );
    expect(transformData).toHaveLength(1);
    expect(transformData[0]).toStrictEqual({
      backgroundColor: '#75598e',
      id: 'diva-theme',
      memberPermissionUnit: 'uu',
      logo: {
        svg: '<svg></svg>',
      },
      pageTitle: {
        en: 'DiVA',
        sv: 'DiVA',
      },
      textColor: '#ffffff',
      hostnames: ['localhost', 'cora.epc.ub.uu.se', 'pre.diva-portal.org'],
    });
  });
});
