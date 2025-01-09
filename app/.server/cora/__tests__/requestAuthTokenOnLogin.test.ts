import axios from 'axios';
import { requestAuthTokenOnLogin } from '@/.server/cora/requestAuthTokenOnLogin';

vi.mock('axios');

const authUser = {
  data: {
    children: [
      {
        name: 'token',
        value: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      },
      {
        name: 'validUntil',
        value: '1736345539581',
      },
      {
        name: 'renewUntil',
        value: '1736431339581',
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
    renew: {
      requestMethod: 'POST',
      rel: 'renew',
      url: 'http://130.238.171.95:38180/login/rest/authToken/b471b429-0306-4b06-b385-e7de434aa0d8',
      accept: 'application/vnd.uub.authToken+json',
    },
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
        renewUntil: '1736431339581',
        validUntil: '1736345539581',
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
        renew: {
          accept: 'application/vnd.uub.authToken+json',
          rel: 'renew',
          requestMethod: 'POST',
          url: 'http://130.238.171.95:38180/login/rest/authToken/b471b429-0306-4b06-b385-e7de434aa0d8',
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

  it('calls with correct parameters for appToken login', () => {
    const postSpy = vi
      .spyOn(axios, 'post')
      .mockReturnValue(Promise.resolve({ status: 200, data: authUser }));
    const loginId = 'coraUser@ub.uu.se';
    const expectedBody = `coraUser@ub.uu.se\naaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`;
    const expectedHeaders = {
      Accept: 'application/vnd.uub.authToken+json',
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
