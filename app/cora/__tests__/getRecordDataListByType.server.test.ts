import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { coraApiUrl, RECORD_LIST_CONTENT_TYPE } from '@/cora/helper.server';
import { getRecordDataListByType } from '@/cora/getRecordDataListByType.server';

describe('getRecordDataListByType', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should fetch data for a valid type', async () => {
    const type = 'someValidType';
    const expectedResponse = {
      data: {
        test: 'someTestValue',
      },
      headers: {},
      request: {},
      status: 200,
    };
    const apiUrl: string = coraApiUrl(`/record/${type}`);
    mockAxios
      .onGet(apiUrl, {
        headers: { Accept: RECORD_LIST_CONTENT_TYPE },
      })
      .reply(200, expectedResponse);
    const response = await getRecordDataListByType(type);
    expect(response.data).toEqual(expect.objectContaining(expectedResponse));
  });

  it('should handle an error response with status 404', async () => {
    const type = 'invalidType';
    const apiUrl: string = coraApiUrl(`/record/${type}`);
    mockAxios
      .onGet(apiUrl, { headers: { Accept: RECORD_LIST_CONTENT_TYPE } })
      .reply(404);

    try {
      await getRecordDataListByType(type, 'validToken');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        expect(error.response?.status).toBe(404);
      }
    }
  });
});
