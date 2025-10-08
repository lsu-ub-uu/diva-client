import type { AppTokenLogin } from '@/auth/getAppTokenLogins.server';
import { Menu } from '@headlessui/react';
import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { DevAccountLoginOptions } from '../DevAccountLoginOptions';
import { act } from 'react';

describe('DevAccountLoginOptions', () => {
  it('should render correctly when there are dev accounts', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        loader: () => ({
          appTokenLogins: [
            {
              loginId: 'user1',
              appToken: 'token1',
              displayName: 'User Test',
            },
            {
              loginId: 'user2',
              appToken: 'token2',
              displayName: 'User Test2',
            },
          ] as AppTokenLogin[],
        }),
        Component: () => (
          <Menu>
            <DevAccountLoginOptions onSelect={vi.fn()} />
          </Menu>
        ),
      },
    ]);

    await act(() => render(<RoutesStub />));
    expect(
      screen.getByRole('heading', { name: 'divaClient_LoginDevAccountText' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: 'User Test' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: 'User Test2' }),
    ).toBeInTheDocument();
  });

  it('should not render when there are no dev accounts', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        loader: () => ({
          appTokenLogins: [] as AppTokenLogin[],
        }),
        Component: () => (
          <Menu>
            <DevAccountLoginOptions onSelect={vi.fn()} />
          </Menu>
        ),
      },
    ]);

    await act(() => render(<RoutesStub />));

    expect(
      screen.queryByRole('heading', { name: 'divaClient_LoginDevAccountText' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('menuitem', { name: 'User Test' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('menuitem', { name: 'Account Another' }),
    ).not.toBeInTheDocument();
  });
});
