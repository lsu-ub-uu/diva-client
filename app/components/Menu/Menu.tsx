import { FilterIcon } from 'lucide-react';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Fieldset } from '../Input/Fieldset';
import { Input, type InputProps } from '../Input/Input';
import styles from './Menu.module.css';
import { MenuContext } from './MenuContext';
import type { ButtonProps } from '../Button/Button';

export interface MenuProps {
  title?: string;
  id: string;
  useFilter?: boolean;
  alignment?: 'start' | 'end' | 'center';
  onToggle: (open: boolean) => void;
  registerItem: (ref: HTMLLIElement) => void;
  unRegisterItem: (id: string) => void;
  activeItemId: string | undefined;
  filterInputProps: InputProps;
  children?: ReactNode;
  menuRef: React.RefObject<HTMLDivElement | null>;
  triggerId?: string;
}

export const Menu = ({
  title,
  id,
  useFilter = false,
  onToggle,
  registerItem,
  unRegisterItem,
  activeItemId,
  filterInputProps,
  children,
  alignment = 'end',
  menuRef,
  triggerId,
}: MenuProps) => {
  return (
    <div
      id={id}
      role='menu'
      onToggle={(e) => onToggle?.(e.newState === 'open')}
      popover='auto'
      className={styles['menu']}
      tabIndex={-1}
      aria-activedescendant={activeItemId}
      aria-labelledby={triggerId}
      data-alignment={alignment}
      ref={menuRef}
    >
      <div className={styles['menu-content']}>
        {title && <h2 className={styles['menu-title']}>{title}</h2>}
        {useFilter && (
          <Fieldset size='small' className={styles['menu-filter']}>
            <Input placeholder='Filtrera...' {...filterInputProps} />
            <FilterIcon className={styles['menu-filter-icon']} />
          </Fieldset>
        )}
        <MenuContext
          value={{
            registerItem,
            unRegisterItem,
            activeItemId,
            filter: filterInputProps.value as string,
            closeMenu: () => menuRef.current?.hidePopover(),
          }}
        >
          <ul className={styles['menu-items']} tabIndex={-1}>
            {children}
          </ul>
        </MenuContext>
      </div>
    </div>
  );
};

export const useMenu = () => {
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const itemRefs = useRef<HTMLLIElement[]>([]);
  const filterInputRef = useRef<HTMLInputElement>(null);
  const [activeItemId, setActiveItemId] = useState<string | undefined>(
    undefined,
  );
  const [filter, setFilter] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set the first item as active when filter changes and menu is open
    if (filter) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveItemId(itemRefs.current[0]?.id);
    }
  }, [filter]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      // Set the next item as active and scroll it into view
      e.preventDefault();
      const activeIndex = itemRefs.current.findIndex(
        (ref) => ref.id === activeItemId,
      );
      const nextIndex = (activeIndex + 1) % itemRefs.current.length;
      const nextItem = itemRefs.current[nextIndex];
      nextItem.scrollIntoView({ block: 'nearest' });
      setActiveItemId(nextItem.id);
    }
    if (e.key === 'ArrowUp') {
      // Set the previous item as active and scroll it into view
      e.preventDefault();
      const activeIndex = itemRefs.current.findIndex(
        (ref) => ref.id === activeItemId,
      );
      const prevIndex =
        (activeIndex - 1 + itemRefs.current.length) % itemRefs.current.length;
      const prevItem = itemRefs.current[prevIndex];
      prevItem.scrollIntoView({ block: 'nearest' });
      setActiveItemId(prevItem.id);
    }
    if (e.key === 'Enter') {
      if (!open) {
        return;
      }

      // Trigger click on the active item
      e.preventDefault();
      const activeItem = itemRefs.current.find(
        (ref) => ref.id === activeItemId,
      );
      const link = activeItem?.querySelector('a');
      const button = activeItem?.querySelector('button');
      if (link) {
        link.click();
      } else if (button) {
        button.click();
      }
      menuRef.current?.hidePopover();
    }
  };

  const filterInputProps: InputProps = {
    ref: filterInputRef,
    onKeyDown: handleKeyDown,
    'aria-controls': menuId,
    'aria-activedescendant': open ? activeItemId : undefined,
    value: filter,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(e.target.value);
    },
  };

  const menuProps: MenuProps = {
    id: menuId,
    onToggle: (open: boolean) => {
      if (!open) {
        // Reset active item and filter when menu closes
        setActiveItemId(undefined);
        setFilter('');
      } else {
        // Focus the filter input when menu opens
        filterInputRef.current?.focus();
      }
      setOpen(open);
    },
    activeItemId,
    registerItem: (ref: HTMLLIElement) => {
      itemRefs.current.push(ref);
    },
    unRegisterItem: (id: string) => {
      itemRefs.current = itemRefs.current.filter((r) => r.id !== id);
    },
    filterInputProps,
    menuRef,
    triggerId: `${menuId}-trigger`,
  };

  const triggerProps: ButtonProps = {
    id: `${menuId}-trigger`,
    'aria-haspopup': 'menu' as const,
    'aria-controls': menuId,
    'aria-expanded': open,
    popoverTarget: menuId,
    onKeyDown: handleKeyDown,
  };

  return { menuProps, triggerProps };
};
