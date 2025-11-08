import { NavLink } from 'react-router';
import type { ReactNode } from 'react';
import styles from './NavigationLink.module.css';

interface NavigationLinkProps {
  icon: ReactNode;
  to: string;
  label: string;
}

export const NavigationLink = ({ icon, to, label }: NavigationLinkProps) => {
  return (
    <NavLink className={styles['navigation-link']} to={to}>
      <span className={styles['icon-wrapper']}>{icon}</span>
      <span className={styles['label']}> {label}</span>
    </NavLink>
  );
};
