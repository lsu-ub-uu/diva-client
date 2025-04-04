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
  SentimentCalmIcon,
} from '@/icons';
import type { ReactNode } from 'react';

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
  '/diva-course': <SentimentCalmIcon />,
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
            <NavLink to={link.to}>
              {icons[link.to]}
              <span className={styles['label']}> {link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
