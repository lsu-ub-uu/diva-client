import { describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import {
  RECORD_LIST_CONTENT_TYPE,
  RECORD_LIST_CONTENT_TYPE_DECORATED,
} from '../helper.server';
import { getSearchResultDataListBySearchType } from '../getSearchResultDataListBySearchType.server';

vi.mock('axios');

describe('getSearchResultDataListBySearchType', () => {
  it('calls rest endpoint with correct url and headers', async () => {
    const authToken = 'someAuthToken';
    vi.stubEnv('CORA_API_URL', 'https://cora.com/rest');
    const searchId = 'someSearchId';
    const searchData = {
      name: 'search',
      children: [{ name: 'foo', value: 'bar' }],
    };

    const mockResponse = { status: 200, data: { dataList: { data: [] } } };

    const requestSpy = vi
      .spyOn(axios, 'get')
      .mockReturnValue(Promise.resolve(mockResponse));

    const response = await getSearchResultDataListBySearchType(
      searchId,
      searchData,
      authToken,
    );
    expect(requestSpy).toHaveBeenCalledWith(
      'https://cora.com/rest/record/searchResult/someSearchId?searchData=%7B%22name%22:%22search%22,%22children%22:%5B%7B%22name%22:%22foo%22,%22value%22:%22bar%22%7D%5D%7D',
      {
        headers: {
          Accept: RECORD_LIST_CONTENT_TYPE,
          Authtoken: `${authToken}`,
        },
      },
    );

    expect(response).toBe(mockResponse);
  });

  it('sets decorated header', async () => {
    const authToken = 'someAuthToken';
    vi.stubEnv('CORA_API_URL', 'https://cora.com/rest');
    const searchId = 'someSearchId';
    const searchData = {
      name: 'search',
      children: [{ name: 'foo', value: 'bar' }],
    };

    const mockResponse = { status: 200, data: { dataList: { data: [] } } };

    const requestSpy = vi
      .spyOn(axios, 'get')
      .mockReturnValue(Promise.resolve(mockResponse));

    const response = await getSearchResultDataListBySearchType(
      searchId,
      searchData,
      authToken,
      true,
    );
    expect(requestSpy).toHaveBeenCalledWith(
      'https://cora.com/rest/record/searchResult/someSearchId?searchData=%7B%22name%22:%22search%22,%22children%22:%5B%7B%22name%22:%22foo%22,%22value%22:%22bar%22%7D%5D%7D',
      {
        headers: {
          Accept: RECORD_LIST_CONTENT_TYPE_DECORATED,
          Authtoken: `${authToken}`,
        },
      },
    );

    expect(response).toBe(mockResponse);
  });
});
