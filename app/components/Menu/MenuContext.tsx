import { createContext } from 'react';

interface MenuContextValue {
  registerItem: (ref: HTMLLIElement) => void;
  unRegisterItem: (id: string) => void;
  activeItemId: string | undefined;
  filter: string;
  closeMenu: () => void;
}

export const MenuContext = createContext<MenuContextValue | null>(null);
