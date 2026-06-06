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
import divaMemberListWithAllData from '@/__mocks__/bff/divaMemberListWithAllData.json';
import divaMemberListWithMinimalData from '@/__mocks__/bff/divaMemberListWithMinimalData.json';
import emptyDataList from '@/__mocks__/bff/emptyDataList.json';
import type { BFFMember } from '@/cora/bffTypes.server';
import { transformMembers } from '@/cora/transform/transformMembers.server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/cora/getRecordDataById.server');

describe('transformMember', () => {
  it('transforms empty list', () => {
    const transformData = transformMembers(emptyDataList);
    expect(transformData).toStrictEqual([]);
  });

  it('transforms a member with all data', () => {
    const transformData = transformMembers(divaMemberListWithAllData);
    expect(transformData).toHaveLength(1);
    expect(transformData[0]).toStrictEqual({
      id: 'uu-theme',
      pageTitle: {
        sv: 'Uppsala Universitet',
        en: 'Uppsala University',
        cimode: 'pageTitleText',
      },
      backgroundColor: '#CCCCCC',
      textColor: '#990000',
      backgroundColorDarkMode: '#990000',
      textColorDarkMode: '#CCCCCC',
      links: [
        {
          displayLabel: 'Uppsala universitetsbibliotek',
          lang: 'swe',
          url: 'https://www.uu.se/bibliotek',
          visibility: 'public',
        },
        {
          displayLabel: 'Fråga biblioteket',
          lang: 'swe',
          url: 'http://libanswers.ub.uu.se',
          visibility: 'admin',
        },
        {
          displayLabel: 'Url för alla',
          lang: 'swe',
          url: 'http://someUrlForAll.se',
          visibility: 'all',
        },
        {
          displayLabel: 'Uppsala University Library',
          lang: 'eng',
          url: 'https://www.uu.se/en/library',
          visibility: 'public',
        },
        {
          displayLabel: 'Ask the Library',
          lang: 'eng',
          url: 'http://libanswers.ub.uu.se/en',
          visibility: 'admin',
        },
        {
          displayLabel: 'Url for everyone',
          lang: 'eng',
          url: 'http://someUrlForAll.com/en',
          visibility: 'all',
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
      hero: {
        title: {
          sv: 'Hjälte',
          en: 'Hero',
          cimode: 'titleText',
        },
        subTitle: {
          sv: 'Underhjälte',
          en: 'Subhero',
          cimode: 'subTitleText',
        },
        imageUrl: '/divaclient/public/images/hero/hero.jpg',
        imageAttribution: {
          title: {
            sv: 'Bildtitel',
            en: 'Image title',
            cimode: 'titleText',
          },
          author: 'Palle Kuling',
          source: {
            displayLabel: 'Source',
            url: 'https://example.com/source',
          },
          license: {
            displayLabel: 'License',
            url: 'https://example.com/license',
          },
        },
      },
    } satisfies BFFMember);
  });

  it('transforms a member with minimal data', () => {
    const transformData = transformMembers(divaMemberListWithMinimalData);
    expect(transformData).toHaveLength(1);
    expect(transformData[0]).toStrictEqual({
      id: 'uu-theme',
      pageTitle: {
        sv: 'Uppsala Universitet',
        en: 'Uppsala University',
        cimode: 'pageTitleText',
      },
      backgroundColor: '#CCCCCC',
      textColor: '#990000',
      logo: {
        svg: '<svg></svg>',
      },
      hostnames: ['uu.localhost'],
      loginUnitIds: ['uu'],
      hero: {
        title: {
          sv: 'Hjälte',
          en: 'Hero',
          cimode: 'titleText',
        },
        imageUrl: '/divaclient/public/images/hero/hero.jpg',
        imageAttribution: {
          source: {
            displayLabel: 'Source',
            url: 'https://example.com/source',
          },
          license: {
            displayLabel: 'License',
          },
        },
      },
    } satisfies BFFMember);
  });
});
