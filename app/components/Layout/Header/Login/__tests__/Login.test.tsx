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
import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

describe('<Login/>', () => {
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
