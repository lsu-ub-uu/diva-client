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

import LoginMenu from '@/components/Layout/Header/Login/LoginMenu';
import type { ExampleUser } from '@/cora/getDeploymentInfo.server';
import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';
import { render } from 'vitest-browser-react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

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
] as LoginDefinition[];

const exampleUsers = [
  {
    name: 'DiVA Admin',
    loginId: 'diva-admin',
    appToken: 'diva-admin-token',
  },
  {
    name: 'DiVA Everything',
    loginId: 'diva-everything',
    appToken: 'diva-everything-token',
  },
] as ExampleUser[];

describe('<Login/>', () => {
  it('shows the accounts in a list', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <LoginMenu loginUnits={loginUnits} exampleUsers={exampleUsers} />
        ),
      },
    ]);

    const screen = await render(<RoutesStub />);

    await screen
      .getByRole('button', {
        name: 'divaClient_LoginText',
      })
      .click();

    const userNameList = screen.getByRole('menuitem');
    await expect.element(userNameList.first()).toBeVisible();

    await expect
      .element(screen.getByRole('menuitem', { name: 'DiVA Admin' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('menuitem', { name: 'DiVA Everything' }))
      .toBeVisible();
    await expect
      .element(
        screen.getByRole('menuitem', { name: 'rkhTestDiVALoginUnitText' }),
      )
      .toBeVisible();
    await expect
      .element(
        screen.getByRole('menuitem', { name: 'skhTestDiVALoginUnitText' }),
      )
      .toBeVisible();
    await expect
      .element(screen.getByRole('menuitem', { name: 'ltuDiVALoginUnitText' }))
      .toBeVisible();
  });

  describe('webRedirect accounts opens a link to Shibboleth', () => {
    it.each(
      loginUnits.map((loginUnit) => [
        loginUnit.loginDescription,
        loginUnit.url,
      ]),
    )('%s url is correct', async (loginUnitName, loginUnitUrl) => {
      const windowOpenSpy = vi.spyOn(window, 'open');

      const RoutesStub = createRoutesStub([
        {
          path: '/',
          Component: () => (
            <LoginMenu loginUnits={loginUnits} exampleUsers={[]} />
          ),
        },
      ]);

      const screen = await render(<RoutesStub />);

      await screen
        .getByRole('button', {
          name: 'divaClient_LoginText',
        })
        .click();

      const link = screen.getByRole('menuitem', { name: loginUnitName });
      await link.click();
      expect(windowOpenSpy).toHaveBeenCalledWith(loginUnitUrl);
    });
  });

  it('shows menu when one login unit and one app token login', async () => {
    const singleLoginUnits = [
      {
        loginDescription: 'passwordLogin',
        presentation: { foo: 'bar' },
        type: 'password',
      } as LoginDefinition,
    ];
    const singleExampleUsers = [
      {
        name: 'DiVA Admin',
        loginId: 'diva-admin',
        appToken: 'aaaaa',
      },
    ] as ExampleUser[];

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <LoginMenu
            loginUnits={singleLoginUnits}
            exampleUsers={singleExampleUsers}
          />
        ),
      },
    ]);

    const screen = await render(<RoutesStub />);

    await screen
      .getByRole('button', {
        name: 'divaClient_LoginText',
      })
      .click();

    await expect
      .element(screen.getByRole('menuitem', { name: 'DiVA Admin' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('menuitem', { name: 'passwordLogin' }))
      .toBeVisible();
  });
});
