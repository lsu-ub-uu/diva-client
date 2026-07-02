import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DevAccountLoginOptions } from '../DevAccountLoginOptions';
import type { ExampleUser } from '@/cora/getDeploymentInfo.server';
import { Menu } from '@/components/Menu/Menu';

const menuProps = {
  id: 'test-menu',
  onToggle: vi.fn(),
  registerItem: vi.fn(),
  unRegisterItem: vi.fn(),
  activeItemId: undefined,
  filterInputProps: { value: '' },
  menuRef: { current: null } as React.RefObject<HTMLDivElement | null>,
};

describe('DevAccountLoginOptions', () => {
  it('should render correctly when there are dev accounts', async () => {
    render(
      <Menu {...menuProps}>
        <DevAccountLoginOptions
          exampleUsers={
            [
              {
                loginId: 'user1',
                appToken: 'token1',
                name: 'User Test',
              },
              {
                loginId: 'user2',
                appToken: 'token2',
                name: 'User Test2',
              },
            ] as ExampleUser[]
          }
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
      <Menu {...menuProps}>
        <DevAccountLoginOptions onSelect={vi.fn()} exampleUsers={[]} />
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
