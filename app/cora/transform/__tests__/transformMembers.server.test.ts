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
import divaMemberListWithMemberPermissionUnit from '@/__mocks__/bff/divaMemberListWithMemberPermissionUnit.json';
import divaMemberListWithSvgLogo from '@/__mocks__/bff/divaMemberListWithSvgLogo.json';
import divaMemberLogoBinary from '@/__mocks__/bff/divaMemberLogoBinary.json';
import emptyDataList from '@/__mocks__/bff/emptyDataList.json';
import type { BFFMember } from '@/cora/bffTypes.server';
import { getRecordDataById } from '@/cora/getRecordDataById.server';
import { transformMembers } from '@/cora/transform/transformMembers.server';
import type { AxiosResponse } from 'axios';
import { describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';

vi.mock('@/cora/getRecordDataById.server');

describe('transformMember', () => {
  it('transforms empty list', () => {
    const transformData = transformMembers(emptyDataList);
    expect(transformData).toStrictEqual([]);
  });

  it('transforms a member with links and svg logo', () => {
    const transformData = transformMembers(divaMemberListWithSvgLogo);
    expect(transformData).toHaveLength(1);
    expect(transformData[0]).toStrictEqual({
      id: 'uu-theme',
      pageTitle: {
        sv: 'Uppsala Universitet',
        en: 'Uppsala University',
      },
      backgroundColor: '#CCCCCC',
      textColor: '#990000',
      backgroundColorDarkMode: '#990000',
      textColorDarkMode: '#CCCCCC',
      links: [
        {
          lang: 'swe',
          visibility: 'public',
          url: 'https://www.uu.se/bibliotek',
          displayLabel: 'Uppsala universitetsbibliotek',
        },
        {
          lang: 'eng',
          visibility: 'public',
          url: 'https://www.uu.se/en/library',
          displayLabel: 'Uppsala University Library',
        },
        {
          lang: 'swe',
          visibility: 'admin',
          url: 'http://libanswers.ub.uu.se',
          displayLabel: 'Fråga biblioteket',
        },
        {
          lang: 'eng',
          visibility: 'all',
          url: 'http://libanswers.ub.uu.se/en',
          displayLabel: 'Ask the Library',
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
      loginUnitIds: ['uu'],
    } satisfies BFFMember);
  });

  it('transforms a member memberPermissionUnit', () => {
    vi.mocked(getRecordDataById).mockResolvedValue(
      mock<AxiosResponse>({
        data: divaMemberLogoBinary,
      }),
    );
    const transformData = transformMembers(
      divaMemberListWithMemberPermissionUnit,
    );
    expect(transformData).toHaveLength(1);
    expect(transformData[0]).toStrictEqual({
      backgroundColor: '#75598e',
      id: 'diva-member',
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
      loginUnitIds: ['uu'],
    });
  });
});
