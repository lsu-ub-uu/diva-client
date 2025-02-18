import styles from './DropdownMenu.module.css';
import { MenuItems, type MenuItemsProps } from '@headlessui/react';

export const DropdownMenu = (props: MenuItemsProps) => {
  return <MenuItems className={styles['menu']} {...props} />;
};
