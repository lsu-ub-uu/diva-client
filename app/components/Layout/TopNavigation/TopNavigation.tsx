import { NavLink } from 'react-router';

import styles from './TopNavigation.module.css';
import { ContractIcon, PersonsIcon, SchemaIcon } from '@/icons';
import type { ReactNode } from 'react';

export interface TopNavigationLink {
  label: string;
  to: string;
}

interface TopNavigationProps {
  links: TopNavigationLink[];
}

const icons: Record<string, ReactNode> = {
  '/diva-output': <ContractIcon />,
  '/diva-person': <PersonsIcon />,
  '/diva-project': <SchemaIcon />,
};

export const TopNavigation = ({ links }: TopNavigationProps) => {
  if (links.length < 2) {
    return null;
  }

  return (
    <nav className={styles['top-navigation']}>
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to}>
              {icons[link.to]} {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
