import axios from 'axios';
import { requestAuthTokenOnLogin } from '@/cora/requestAuthTokenOnLogin.server';
import {
  createMockAuth,
  createMockCoraAuth,
} from '@/auth/__mocks__/auth';

vi.mock('axios');

describe('requestAuthTokenOnLogin', () => {
  it('handles response', async () => {
    const coraUser = 'coraUser:111111111111111';
    const mockAuth = createMockAuth({ data: { loginId: coraUser } });
    vi.spyOn(axios, 'post').mockReturnValue(
      Promise.resolve({ status: 200, data: createMockCoraAuth(mockAuth) }),
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
    const postSpy = vi.spyOn(axios, 'post').mockReturnValue(
      Promise.resolve({
        status: 200,
        data: createMockCoraAuth({ data: { loginId } }),
      }),
    );
    const expectedBody = `coraUser@ub.uu.se\naaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`;
    const expectedHeaders = {
      Accept: 'application/vnd.uub.authToken+json',
      'Content-Type': 'application/vnd.uub.login',
    };

    requestAuthTokenOnLogin(
      loginId,
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      'apptoken',
    );

    expect(postSpy).toBeCalledWith(
      'https://cora.epc.ub.uu.se/diva/login/apptoken',
      expectedBody,
      { headers: expectedHeaders },
    );
  });

  it('calls with correct parameters for password login', () => {
    const loginId = 'coraUser@ub.uu.se';
    const postSpy = vi.spyOn(axios, 'post').mockReturnValue(
      Promise.resolve({
        status: 200,
        data: createMockCoraAuth({ data: { loginId } }),
      }),
    );
    const expectedBody = `coraUser@ub.uu.se\nhunter2`;
    const expectedHeaders = {
      Accept: 'application/vnd.uub.authToken+json',
      'Content-Type': 'application/vnd.uub.login',
    };

    requestAuthTokenOnLogin(loginId, 'hunter2', 'password');

    expect(postSpy).toBeCalledWith(
      'https://cora.epc.ub.uu.se/diva/login/password',
      expectedBody,
      { headers: expectedHeaders },
    );
  });
});
