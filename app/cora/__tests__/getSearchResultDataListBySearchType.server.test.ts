import { describe, expect, it, vi } from 'vitest';
import {
  RECORD_LIST_CONTENT_TYPE,
  RECORD_LIST_CONTENT_TYPE_DECORATED,
} from '../helper.server';
import { getSearchResultDataListBySearchType } from '../getSearchResultDataListBySearchType.server';

const ENCODED_URL =
  'https://cora.com/rest/record/searchResult/someSearchId?searchData=%7B%22name%22:%22search%22,%22children%22:%5B%7B%22name%22:%22foo%22,%22value%22:%22bar%22%7D%5D%7D';

const searchId = 'someSearchId';

const searchData = {
  name: 'search',
  children: [{ name: 'foo', value: 'bar' }],
};

describe('getSearchResultDataListBySearchType', () => {
  it('calls rest endpoint with correct url and headers', async () => {
    const authToken = 'someAuthToken';
    vi.stubEnv('CORA_API_URL', 'https://cora.com/rest');
    const mockData = { dataList: { data: [] } };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(mockData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const response = await getSearchResultDataListBySearchType(
      searchId,
      searchData,
      authToken,
    );

    expect(fetchMock).toHaveBeenCalledWith(ENCODED_URL, {
      headers: {
        Accept: RECORD_LIST_CONTENT_TYPE,
        Authtoken: authToken,
      },
      method: 'GET',
    });
    expect(response).toMatchObject({ status: 200, data: mockData });
  });

  it('sets decorated header', async () => {
    const authToken = 'someAuthToken';
    vi.stubEnv('CORA_API_URL', 'https://cora.com/rest');
    const mockData = { dataList: { data: [] } };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(mockData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await getSearchResultDataListBySearchType(
      searchId,
      searchData,
      authToken,
      true,
    );

    expect(fetchMock).toHaveBeenCalledWith(ENCODED_URL, {
      headers: {
        Accept: RECORD_LIST_CONTENT_TYPE_DECORATED,
        Authtoken: authToken,
      },
      method: 'GET',
    });
  });

  it('omits Authtoken header when no authToken is provided', async () => {
    vi.stubEnv('CORA_API_URL', 'https://cora.com/rest');
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await getSearchResultDataListBySearchType(searchId, searchData);

    expect(fetchMock).toHaveBeenCalledWith(ENCODED_URL, {
      headers: { Accept: RECORD_LIST_CONTENT_TYPE },
      method: 'GET',
    });
  });
});
