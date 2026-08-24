import type { Auth } from '@/auth/Auth';
import type { Dependencies } from '@/cora/bffTypes.server';
import { HttpError } from '@/cora/httpClient.server';
import { searchRecords } from '@/data/searchRecords.server';
import type { BFFDataRecord } from '@/types/record';
import type { TFunction } from 'i18next';
import { describe, expect, it, vi } from 'vitest';
import { performSearch } from '../performSearch.server';

const mockTFunction = vi.fn((key) => key) as unknown as TFunction;

vi.mock('@/data/searchRecords.server');

describe('performSearch', () => {
  it('returns empty response with alert on 400 error', async () => {
    vi.mocked(searchRecords).mockImplementation(() => {
      const error = new HttpError(
        new Response('Invalid search query', { status: 400 }),
      );
      throw error;
    });

    const result = await performSearch({
      dependencies: {} as Dependencies,
      searchId: 'test-search',
      searchQuery: {},
      auth: undefined,
      decorated: false,
      t: mockTFunction,
    });

    expect(result).toEqual({
      data: [],
      fromNo: 0,
      toNo: 0,
      totalNo: 0,
      containDataOfType: 'mixed',
      alert: {
        severity: 'error',
        summary: 'divaClient_error400TitleText',
        details: 'divaClient_error400BodyText',
      },
    });
  });

  it('returns empty respone with alert on non-http error', async () => {
    vi.mocked(searchRecords).mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    const result = await performSearch({
      dependencies: {} as Dependencies,
      searchId: 'test-search',
      searchQuery: {},
      auth: undefined,
      t: mockTFunction,
    });

    expect(result).toEqual({
      data: [],
      fromNo: 0,
      toNo: 0,
      totalNo: 0,
      containDataOfType: 'mixed',
      alert: {
        severity: 'error',
        summary: 'divaClient_unknownErrorTitleText',
        details: 'divaClient_unknownErrorBodyText',
      },
    });
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
      t: mockTFunction,
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
