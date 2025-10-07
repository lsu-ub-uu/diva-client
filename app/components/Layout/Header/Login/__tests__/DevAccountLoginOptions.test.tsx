import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DevAccountLoginOptions } from '../DevAccountLoginOptions';
import { Menu } from '@headlessui/react';

describe('DevAccountLoginOptions', () => {
  beforeEach(() => {
    vi.resetModules();
  });
  it('should render correctly when there are dev accounts', () => {
    // Mock devAccounts import
    vi.mock('../devAccounts', () => ({
      devAccounts: [
        {
          id: '1',
          userId: 'user1',
          firstName: 'Test',
          lastName: 'User',
        },
        {
          id: '2',
          userId: 'user2',
          firstName: 'Another',
          lastName: 'Account',
        },
      ],
    }));
    render(
      <Menu>
        <DevAccountLoginOptions onSelect={() => {}} />
      </Menu>,
    );
    expect(
      screen.getByRole('heading', { name: 'divaClient_LoginDevAccountText' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: 'User Test' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: 'Account Another' }),
    ).toBeInTheDocument();
  });

  it('should not render when there are no dev accounts', () => {
    vi.mock('../devAccounts', () => ({
      devAccounts: [],
    }));
    render(
      <Menu>
        <DevAccountLoginOptions onSelect={vi.fn()} />
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
