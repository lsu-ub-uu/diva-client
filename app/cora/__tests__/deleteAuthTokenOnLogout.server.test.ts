import axios from 'axios';
import { deleteAuthTokenFromCora } from '@/cora/deleteAuthToken.server';
import MockAdapter from 'axios-mock-adapter';

vi.mock('axios');

describe('deleteAuthTokenOnLogout', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('Delete an appToken', async () => {
    // const coraUser = 'coraUser:111111111111111';
    const actionLink = {
      delete: {
        requestMethod: 'DELETE',
        rel: 'delete',
        url: 'http://localhost:38180/login/rest/authToken/bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
      },
    };
    const requestSpy = vi
      .spyOn(axios, 'request')
      .mockReturnValue(Promise.resolve({ status: 200 }));
    const response = await deleteAuthTokenFromCora(
      actionLink,
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    );

    const expectedHeaders = {
      Authtoken: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    };

    expect(requestSpy).toBeCalledWith({
      headers: expectedHeaders,
      url: 'http://localhost:38180/login/rest/authToken/bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
      method: 'DELETE',
    });
    expect(response.status).toEqual(200);
  });
});
