import { createMockAuth, createMockCoraAuth } from '@/auth/__mocks__/auth';
import { requestAuthTokenOnLogin } from '@/cora/requestAuthTokenOnLogin.server';
import { log } from '@/logging/logger.server';
import { describe, expect, it, vi } from 'vitest';

describe('requestAuthTokenOnLogin', () => {
  it('handles response', async () => {
    const coraUser = 'coraUser:111111111111111';
    const mockAuth = createMockAuth({ data: { loginId: coraUser } });
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify(createMockCoraAuth(mockAuth)), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    const response = await requestAuthTokenOnLogin(
      coraUser,
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      'apptoken',
    );

    expect(response).toStrictEqual(mockAuth);
  });

  it('calls with correct parameters for appToken login', () => {
    const loginId = 'coraUser@ub.uu.se';
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(createMockCoraAuth({ data: { loginId } })), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const expectedBody = `coraUser@ub.uu.se\naaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`;
    const expectedHeaders = {
      Accept: 'application/vnd.cora.authentication+json',
      'Content-Type': 'application/vnd.cora.login',
    };

    requestAuthTokenOnLogin(
      loginId,
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      'apptoken',
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'https://cora.epc.ub.uu.se/diva/login/apptoken',
      { method: 'POST', headers: expectedHeaders, body: expectedBody },
    );
  });

  it('calls with correct parameters for password login', () => {
    const loginId = 'coraUser@ub.uu.se';
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(createMockCoraAuth({ data: { loginId } })), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const expectedBody = `coraUser@ub.uu.se\nhunter2`;
    const expectedHeaders = {
      Accept: 'application/vnd.cora.authentication+json',
      'Content-Type': 'application/vnd.cora.login',
    };

    requestAuthTokenOnLogin(loginId, 'hunter2', 'password');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://cora.epc.ub.uu.se/diva/login/password',
      { method: 'POST', headers: expectedHeaders, body: expectedBody },
    );
  });

  it('logs the error and re-throws when fetch rejects', async () => {
    const logErrorSpy = vi.spyOn(log, 'error').mockImplementation(() => {});
    const error = new Error('Unauthorized');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(error));

    await expect(
      requestAuthTokenOnLogin(
        'coraUser@ub.uu.se',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        'apptoken',
      ),
    ).rejects.toThrow(error);

    expect(logErrorSpy).toHaveBeenCalledWith(
      { err: error },
      'Error while requesting auth token on login: Unauthorized',
    );

    logErrorSpy.mockRestore();
  });
});
