import { NavLink } from 'react-router';

import styles from './TopNavigation.module.css';
import {
  AttachMoneyIcon,
  ContractIcon,
  CorporateFareIcon,
  EditNoteIcon,
  FullCoverageIcon,
  HistoryEduIcon,
  NewspaperIcon,
  NewsstandIcon,
  PaletteIcon,
  PersonsIcon,
  SchemaIcon,
  SchoolIcon,
  ScienceIcon,
} from '@/icons';
import type { ReactNode } from 'react';
import { NavigationLink } from '@/components/Layout/NavigationLink/NavigationLink';

export interface TopNavigationLink {
  label: string;
  to: string;
}

export interface TopNavigationProps {
  links: TopNavigationLink[];
}

const icons: Record<string, ReactNode> = {
  '/diva-output': <ContractIcon />,
  '/diva-person': <PersonsIcon />,
  '/diva-project': <SchemaIcon />,
  '/diva-course': <ScienceIcon />,
  '/diva-organisation': <CorporateFareIcon />,
  '/diva-journal': <NewspaperIcon />,
  '/diva-subject': <HistoryEduIcon />,
  '/diva-programme': <SchoolIcon />,
  '/diva-series': <NewsstandIcon />,
  '/diva-localGenericMarkup': <EditNoteIcon />,
  '/diva-publisher': <FullCoverageIcon />,
  '/diva-theme': <PaletteIcon />,
  '/diva-funder': <AttachMoneyIcon />,
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
            <NavigationLink
              to={link.to}
              label={link.label}
              icon={icons[link.to]}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
