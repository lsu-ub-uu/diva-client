import { use, useId } from 'react';
import styles from './Menu.module.css';
import { MenuContext } from './MenuContext';

interface MenuItemProps {
  children: React.ReactNode;
  text?: string;
}

export const MenuItem = ({ children, text }: MenuItemProps) => {
  const menuContext = use(MenuContext);
  const id = useId();
  const filter = menuContext?.filter.toLowerCase() || '';
  if (text && !text.toLowerCase().includes(filter)) {
    return null;
  }

  return (
    <li
      id={id}
      role='menuitem'
      className={styles['menu-item']}
      data-active={menuContext?.activeItemId === id}
      ref={(node: HTMLLIElement) => {
        if (node) {
          menuContext?.registerItem(node);
        } else {
          menuContext?.unRegisterItem(id);
        }
      }}
      onMouseUp={() => menuContext?.closeMenu()}
    >
      {children}
    </li>
  );
};
