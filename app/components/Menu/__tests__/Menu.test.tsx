import { Button } from '@/components/Button/Button';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Menu, useMenu, type MenuProps } from '../Menu';
import { MenuItem } from '../MenuItem';

const MenuTest = ({ title, useFilter, children }: Partial<MenuProps>) => {
  const { menuProps, triggerProps } = useMenu();

  return (
    <>
      <Button {...triggerProps}>Open Menu</Button>
      <Menu {...menuProps} title={title} useFilter={useFilter}>
        {children}
      </Menu>
    </>
  );
};

describe('Menu', () => {
  it('should render menu with correct accessibility attributes', () => {
    render(
      <MenuTest>
        <MenuItem>
          <Button>Item 1</Button>
        </MenuItem>
        <MenuItem>
          <Button>Item 2</Button>
        </MenuItem>
        <MenuItem>
          <Button>Item 3</Button>
        </MenuItem>
      </MenuTest>,
    );
    const menuButton = screen.getByRole('button', { name: 'Open Menu' });
    const menu = screen.getByRole('menu');

    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-haspopup', 'menu');
    expect(menuButton).toHaveAttribute('aria-controls', menu.id);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    expect(menu).toBeInTheDocument();
    expect(menu).toHaveAttribute('aria-labelledby', menuButton.id);
  });
});
