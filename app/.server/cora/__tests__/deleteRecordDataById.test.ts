import { deleteRecordDataById } from '@/.server/cora/deleteRecordDataById';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { coraApiUrl } from '@/.server/cora/helper';

describe('deleteRecordDataById', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should delete data for a specific id', async () => {
    const type = 'divaOutput';
    const recordId = 'divaOutput:11111111111111';
    const authToken = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    const expectedResponse = {
      status: 200,
    };
    const apiUrl: string = coraApiUrl(`/record/${type}/${recordId}`);

    mockAxios
      .onDelete(apiUrl, {
        headers: expect.objectContaining({
          Authtoken: `${authToken}`,
        }),
      })
      .reply(200, expectedResponse);

    const response = await deleteRecordDataById(recordId, type, authToken);
    expect(response.data).toEqual(expect.objectContaining(expectedResponse));
  });
});
