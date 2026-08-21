import { deleteAuthTokenFromCora } from '@/cora/deleteAuthToken.server';
import { describe, expect, it, vi } from 'vitest';

describe('deleteAuthTokenOnLogout', () => {
  it('Delete an appToken', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

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

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:38180/login/rest/authToken/bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
      {
        method: 'DELETE',
        headers: { Authtoken: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' },
        body: undefined,
      },
    );
    expect(response.status).toEqual(200);
  });
});
