import { use, useId } from 'react';
import { MenuContext } from './Menu';
import styles from './Menu.module.css';

interface MenuItemProps {
  children: React.ReactNode;
  as?: React.ElementType;
  text?: string;
}

export const MenuItem = ({ children, as = 'div', text }: MenuItemProps) => {
  const menuContext = use(MenuContext);
  const id = useId();
  const Root = as;
  const filter = menuContext?.filter.toLowerCase() || '';
  if (text && !text.toLowerCase().includes(filter)) {
    return null;
  }

  return (
    <Root
      id={id}
      className={styles['menu-item']}
      data-active={menuContext?.activeItemId === id}
      ref={(node: HTMLElement) => {
        if (node) {
          menuContext?.registerItem(node);
        } else {
          menuContext?.unRegisterItem(id);
        }
      }}
    >
      {children}
    </Root>
  );
};
