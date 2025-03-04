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
  });
});
