import { deleteAuthTokenFromCora } from '@/cora/deleteAuthToken.server';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

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
    const requestSpy = vi
      .spyOn(axios, 'request')
      .mockReturnValue(Promise.resolve({ status: 200 }));
    const response = await deleteAuthTokenFromCora({
      data: {
        validUntil: '',
        renewUntil: '',
        userId: '',
        loginId: '',
        token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      },
      actionLinks: {
        renew: {
          requestMethod: 'POST',
          rel: 'renew',
          url: 'http://localhost:38180/login/rest/authToken/bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        },
        delete: {
          requestMethod: 'DELETE',
          rel: 'delete',
          url: 'http://localhost:38180/login/rest/authToken/bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        },
      },
    });

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
