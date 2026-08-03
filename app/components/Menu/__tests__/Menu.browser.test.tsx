import { Button } from '@/components/Button/Button';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
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
  it('should render menu with correct accessibility attributes', async () => {
    const screen = await render(
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

    await expect.element(menuButton).toHaveAttribute('aria-haspopup', 'menu');
    await userEvent.click(menuButton);

    await expect
      .element(menuButton)
      .toHaveAttribute('aria-controls', menu.element().id);

    await expect.element(menuButton).toHaveAttribute('aria-expanded', 'true');
    await expect.element(menu).toBeVisible();
    await expect
      .element(menu)
      .toHaveAttribute('aria-labelledby', menuButton.element().id);
  });

  it('should render title and filter input when filter is enabled', async () => {
    const screen = await render(
      <MenuTest title='Menu Title' useFilter>
        <MenuItem text='Item 1'>
          <Button>Item 1</Button>
        </MenuItem>
      </MenuTest>,
    );

    const menuButton = screen.getByRole('button', { name: 'Open Menu' });
    await userEvent.click(menuButton);

    await expect
      .element(screen.getByRole('heading', { name: 'Menu Title' }))
      .toBeVisible();
    await expect
      .element(screen.getByPlaceholder('divaClient_filteringText'))
      .toBeVisible();
  });

  it('should filter menu items by filter input value', async () => {
    const screen = await render(
      <MenuTest useFilter>
        <MenuItem text='Alpha'>
          <Button>Alpha</Button>
        </MenuItem>
        <MenuItem text='Beta'>
          <Button>Beta</Button>
        </MenuItem>
      </MenuTest>,
    );

    const menuButton = screen.getByRole('button', { name: 'Open Menu' });
    await userEvent.click(menuButton);

    const filterInput = screen.getByPlaceholder('divaClient_filteringText');
    await filterInput.fill('alpha');

    await expect
      .element(screen.getByRole('button', { name: 'Alpha' }))
      .toBeInTheDocument();
    await expect
      .element(screen.getByRole('button', { name: 'Beta' }))
      .not.toBeInTheDocument();
  });

  it('should click active menu item on Enter and close menu', async () => {
    const onAlphaClick = vi.fn();
    const onBetaClick = vi.fn();

    const screen = await render(
      <MenuTest useFilter>
        <MenuItem text='Alpha'>
          <Button onClick={onAlphaClick}>Alpha</Button>
        </MenuItem>
        <MenuItem text='Beta'>
          <Button onClick={onBetaClick}>Beta</Button>
        </MenuItem>
      </MenuTest>,
    );

    const menuButton = screen.getByRole('button', { name: 'Open Menu' });
    await userEvent.click(menuButton);

    const filterInput = screen.getByPlaceholder('divaClient_filteringText');
    await filterInput.fill('alpha');

    const alphaItem = screen.getByRole('menuitem').element();
    await expect
      .element(filterInput)
      .toHaveAttribute('aria-activedescendant', alphaItem.id);
    await userEvent.keyboard('{Enter}');

    expect(onAlphaClick).toHaveBeenCalledTimes(1);
    expect(onBetaClick).not.toHaveBeenCalled();
    await expect.element(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('should navigate menu items with arrow keys and select with Enter', async () => {
    const onAlphaClick = vi.fn();
    const onBetaClick = vi.fn();

    const screen = await render(
      <MenuTest useFilter>
        <MenuItem text='Alpha'>
          <Button onClick={onAlphaClick}>Alpha</Button>
        </MenuItem>
        <MenuItem text='Beta'>
          <Button onClick={onBetaClick}>Beta</Button>
        </MenuItem>
      </MenuTest>,
    );

    const menuButton = screen.getByRole('button', { name: 'Open Menu' });
    const filterInput = screen.getByPlaceholder('divaClient_filteringText');

    await userEvent.click(menuButton);

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');

    const betaItem = screen.getByRole('menuitem', { name: 'Beta' }).element();
    await expect
      .element(filterInput)
      .toHaveAttribute('aria-activedescendant', betaItem.id);

    await userEvent.keyboard('{Enter}');

    expect(onBetaClick).toHaveBeenCalledTimes(1);
    expect(onAlphaClick).not.toHaveBeenCalled();
  });

  it('should loop to last menu item when pressing ArrowUp on first item', async () => {
    const onAlphaClick = vi.fn();
    const onBetaClick = vi.fn();

    const screen = await render(
      <MenuTest useFilter>
        <MenuItem text='Alpha'>
          <Button onClick={onAlphaClick}>Alpha</Button>
        </MenuItem>
        <MenuItem text='Beta'>
          <Button onClick={onBetaClick}>Beta</Button>
        </MenuItem>
      </MenuTest>,
    );

    const menuButton = screen.getByRole('button', { name: 'Open Menu' });
    await userEvent.click(menuButton);

    await userEvent.keyboard('{ArrowUp}');

    const alphaItem = screen.getByRole('menuitem', { name: 'Alpha' });
    await expect.element(alphaItem).toHaveAttribute('data-active', 'true');
    await userEvent.keyboard('{Enter}');

    expect(onAlphaClick).toHaveBeenCalledTimes(1);
    expect(onBetaClick).not.toHaveBeenCalled();
  });

  it('should click active link item on Enter when menu is open', async () => {
    const onLinkClick = vi.fn((e: React.MouseEvent<HTMLAnchorElement>) =>
      e.preventDefault(),
    );

    const screen = await render(
      <MenuTest useFilter>
        <MenuItem text='Alpha'>
          <a href='/alpha' onClick={onLinkClick}>
            Alpha
          </a>
        </MenuItem>
      </MenuTest>,
    );

    const menuButton = screen.getByRole('button', { name: 'Open Menu' });
    await userEvent.click(menuButton);

    const filterInput = screen.getByPlaceholder('divaClient_filteringText');
    await filterInput.fill('alpha');

    await userEvent.keyboard('{Enter}');

    expect(onLinkClick).toHaveBeenCalledTimes(1);
  });

  it('should click active button item on Enter when menu is open', async () => {
    const onButtonClick = vi.fn();

    const screen = await render(
      <MenuTest useFilter>
        <MenuItem text='Alpha'>
          <button type='button' onClick={onButtonClick}>
            Alpha
          </button>
        </MenuItem>
      </MenuTest>,
    );

    const menuButton = screen.getByRole('button', { name: 'Open Menu' });
    await userEvent.click(menuButton);

    const filterInput = screen.getByPlaceholder('divaClient_filteringText');
    await filterInput.fill('alpha');

    await userEvent.keyboard('{Enter}');

    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });

  it('should not trigger click on Enter when active item has no link or button', async () => {
    const screen = await render(
      <MenuTest useFilter>
        <MenuItem text='Alpha'>
          <span>Alpha</span>
        </MenuItem>
      </MenuTest>,
    );

    const menuButton = screen.getByRole('button', { name: 'Open Menu' });
    await userEvent.click(menuButton);

    const filterInput = screen.getByPlaceholder('divaClient_filteringText');
    await filterInput.fill('alpha');

    // Should not throw even with no link or button
    await userEvent.keyboard('{Enter}');

    await expect.element(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('should not trigger click on Enter when menu is closed', async () => {
    const onAlphaClick = vi.fn();

    const screen = await render(
      <MenuTest useFilter>
        <MenuItem text='Alpha'>
          <Button onClick={onAlphaClick}>Alpha</Button>
        </MenuItem>
      </MenuTest>,
    );

    const menuButton = screen.getByRole('button', { name: 'Open Menu' });
    await expect.element(menuButton).toHaveAttribute('aria-expanded', 'false');

    await menuButton.element().focus();
    await userEvent.keyboard('{Enter}');

    expect(onAlphaClick).not.toHaveBeenCalled();
  });

  it('should loop to first menu item when pressing ArrowDown on last item', async () => {
    const onAlphaClick = vi.fn();
    const onBetaClick = vi.fn();

    const screen = await render(
      <MenuTest useFilter>
        <MenuItem text='Alpha'>
          <Button onClick={onAlphaClick}>Alpha</Button>
        </MenuItem>
        <MenuItem text='Beta'>
          <Button onClick={onBetaClick}>Beta</Button>
        </MenuItem>
      </MenuTest>,
    );

    const menuButton = screen.getByRole('button', { name: 'Open Menu' });
    const filterInput = screen.getByPlaceholder('divaClient_filteringText');
    await userEvent.click(menuButton);

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');

    const alphaItem = screen.getByRole('menuitem', { name: 'Alpha' }).element();
    await expect
      .element(filterInput)
      .toHaveAttribute('aria-activedescendant', alphaItem.id);
    await userEvent.keyboard('{Enter}');

    expect(onAlphaClick).toHaveBeenCalledTimes(1);
    expect(onBetaClick).not.toHaveBeenCalled();
  });

  it('should close menu when clicking a menu item', async () => {
    const screen = await render(
      <MenuTest>
        <MenuItem>
          <Button>Alpha</Button>
        </MenuItem>
      </MenuTest>,
    );

    const menuButton = screen.getByRole('button', { name: 'Open Menu' });
    await userEvent.click(menuButton);
    await expect.element(menuButton).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(screen.getByRole('button', { name: 'Alpha' }));

    await expect.element(menuButton).toHaveAttribute('aria-expanded', 'false');
  });
});
