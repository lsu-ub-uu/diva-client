import axios from 'axios';
import { requestAuthTokenOnLogin } from '@/cora/requestAuthTokenOnLogin.server';

vi.mock('axios');

const authUser = {
  data: {
    children: [
      {
        name: 'token',
        value: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      },
      {
        name: 'validForNoSeconds',
        value: '600',
      },
      {
        name: 'userId', // idInUserStorage
        value: 'coraUser:111111111111111',
      },
      {
        name: 'loginId',
        value: 'user@domain.x',
      },
      {
        name: 'firstName',
        value: 'Everything',
      },
      {
        name: 'lastName',
        value: 'DiVA',
      },
    ],
    name: 'authToken',
  },
  actionLinks: {
    delete: {
      requestMethod: 'DELETE',
      rel: 'delete',
      url: 'http://localhost:38180/login/rest/authToken/b01dab5e-50eb-492a-b40d-f416500f5e6f',
    },
  },
};

describe('requestAuthTokenOnLogin', () => {
  it('handles response', async () => {
    const coraUser = 'coraUser:111111111111111';

    vi.spyOn(axios, 'post').mockReturnValue(
      Promise.resolve({ status: 200, data: authUser }),
    );
    const response = await requestAuthTokenOnLogin(
      coraUser,
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      'apptoken',
    );

    expect(response).toEqual({
      data: {
        token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        validForNoSeconds: '600',
        userId: 'coraUser:111111111111111',
        loginId: 'user@domain.x',
        lastName: 'DiVA',
        firstName: 'Everything',
      },
      actionLinks: {
        delete: {
          rel: 'delete',
          requestMethod: 'DELETE',
          url: 'http://localhost:38180/login/rest/authToken/b01dab5e-50eb-492a-b40d-f416500f5e6f',
        },
      },
    });
  });

  it('calls with correct parameters for appToken login', () => {
    const postSpy = vi
      .spyOn(axios, 'post')
      .mockReturnValue(Promise.resolve({ status: 200, data: authUser }));
    const loginId = 'coraUser@ub.uu.se';
    const expectedBody = `coraUser@ub.uu.se\naaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`;
    const expectedHeaders = {
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

  it('calls with correct parameters for appToken login', () => {
    const postSpy = vi
      .spyOn(axios, 'post')
      .mockReturnValue(Promise.resolve({ status: 200, data: authUser }));
    const loginId = 'coraUser@ub.uu.se';
    const expectedBody = `coraUser@ub.uu.se\naaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`;
    const expectedHeaders = {
      'Content-Type': 'application/vnd.uub.login',
    };

    requestAuthTokenOnLogin(
      loginId,
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      'password',
    );

    expect(postSpy).toBeCalledWith(
      'https://cora.epc.ub.uu.se/diva/login/password',
      expectedBody,
      { headers: expectedHeaders },
    );
  });
});
