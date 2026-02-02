import { NavLink } from 'react-router';
import type { ReactNode } from 'react';
import styles from './TopNavigation.module.css';

interface NavigationLinkProps {
  icon: ReactNode;
  to: string;
  label: string;
  onClick?: () => void;
}

export const NavigationLink = ({
  icon,
  to,
  label,
  onClick,
}: NavigationLinkProps) => {
  return (
    <NavLink className={styles['navigation-link']} to={to} onClick={onClick}>
      {icon}
      {label}
    </NavLink>
  );
};
