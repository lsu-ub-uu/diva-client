/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import { expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import Login from '@/components/Layout/Header/Login/Login';

const loginUnits = [
  {
    loginDescription: 'rkhTestDiVALoginUnitText',
    url: 'https://www.diva-portal.org/Shibboleth.sso/Login/rkh?target=https://www.diva-portal.org/diva-test/idplogin/login',
    type: 'webRedirect',
  },
  {
    loginDescription: 'skhTestDiVALoginUnitText',
    url: 'https://www.diva-portal.org/Shibboleth.sso/Login/uniarts?target=https://www.diva-portal.org/diva-test/idplogin/login',
    type: 'webRedirect',
  },
  {
    loginDescription: 'ltuDiVALoginUnitText',
    url: 'https://www.diva-portal.org/Shibboleth.sso/Login/ltu?target=https://www.diva-portal.org/diva/idplogin/login',
    type: 'webRedirect',
  },
];

describe('<Login/>', () => {
  describe('Login menu', () => {
    it('shows the accounts in a list', async () => {
      const user = userEvent.setup();

      const RoutesStub = createRoutesStub([
        {
          path: '/',
          Component: Login,
          loader() {
            return { loginUnits };
          },
        },
      ]);

      render(<RoutesStub />);

      const loginButton = await waitFor(() =>
        screen.getByRole('button', {
          name: 'divaClient_LoginText',
        }),
      );
      await user.click(loginButton);

      await waitFor(() => {
        const userNameList = screen.queryAllByRole('menuitem');
        const listItems = userNameList.map((item) => item.textContent);
        expect(listItems).toEqual([
          'DiVA Admin',
          'DiVA Everything',
          'Admin System',
          'UU domainAdmin',
          'KTH domainAdmin',
          'rkhTestDiVALoginUnitText',
          'skhTestDiVALoginUnitText',
          'ltuDiVALoginUnitText',
        ]);
      });
    });

    it('returns only DiVAAdmin when environment is pre', async () => {
      vi.stubEnv('ENVIRONMENT', 'pre');
      const user = userEvent.setup();

      const RoutesStub = createRoutesStub([
        {
          path: '/',
          Component: Login,
          loader() {
            return { loginUnits };
          },
        },
      ]);

      render(<RoutesStub />);

      const loginButton = await waitFor(() =>
        screen.getByRole('button', {
          name: 'divaClient_LoginText',
        }),
      );
      await user.click(loginButton);

      await waitFor(() => {
        const userNameList = screen.queryAllByRole('menuitem');
        const listItems = userNameList.map((item) => item.textContent);
        expect(listItems).toEqual([
          'DiVA Admin',
          'rkhTestDiVALoginUnitText',
          'skhTestDiVALoginUnitText',
          'ltuDiVALoginUnitText',
        ]);
      });
    });

    describe('webRedirect accounts opens a link to Shibboleth', async () => {
      it.each(
        loginUnits.map((loginUnit) => [
          loginUnit.loginDescription,
          loginUnit.url,
        ]),
      )('%s url is correct', async (loginUnitName, loginUnitUrl) => {
        const windowOpenSpy = vi.spyOn(window, 'open');

        const user = userEvent.setup();

        const RoutesStub = createRoutesStub([
          {
            path: '/',
            Component: Login,
            loader() {
              return { loginUnits };
            },
          },
        ]);

        render(<RoutesStub />);

        const loginButton = await waitFor(() =>
          screen.getByRole('button', {
            name: 'divaClient_LoginText',
          }),
        );
        await user.click(loginButton);

        const link = screen.getByRole('menuitem', { name: loginUnitName });
        await userEvent.click(link);
        expect(windowOpenSpy).toHaveBeenCalledWith(loginUnitUrl);
      });
    });

    // it('axios gets called on click', async () => {
    //   const redirectUrl = loginUnits[0].url;
    //   mockAxios.onGet(redirectUrl).reply(200, {
    //     userId: 'johdo290@user.uu.se',
    //     token: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    //     idFromLogin: 'johdo290@user.uu.se',
    //     validForNoSeconds: '600',
    //     actionLinks: {
    //       delete: {
    //         requestMethod: 'DELETE',
    //         rel: 'delete',
    //         url: 'https://pre.diva-portal.org/login/rest/authToken/user:11111111111111111',
    //       },
    //     },
    //   });
    //
    //   const user = userEvent.setup();
    //   render(
    //     <MemoryRouter initialEntries={['/']}>
    //       <Login />
    //     </MemoryRouter>,
    //   );
    //
    //   const loginButton = screen.getByRole('button', {
    //     name: 'divaClient_LoginText',
    //   });
    //   await user.click(loginButton);
    //
    //   await waitFor(async () => {
    //     const shibbolethUrl = screen.queryByText(
    //       'rkhTestDiVALoginUnitText',
    //     ) as HTMLElement;
    //
    //     user.click(shibbolethUrl);
    //     expect(mockAxios.history.get.length).toBe(1);
    //   });
    // });
    //
    // it('should should show name of chosen devUser', async () => {
    //   const unitUrl: string = `/auth/loginUnits`;
    //   mockAxios.onGet(unitUrl).reply(200, loginUnits);
    //
    //   const loginUrl = '/auth/appToken';
    //   mockAxios.onPost(loginUrl).reply(201, {
    //     auth: {
    //       data: {
    //         token: '2fcaa0a5-a45a-49d7-ab80-b274bb3430d2',
    //         validForNoSeconds: '600',
    //         userId: '161616',
    //         loginId: 'divaAdmin@cora.epc.ub.uu.se',
    //         firstName: 'DiVA',
    //         lastName: 'Admin',
    //       },
    //       actionLinks: {
    //         delete: {
    //           requestMethod: 'DELETE',
    //           rel: 'delete',
    //           url: 'https://cora.epc.ub.uu.se/diva/login/rest/authToken/48b1b315-05c1-449c-ba82-97a741e03662',
    //         },
    //       },
    //     },
    //   });
    //
    //   const user = userEvent.setup();
    //   render(
    //     <MemoryRouter initialEntries={['/']}>
    //       <Login />
    //     </MemoryRouter>,
    //   );
    //
    //   const loginButton = screen.getByRole('button', {
    //     name: 'divaClient_LoginText',
    //   });
    //   await user.click(loginButton);
    //   const divaAdmin = screen.getByText('AppToken for DiVAAdmin');
    //   await user.click(divaAdmin);
    //
    //   await waitFor(async () => {
    //     const loggedInUser = await screen.findByText('DiVA Admin');
    //     expect(loggedInUser).toBeInTheDocument();
    //   });
    // });
    //
    // it('should should show name of chosen webRedirectUser', async () => {
    //   const unitUrl: string = `/auth/loginUnits`;
    //   mockAxios.onGet(unitUrl).reply(200, loginUnits);
    //   const user = userEvent.setup();
    //   window.open = vi.fn();
    //
    //   render(
    //     <MemoryRouter initialEntries={['/']}>
    //       <Login />
    //     </MemoryRouter>,
    //   );
    //
    //   const loginButton = screen.getByRole('button', {
    //     name: 'divaClient_LoginText',
    //   });
    //   await user.click(loginButton);
    //
    //   const shibbolethUrl = screen.queryByText(
    //     'rkhTestDiVALoginUnitText',
    //   ) as HTMLElement;
    //
    //   await user.click(shibbolethUrl);
    //
    //   waitFor(async () => {
    //     const logedInUser = await screen.findByText('johdo290');
    //     expect(logedInUser).toBeInTheDocument();
    //   });
    // });
    //
    // it('should should show name of chosen password user', async () => {
    //   const unitUrl: string = `/auth/loginUnits`;
    //   mockAxios.onGet(unitUrl).reply(200, loginUnits);
    //   const user = userEvent.setup();
    //   window.open = vi.fn();
    //
    //   reduxRender(
    //     <MemoryRouter initialEntries={['/']}>
    //       <Login />
    //     </MemoryRouter>,
    //     {
    //       preloadedState: {
    //         loginUnits: {
    //           loginUnits,
    //           isLoading: false,
    //           isError: false,
    //           message: '',
    //         },
    //       },
    //     },
    //   );
    //
    //   const loginButton = screen.getByRole('button', {
    //     name: 'divaClient_LoginText',
    //   });
    //   await user.click(loginButton);
    //
    //   const loginUrl = screen.queryByText(
    //     'uuSystemOnePasswordLoginUnitText',
    //   ) as HTMLElement;
    //
    //   await user.click(loginUrl);
    //
    //   waitFor(async () => {
    //     const loginInput =
    //       await screen.findByPlaceholderText('loginIdTextVarText');
    //     expect(loginInput).toBeInTheDocument();
    //   });
    // });
  });
});
