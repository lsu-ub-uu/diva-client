import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { searchRecords } from '@/data/searchRecords.server';
import { AxiosError } from 'axios';
import { describe, expect, it, vi } from 'vitest';
import { performSearch } from '../performSearch.server';
import type { Auth } from '@/auth/Auth';
import type { BFFDataRecord } from '@/types/record';

describe('performSearch', () => {
  vi.mock('@/data/searchRecords.server');

  it('returns empty response on 400 error', async () => {
    vi.mocked(searchRecords).mockImplementation(() => {
      const error = new AxiosError('Server error');
      error.status = 400;
      throw error;
    });

    const result = await performSearch({
      dependencies: {} as Dependencies,
      searchId: 'test-search',
      searchQuery: {},
      auth: undefined,
      decorated: false,
    });

    expect(result).toEqual({
      data: [],
      fromNo: 0,
      toNo: 0,
      totalNo: 0,
      containDataOfType: 'mixed',
    });
  });

  it('returns route error response on 500 error', async () => {
    vi.mocked(searchRecords).mockImplementation(() => {
      const error = new AxiosError('Server error');
      error.status = 500;
      throw error;
    });

    try {
      await performSearch({
        dependencies: {} as Dependencies,
        searchId: 'test-search',
        searchQuery: {},
        auth: undefined,
      });
    } catch (error: any) {
      expect(error.init.status).toBe(500);
    }
  });

  it('calls performSearch with correct parameters', async () => {
    const mockSearchRecords = vi.mocked(searchRecords).mockResolvedValue({
      data: [{ id: '1' } as BFFDataRecord],
      fromNo: 0,
      toNo: 1,
      totalNo: 1,
      containDataOfType: 'mixed',
    });

    const params = {
      dependencies: {} as Dependencies,
      searchId: 'test-search',
      searchQuery: { query: 'test' },
      auth: {} as Auth,
      decorated: true,
    };

    const result = await performSearch(params);

    expect(mockSearchRecords).toHaveBeenCalledWith(
      params.dependencies,
      params.searchId,
      params.searchQuery,
      params.auth,
      params.decorated,
    );

    expect(result).toEqual({
      data: [{ id: '1' }],
      fromNo: 0,
      toNo: 1,
      totalNo: 1,
      containDataOfType: 'mixed',
    });
  });
});
