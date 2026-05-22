/*
 * Copyright 2026 Uppsala University Library
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
import { describe, expect, it, vi } from 'vitest';
import type { DataListWrapper } from '@/cora/cora-data/types.server';
import type { SitemapEntry } from '../sitemapCache.server';
import type { AxiosResponse } from 'axios';
import { getSearchResultDataListBySearchType } from '@/cora/getSearchResultDataListBySearchType.server';

describe('sitemapCache', () => {
  it('populates cache', async () => {
    vi.resetModules();
    const sitemapCache = await import('../sitemapCache.server');
    const expectedEntries: SitemapEntry[] = [
      {
        id: '1',
        tsUpdated: '2026-02-25T12:23:48.968Z',
        permissionUnit: 'nordiskamuseet',
      },
      {
        id: '2',
        tsUpdated: '2026-02-26T12:23:48.968Z',
        permissionUnit: 'nordiskamuseet',
      },
    ];
    vi.mocked(getSearchResultDataListBySearchType).mockResolvedValue({
      data: generateSearchResultMock(expectedEntries),
    } as AxiosResponse<DataListWrapper>);

    await sitemapCache.populateCache();

    const entries = sitemapCache.getEntries({ from: 0, entries: 1000 });

    expect(entries).toStrictEqual(expectedEntries);
  });

  it('populates cache that requires multiple searches', async () => {
    vi.resetModules();
    const sitemapCache = await import('../sitemapCache.server');
    const mockResults = Array.from({ length: 1500 }, (_, i) => ({
      id: i.toString(),
      tsUpdated: '2026-02-25T12:23:48.968Z',
      permissionUnit: 'uu',
    }));

    vi.mocked(getSearchResultDataListBySearchType)
      .mockResolvedValueOnce({
        data: generateSearchResultMock(
          mockResults.slice(0, 1000),
          '1',
          '1000',
          '1500',
        ),
      } as AxiosResponse<DataListWrapper>)
      .mockResolvedValueOnce({
        data: generateSearchResultMock(
          mockResults.slice(1000),
          '1001',
          '1500',
          '1500',
        ),
      } as AxiosResponse<DataListWrapper>);

    await sitemapCache.populateCache();

    const entries = sitemapCache.getEntries({ from: 0, entries: 10000 });
    expect(entries).toHaveLength(1500);
  });

  it('populates cache 2 permissionUnits and return entries for a specific permissionUnit', async () => {
    vi.resetModules();
    const sitemapCache = await import('../sitemapCache.server');

    vi.mocked(getSearchResultDataListBySearchType).mockResolvedValue({
      data: generateSearchResultMock([
        {
          id: '1',
          tsUpdated: '2026-02-25T12:23:48.968Z',
          permissionUnit: 'uu',
        },
        {
          id: '2',
          tsUpdated: '2026-02-25T12:23:48.968Z',
          permissionUnit: 'nordiskamuseet',
        },
        {
          id: '3',
          tsUpdated: '2026-02-25T12:23:48.968Z',
          permissionUnit: 'kth',
        },
      ]),
    } as AxiosResponse<DataListWrapper>);

    await sitemapCache.populateCache();

    const entries = sitemapCache.getEntries({
      from: 0,
      entries: 1000,
      permissionUnit: 'uu',
    });

    expect(entries).toStrictEqual([
      {
        id: '1',
        tsUpdated: '2026-02-25T12:23:48.968Z',
        permissionUnit: 'uu',
      },
    ]);
  });

  it('populates cache and gets entries with from and entries params ', async () => {
    vi.resetModules();
    const sitemapCache = await import('../sitemapCache.server');

    vi.mocked(getSearchResultDataListBySearchType).mockResolvedValue({
      data: generateSearchResultMock([
        {
          id: '1',
          tsUpdated: '2026-02-25T12:23:48.968Z',
          permissionUnit: 'uu',
        },
        {
          id: '2',
          tsUpdated: '2026-02-25T12:23:48.968Z',
          permissionUnit: 'uu',
        },
        {
          id: '3',
          tsUpdated: '2026-02-25T12:23:48.968Z',
          permissionUnit: 'uu',
        },
        {
          id: '4',
          tsUpdated: '2026-02-25T12:23:48.968Z',
          permissionUnit: 'uu',
        },
        {
          id: '5',
          permissionUnit: 'uu',
          tsUpdated: '2026-02-25T12:23:48.968Z',
        },
        {
          id: '6',
          permissionUnit: 'nordiskamuseet',
          tsUpdated: '2026-02-26T12:23:48.968Z',
        },
        {
          id: '7',
          permissionUnit: 'nordiskamuseet',
          tsUpdated: '2026-02-26T12:23:48.968Z',
        },
        {
          id: '8',
          tsUpdated: '2026-02-25T12:23:48.968Z',
          permissionUnit: 'uu',
        },
        {
          id: '9',
          tsUpdated: '2026-02-25T12:23:48.968Z',
          permissionUnit: 'uu',
        },
        {
          id: '10',
          tsUpdated: '2026-02-25T12:23:48.968Z',
          permissionUnit: 'uu',
        },
      ]),
    } as AxiosResponse<DataListWrapper>);

    await sitemapCache.populateCache();

    const entries = sitemapCache.getEntries({ from: 3, entries: 5 });

    expect(entries.length).toBe(5);
  });

  it('is possible to get all entries from cache', async () => {
    vi.resetModules();
    const sitemapCache = await import('../sitemapCache.server');

    vi.mocked(getSearchResultDataListBySearchType).mockResolvedValue({
      data: generateSearchResultMock([
        {
          id: '1',
          tsUpdated: '2026-02-25T12:23:48.968Z',
          permissionUnit: 'uu',
        },
        {
          id: '2',
          tsUpdated: '2026-02-25T12:23:48.968Z',
          permissionUnit: 'uu',
        },
        {
          id: '3',
          tsUpdated: '2026-02-25T12:23:48.968Z',
          permissionUnit: 'uu',
        },
        {
          id: '4',
          tsUpdated: '2026-02-25T12:23:48.968Z',
          permissionUnit: 'uu',
        },
        {
          id: '5',
          permissionUnit: 'uu',
          tsUpdated: '2026-02-25T12:23:48.968Z',
        },
      ]),
    } as AxiosResponse<DataListWrapper>);

    await sitemapCache.populateCache();

    const entries = sitemapCache.getEntries();

    expect(entries.length).toBe(5);
  });
});

const generateSearchResultMock = (
  entries: SitemapEntry[],
  fromNo?: string,
  toNo?: string,
  totalNo?: string,
): DataListWrapper => ({
  dataList: {
    fromNo: fromNo ?? '1',
    toNo: toNo ?? String(entries.length),
    totalNo: totalNo ?? String(entries.length),
    containDataOfType: 'mix',
    data: entries.map((entry) => ({
      record: {
        actionLinks: {},
        data: {
          name: 'output',
          children: [
            {
              name: 'recordInfo',
              children: [
                { name: 'id', value: entry.id },
                {
                  name: 'updated',
                  children: [
                    {
                      name: 'tsUpdated',
                      value: entry.tsUpdated,
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
                      value: entry.permissionUnit,
                    },
                  ],
                  name: 'permissionUnit',
                },
              ],
            },
          ],
        },
      },
    })),
  },
});
