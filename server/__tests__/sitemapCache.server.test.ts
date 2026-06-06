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
import type {
  DataListWrapper,
  RecordWrapper,
} from '@/cora/cora-data/types.server';
import type { SitemapEntry } from '../sitemapCache.server';
import type { AxiosResponse } from 'axios';
import { getSearchResultDataListBySearchType } from '@/cora/getSearchResultDataListBySearchType.server';
import { getRecordDataById } from '@/cora/getRecordDataById.server';

vi.mock('@/cora/getSearchResultDataListBySearchType.server');
vi.mock('@/cora/getRecordDataById.server');

describe('sitemapCache', () => {
  describe('populateCache', () => {
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
  });

  describe('getEntries', () => {
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

    it('is possible to get entries from cache with from and entries params', async () => {
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

      const entries = sitemapCache.getEntries({ from: 2, entries: 2 });

      expect(entries.length).toBe(2);
      expect(entries[0].id).toBe('3');
      expect(entries[1].id).toBe('4');
    });

    it('is possible to get entries from cache with permissionUnit param', async () => {
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
            permissionUnit: 'uu',
          },
        ]),
      } as AxiosResponse<DataListWrapper>);

      await sitemapCache.populateCache();

      const entries = sitemapCache.getEntries({ permissionUnit: 'uu' });

      expect(entries.length).toBe(2);
      expect(entries[0].id).toBe('1');
      // 2 should not be included since it has a different permissionUnit
      expect(entries[1].id).toBe('3');
    });
  });

  describe('handleDataChanged', () => {
    it('should delete entry from cache when action is delete', async () => {
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
            permissionUnit: 'uu',
          },
        ]),
      } as AxiosResponse<DataListWrapper>);

      await sitemapCache.populateCache();

      sitemapCache.handleDataChanged({
        type: 'diva-output',
        id: '1',
        action: 'delete',
        messagingId: '123',
      });

      const entries = sitemapCache.getEntries();
      expect(entries).toHaveLength(2);
      expect(entries.find((entry) => entry.id === '1')).toBeUndefined();
    });

    it('should not delete entry when type is not diva-output', async () => {
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
            permissionUnit: 'uu',
          },
        ]),
      } as AxiosResponse<DataListWrapper>);

      await sitemapCache.populateCache();

      sitemapCache.handleDataChanged({
        type: 'diva-person',
        id: '1',
        action: 'delete',
        messagingId: '123',
      });

      const entries = sitemapCache.getEntries();
      expect(entries).toHaveLength(3);
      expect(entries.find((entry) => entry.id === '1')).toBeDefined();
    });

    it('should update entry in cache when action is update', async () => {
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
            permissionUnit: 'uu',
          },
        ]),
      } as AxiosResponse<DataListWrapper>);

      vi.mocked(getRecordDataById).mockResolvedValue({
        data: createRecordWrapperMock({
          id: '1',
          tsUpdated: '2026-02-26T12:23:48.968Z',
          permissionUnit: 'uu',
        }),
      } as AxiosResponse<RecordWrapper>);

      await sitemapCache.populateCache();

      await sitemapCache.handleDataChanged({
        type: 'diva-output',
        id: '1',
        action: 'update',
        messagingId: '123',
      });

      const entries = sitemapCache.getEntries();
      expect(entries).toHaveLength(3);
      expect(entries.find((entry) => entry.id === '1')).toEqual({
        id: '1',
        tsUpdated: '2026-02-26T12:23:48.968Z',
        permissionUnit: 'uu',
      });
    });

    it('should add entry in cache when action is create', async () => {
      vi.resetModules();
      const sitemapCache = await import('../sitemapCache.server');

      vi.mocked(getSearchResultDataListBySearchType).mockResolvedValue({
        data: generateSearchResultMock([
          {
            id: '2',
            tsUpdated: '2026-02-25T12:23:48.968Z',
            permissionUnit: 'nordiskamuseet',
          },
          {
            id: '3',
            tsUpdated: '2026-02-25T12:23:48.968Z',
            permissionUnit: 'uu',
          },
        ]),
      } as AxiosResponse<DataListWrapper>);

      vi.mocked(getRecordDataById).mockResolvedValue({
        data: createRecordWrapperMock({
          id: '1',
          tsUpdated: '2026-02-26T12:23:48.968Z',
          permissionUnit: 'uu',
        }),
      } as AxiosResponse<RecordWrapper>);

      await sitemapCache.populateCache();

      await sitemapCache.handleDataChanged({
        type: 'diva-output',
        id: '1',
        action: 'create',
        messagingId: '123',
      });

      const entries = sitemapCache.getEntries();
      expect(entries).toHaveLength(3);
      expect(entries.find((entry) => entry.id === '1')).toEqual({
        id: '1',
        tsUpdated: '2026-02-26T12:23:48.968Z',
        permissionUnit: 'uu',
      });
    });

    it('should add entry in cache when action is create for a new permissionUnit', async () => {
      vi.resetModules();
      const sitemapCache = await import('../sitemapCache.server');

      vi.mocked(getSearchResultDataListBySearchType).mockResolvedValue({
        data: generateSearchResultMock([
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
        ]),
      } as AxiosResponse<DataListWrapper>);

      vi.mocked(getRecordDataById).mockResolvedValue({
        data: createRecordWrapperMock({
          id: '1',
          tsUpdated: '2026-02-26T12:23:48.968Z',
          permissionUnit: 'kth',
        }),
      } as AxiosResponse<RecordWrapper>);

      await sitemapCache.populateCache();

      await sitemapCache.handleDataChanged({
        type: 'diva-output',
        id: '1',
        action: 'create',
        messagingId: '123',
      });

      expect(sitemapCache.getEntries({ permissionUnit: 'kth' })).toHaveLength(
        1,
      );
      expect(sitemapCache.getEntries({ permissionUnit: 'uu' })).toHaveLength(2);
    });
  });

  describe('events during cache warmup', () => {
    it('buffers events received while cache is warming and applies them after', async () => {
      vi.resetModules();
      const sitemapCache = await import('../sitemapCache.server');

      let resolveSearch: (value: any) => void;
      const searchPromise = new Promise((resolve) => {
        resolveSearch = resolve;
      });

      vi.mocked(getSearchResultDataListBySearchType).mockReturnValue(
        searchPromise as any,
      );

      // Start populating (will block on the search)
      const populatePromise = sitemapCache.populateCache();

      // While warming, send a create event
      vi.mocked(getRecordDataById).mockResolvedValue({
        data: createRecordWrapperMock({
          id: 'new-1',
          tsUpdated: '2026-03-01T00:00:00.000Z',
          permissionUnit: 'uu',
        }),
      } as AxiosResponse<RecordWrapper>);

      // This should be buffered, not applied immediately
      sitemapCache.handleDataChanged({
        type: 'diva-output',
        id: 'new-1',
        action: 'create',
        messagingId: '456',
      });

      // Resolve the search
      resolveSearch!({
        data: generateSearchResultMock([
          {
            id: '1',
            tsUpdated: '2026-02-25T12:23:48.968Z',
            permissionUnit: 'uu',
          },
        ]),
      });

      await populatePromise;

      // The buffered create event should have been applied
      const entries = sitemapCache.getEntries();
      expect(entries).toHaveLength(2);
      expect(entries.find((e) => e.id === 'new-1')).toEqual({
        id: 'new-1',
        tsUpdated: '2026-03-01T00:00:00.000Z',
        permissionUnit: 'uu',
      });
    });

    it('buffers delete event during warmup and removes entry after population', async () => {
      vi.resetModules();
      const sitemapCache = await import('../sitemapCache.server');

      let resolveSearch: (value: any) => void;
      const searchPromise = new Promise((resolve) => {
        resolveSearch = resolve;
      });

      vi.mocked(getSearchResultDataListBySearchType).mockReturnValue(
        searchPromise as any,
      );

      const populatePromise = sitemapCache.populateCache();

      // Buffer a delete for an entry that will be in the search results
      sitemapCache.handleDataChanged({
        type: 'diva-output',
        id: '1',
        action: 'delete',
        messagingId: '789',
      });

      resolveSearch!({
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
        ]),
      });

      await populatePromise;

      const entries = sitemapCache.getEntries();
      expect(entries).toHaveLength(1);
      expect(entries.find((e) => e.id === '1')).toBeUndefined();
      expect(entries[0].id).toBe('2');
    });

    it('only keeps the latest event per record when buffering', async () => {
      vi.resetModules();
      const sitemapCache = await import('../sitemapCache.server');

      let resolveSearch: (value: any) => void;
      const searchPromise = new Promise((resolve) => {
        resolveSearch = resolve;
      });

      vi.mocked(getSearchResultDataListBySearchType).mockReturnValue(
        searchPromise as any,
      );

      const populatePromise = sitemapCache.populateCache();

      // First a create, then a delete for the same record — only delete should apply
      sitemapCache.handleDataChanged({
        type: 'diva-output',
        id: '99',
        action: 'create',
        messagingId: '1',
      });
      sitemapCache.handleDataChanged({
        type: 'diva-output',
        id: '99',
        action: 'delete',
        messagingId: '2',
      });

      resolveSearch!({
        data: generateSearchResultMock([
          {
            id: '99',
            tsUpdated: '2026-02-25T12:23:48.968Z',
            permissionUnit: 'uu',
          },
        ]),
      });

      await populatePromise;

      const entries = sitemapCache.getEntries();
      expect(entries).toHaveLength(0);
    });

    it('buffers update event during warmup and applies updated data', async () => {
      vi.resetModules();
      const sitemapCache = await import('../sitemapCache.server');

      let resolveSearch: (value: any) => void;
      const searchPromise = new Promise((resolve) => {
        resolveSearch = resolve;
      });

      vi.mocked(getSearchResultDataListBySearchType).mockReturnValue(
        searchPromise as any,
      );

      vi.mocked(getRecordDataById).mockResolvedValue({
        data: createRecordWrapperMock({
          id: '1',
          tsUpdated: '2026-03-10T00:00:00.000Z',
          permissionUnit: 'uu',
        }),
      } as AxiosResponse<RecordWrapper>);

      const populatePromise = sitemapCache.populateCache();

      sitemapCache.handleDataChanged({
        type: 'diva-output',
        id: '1',
        action: 'update',
        messagingId: '999',
      });

      resolveSearch!({
        data: generateSearchResultMock([
          {
            id: '1',
            tsUpdated: '2026-02-25T12:23:48.968Z',
            permissionUnit: 'uu',
          },
        ]),
      });

      await populatePromise;

      const entries = sitemapCache.getEntries();
      expect(entries).toHaveLength(1);
      expect(entries[0].tsUpdated).toBe('2026-03-10T00:00:00.000Z');
    });

    it('does not buffer events for non diva-output types during warmup', async () => {
      vi.resetModules();
      const sitemapCache = await import('../sitemapCache.server');

      let resolveSearch: (value: any) => void;
      const searchPromise = new Promise((resolve) => {
        resolveSearch = resolve;
      });

      vi.mocked(getSearchResultDataListBySearchType).mockReturnValue(
        searchPromise as any,
      );

      const populatePromise = sitemapCache.populateCache();

      // Non diva-output events are still buffered by key but applyDataChangeEvent ignores them
      sitemapCache.handleDataChanged({
        type: 'diva-person',
        id: '1',
        action: 'create',
        messagingId: '100',
      });

      resolveSearch!({
        data: generateSearchResultMock([
          {
            id: '1',
            tsUpdated: '2026-02-25T12:23:48.968Z',
            permissionUnit: 'uu',
          },
        ]),
      });

      await populatePromise;

      // Should still only have the search result, non-diva-output event is ignored
      const entries = sitemapCache.getEntries();
      expect(entries).toHaveLength(1);
    });
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
    data: entries.map(createRecordWrapperMock),
  },
});

const createRecordWrapperMock = ({
  id,
  tsUpdated,
  permissionUnit,
}: SitemapEntry): RecordWrapper => {
  return {
    record: {
      actionLinks: {},
      data: {
        name: 'output',
        children: [
          {
            name: 'recordInfo',
            children: [
              { name: 'id', value: id },
              {
                name: 'updated',
                children: [
                  {
                    name: 'tsUpdated',
                    value: tsUpdated,
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
                    value: permissionUnit,
                  },
                ],
                name: 'permissionUnit',
              },
            ],
          },
        ],
      },
    },
  };
};
