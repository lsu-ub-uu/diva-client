import type { DataListWrapper } from '@/cora/cora-data/types.server';
import { describe, expect, it } from 'vitest';
import { generateSitemapXml } from '../sitemap';
import expectedSitemap from './expectedSitemap.xml?raw';
import { vi } from 'vitest';
import { getSearchResultDataListBySearchType } from '@/cora/getSearchResultDataListBySearchType.server';
import type { AxiosResponse } from 'axios';
import {
  getEntries,
  populateCache,
  transformSearchResults,
} from 'server/sitemapCache';

const mockSearchResults: DataListWrapper = {
  dataList: {
    fromNo: '1',
    toNo: '2',
    totalNo: '2',
    containDataOfType: 'mix',
    data: [
      {
        record: {
          actionLinks: {},
          data: {
            name: 'output',
            children: [
              {
                name: 'recordInfo',
                children: [
                  { name: 'id', value: '1' },
                  {
                    name: 'updated',
                    children: [
                      {
                        name: 'tsUpdated',
                        value: '2026-02-25T12:23:48.968871Z',
                      },
                    ],
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'permissionUnit',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'nordiskamuseet',
                      },
                    ],
                    name: 'permissionUnit',
                  },
                ],
              },
            ],
          },
        },
      },
      {
        record: {
          actionLinks: {},
          data: {
            name: 'output',
            children: [
              {
                name: 'recordInfo',
                children: [
                  { name: 'id', value: '2' },
                  {
                    name: 'updated',
                    children: [
                      {
                        name: 'tsUpdated',
                        value: '2026-02-26T12:23:48.968871Z',
                      },
                    ],
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'permissionUnit',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'nordiskamuseet',
                      },
                    ],
                    name: 'permissionUnit',
                  },
                ],
              },
            ],
          },
        },
      },
    ],
  },
};

vi.mock('@/cora/getSearchResultDataListBySearchType.server');

describe('generateSitemapXml', () => {
  it('generates correct sitemap xml', async () => {
    const sitemap = await generateSitemapXml('http://example.com', {
      mainNavigationItems: [
        {
          id: 'recordType1',
          link: '/recordType1',
          textId: 'recordType1PluralText',
        },
        {
          id: 'recordType2',
          link: '/recordType2',
          textId: 'recordType2PluralText',
        },
      ],
      otherNavigationItems: [],
    });
    expect(sitemap).toBe(expectedSitemap);
  });

  it('generates correct sitemap xml when no record types', async () => {
    const sitemap = await generateSitemapXml('http://example.com', {
      mainNavigationItems: [],
      otherNavigationItems: [],
    });
    expect(sitemap).toBe(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://example.com</loc>
  </url>
</urlset>`);
  });

  /* it('generates correct cache for diva-outputs', async () => {
    const sitemapOutput = await transformSearchResults(mockSearchResults);
    expect(sitemapOutput).toStrictEqual([
      { id: '1', tsUpdated: '2026-02-25T12:23:48.968Z' },
      { id: '2', tsUpdated: '2026-02-26T12:23:48.968Z' },
    ]);
  }); */
});

it('populates cache', async () => {
  vi.mocked(getSearchResultDataListBySearchType).mockResolvedValue({
    data: mockSearchResults,
  } as AxiosResponse<DataListWrapper>);

  await populateCache();

  const entries = getEntries(0, 1000);

  expect(entries).toStrictEqual({
    nordiskamuseet: {
      1: { id: '1', tsUpdated: '2026-02-25T12:23:48.968Z' },
      2: { id: '2', tsUpdated: '2026-02-26T12:23:48.968Z' },
    },
  });
});
