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
import type { ExampleUser } from '@/data/formDefinition/formDefinitionsDep.server';
import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/utils/useHydrated', () => {
  return {
    useHydrated: vi.fn(() => true),
  };
});

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
    const user = userEvent.setup();

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <LoginMenu loginUnits={loginUnits} exampleUsers={exampleUsers} />
        ),
      },
    ]);

    render(<RoutesStub />);

    await user.click(
      screen.getByRole('button', {
        name: 'divaClient_LoginText',
      }),
    );

    const userNameList = screen.queryAllByRole('menuitem');
    const listItems = userNameList.map((item) => item.textContent);
    expect(listItems).toEqual([
      'DiVA Admin',
      'DiVA Everything',
      'rkhTestDiVALoginUnitText',
      'skhTestDiVALoginUnitText',
      'ltuDiVALoginUnitText',
    ]);
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
          Component: () => (
            <LoginMenu loginUnits={loginUnits} exampleUsers={[]} />
          ),
        },
      ]);

      render(<RoutesStub />);

      await user.click(
        screen.getByRole('button', {
          name: 'divaClient_LoginText',
        }),
      );

      const link = screen.getByRole('menuitem', { name: loginUnitName });
      await userEvent.click(link);
      expect(windowOpenSpy).toHaveBeenCalledWith(loginUnitUrl);
    });
  });

  it('logs in with web redirect upon login button click when only one login unit', async () => {
    const user = userEvent.setup();
    const windowOpenSpy = vi.spyOn(window, 'open');
    const singleLoginUnits = [
      {
        loginDescription: 'rkhTestDiVALoginUnitText',
        url: 'https://www.diva-portal.org/Shibboleth.sso/Login/rkh?target=https://www.diva-portal.org/diva-test/idplogin/login',
        type: 'webRedirect',
      } as LoginDefinition,
    ];
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <LoginMenu loginUnits={singleLoginUnits} exampleUsers={[]} />
        ),
      },
    ]);

    render(<RoutesStub />);

    await user.click(
      screen.getByRole('button', {
        name: 'divaClient_LoginText',
      }),
    );
    expect(windowOpenSpy).toHaveBeenCalledWith(singleLoginUnits[0].url);
  });

  it('links to password login when only one login unit', async () => {
    const singleLoginUnits = [
      {
        loginDescription: 'passwordLogin',
        presentation: { foo: 'bar' },
        type: 'password',
        id: 'passwordLoginUnit',
      } as LoginDefinition,
    ];
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <LoginMenu loginUnits={singleLoginUnits} exampleUsers={[]} />
        ),
      },
    ]);

    render(<RoutesStub />);

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/login?loginUnit=passwordLoginUnit&returnTo=%2F',
    );
  });

  it('shows menu when one login unit and one app token login', async () => {
    const user = userEvent.setup();
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

    render(<RoutesStub />);

    await user.click(
      screen.getByRole('button', {
        name: 'divaClient_LoginText',
      }),
    );

    expect(
      screen.getByRole('menuitem', { name: 'DiVA Admin' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: 'passwordLogin' }),
    ).toBeInTheDocument();
  });

  it('handles returnTo with search params', async () => {
    const singleLoginUnits = [
      {
        loginDescription: 'passwordLogin',
        presentation: { foo: 'bar' },
        type: 'password',
        id: 'passwordLoginUnit',
      } as LoginDefinition,
    ];
    const RoutesStub = createRoutesStub([
      {
        path: '/somepath/som_e-subpath',
        Component: () => (
          <LoginMenu loginUnits={singleLoginUnits} exampleUsers={[]} />
        ),
      },
    ]);

    render(
      <RoutesStub
        initialEntries={['/somepath/som_e-subpath?someQueryParam=foo']}
      />,
    );

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/login?loginUnit=passwordLoginUnit&returnTo=%2Fsomepath%2Fsom_e-subpath%3FsomeQueryParam%3Dfoo',
    );
  });

  it('uses existing returnTo if present', async () => {
    const singleLoginUnits = [
      {
        loginDescription: 'passwordLogin',
        presentation: { foo: 'bar' },
        type: 'password',
        id: 'passwordLoginUnit',
      } as LoginDefinition,
    ];
    const RoutesStub = createRoutesStub([
      {
        path: '/login',
        Component: () => (
          <LoginMenu loginUnits={singleLoginUnits} exampleUsers={[]} />
        ),
      },
    ]);

    render(
      <RoutesStub
        initialEntries={[
          '/login?returnTo=%2Fsomepath%2Fsom_e-subpath%3FsomeQueryParam%3Dfoo',
        ]}
      />,
    );

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/login?loginUnit=passwordLoginUnit&returnTo=%2Fsomepath%2Fsom_e-subpath%3FsomeQueryParam%3Dfoo',
    );
  });
});
