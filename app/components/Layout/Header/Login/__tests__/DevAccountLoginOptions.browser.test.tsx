import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
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
    const screen = await render(
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
    await expect
      .element(screen.getByText('divaClient_LoginDevAccountText'))
      .toBeInTheDocument();
    await expect
      .element(screen.getByText('User Test', { exact: true }))
      .toBeInTheDocument();
    await expect.element(screen.getByText('User Test2')).toBeInTheDocument();
  });

  it('should not render when there are no dev accounts', async () => {
    const screen = await render(
      <Menu {...menuProps}>
        <DevAccountLoginOptions onSelect={vi.fn()} exampleUsers={[]} />
      </Menu>,
    );

    await expect
      .element(screen.getByText('divaClient_LoginDevAccountText'))
      .not.toBeInTheDocument();
    await expect.element(screen.getByText('User Test')).not.toBeInTheDocument();
    await expect
      .element(screen.getByText('Account Another'))
      .not.toBeInTheDocument();
  });
});
