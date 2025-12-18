import { describe, expect, it, vi } from 'vitest';
import { getValidationTypes } from '../getValidationTypes.server';
import { getSearchResultDataListBySearchType } from '@/cora/getSearchResultDataListBySearchType.server';
import type {
  DataListWrapper,
  RecordWrapper,
} from '@/cora/cora-data/types.server';
import validationTypeList from '@/__mocks__/bff/validationTypeList.json';
import validationTypeListWithClassicAndRegular from '@/__mocks__/bff/validationTypeListWithClassicAndRegular.json';

import { AxiosError, type AxiosResponse } from 'axios';

vi.mock('@/cora/getSearchResultDataListBySearchType.server');

describe('getValidationTypes', () => {
  it('should return null when no auth token is provided', async () => {
    const result = await getValidationTypes('someRecordType', undefined);
    expect(result).toBeNull();
  });

  it('should return empty list when user is unauthorized to search for validation types', async () => {
    vi.mocked(getSearchResultDataListBySearchType).mockRejectedValue(
      new AxiosError('Unauthorized', '403', undefined, undefined, {
        status: 403,
      } as AxiosResponse),
    );

    const result = await getValidationTypes('someRecordType', 'someAuthToken');

    expect(result).toEqual([]);
  });

  it('should call Cora with correct query', async () => {
    const searchSpy = vi.mocked(getSearchResultDataListBySearchType);
    searchSpy.mockResolvedValue({
      status: 200,
      data: {
        dataList: {
          totalNo: '0',
          fromNo: '0',
          toNo: '0',
          containDataOfType: 'validationType',
          data: [] as RecordWrapper[],
        },
      },
    } as AxiosResponse<DataListWrapper>);

    const expectedQuery = {
      name: 'validationTypeSearch',
      children: [
        {
          name: 'include',
          children: [
            {
              name: 'includePart',
              children: [
                {
                  name: 'validatesRecordTypeSearchTerm',
                  value: 'recordType_someRecordType',
                },
              ],
            },
          ],
        },
      ],
    };

    await getValidationTypes('someRecordType', 'someAuthToken');

    expect(searchSpy).toHaveBeenCalledWith(
      'validationTypeSearch',
      expectedQuery,
      'someAuthToken',
    );
  });

  it('should return an empty list of validationTypes', async () => {
    const searchSpy = vi.mocked(getSearchResultDataListBySearchType);
    searchSpy.mockResolvedValue({
      status: 200,
      data: {
        dataList: {
          totalNo: '0',
          fromNo: '0',
          toNo: '0',
          containDataOfType: 'validationType',
          data: [] as RecordWrapper[],
        },
      },
    } as AxiosResponse<DataListWrapper>);

    const response = await getValidationTypes(
      'someRecordType',
      'someAuthToken',
    );
    expect(response).toEqual([]);
  });

  it('should return a list of validationTypes', async () => {
    const searchSpy = vi.mocked(getSearchResultDataListBySearchType);
    searchSpy.mockResolvedValue({
      status: 200,
      data: validationTypeList as DataListWrapper,
    } as AxiosResponse<DataListWrapper>);

    const response = await getValidationTypes(
      'someRecordType',
      'someAuthToken',
    );
    expect(response).toEqual([
      {
        label: 'someText',
        value: 'someValidationTypeId',
      },
    ]);
  });

  it('should remove classic validationTypes', async () => {
    const searchSpy = vi.mocked(getSearchResultDataListBySearchType);
    searchSpy.mockResolvedValue({
      status: 200,
      data: validationTypeListWithClassicAndRegular as DataListWrapper,
    } as AxiosResponse<DataListWrapper>);

    const response = await getValidationTypes(
      'someRecordType',
      'someAuthToken',
    );
    expect(response).toEqual([
      {
        label: 'someText',
        value: 'someValidationTypeId1',
      },
    ]);
  });
});
