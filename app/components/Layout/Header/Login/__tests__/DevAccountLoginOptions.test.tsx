import { Menu } from '@headlessui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DevAccountLoginOptions } from '../DevAccountLoginOptions';

describe('DevAccountLoginOptions', () => {
  it('should render correctly when there are dev accounts', async () => {
    render(
      <Menu>
        <DevAccountLoginOptions
          appTokenLogins={[
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
          ]}
          onSelect={vi.fn()}
        />
      </Menu>,
    );
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
    render(
      <Menu>
        <DevAccountLoginOptions onSelect={vi.fn()} appTokenLogins={[]} />
      </Menu>,
    );

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
