import { getRecordDataById } from '@/cora/getRecordDataById.server';
import { coraApiUrl, RECORD_CONTENT_TYPE } from '@/cora/helper.server';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('getRecordDataById', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });
  it('should fetch data for a valid type and id', async () => {
    const type = 'divaOutput';
    const id = 'divaOutput:11111111111111';
    const authToken = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    const expectedResponse = {
      status: 200,
    };
    const apiUrl: string = coraApiUrl(`/record/${type}/${id}`);
    mockAxios
      .onGet(apiUrl, {
        headers: {
          Accept: RECORD_CONTENT_TYPE,
          Authtoken: `${authToken}`,
        },
      })
      .reply(200, expectedResponse);
    const response = await getRecordDataById(type, id, authToken);
    expect(response.data).toEqual(expect.objectContaining(expectedResponse));
  });
});
