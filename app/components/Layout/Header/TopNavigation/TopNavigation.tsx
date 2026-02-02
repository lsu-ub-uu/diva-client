import { Button } from '@/components/Button/Button';
import { NavigationLink } from '@/components/Layout/Header/TopNavigation/NavigationLink';
import type { Navigation } from '@/data/getNavigation';
import { useIsDevMode } from '@/utils/useIsDevMode';
import {
  BookCheckIcon,
  BookOpenIcon,
  BuildingIcon,
  ChartGanttIcon,
  ChevronDownIcon,
  FlaskRoundIcon,
  GraduationCapIcon,
  HandCoinsIcon,
  LibraryIcon,
  MenuIcon,
  MonitorCogIcon,
  NewspaperIcon,
  NotebookTabsIcon,
  PaletteIcon,
  TagIcon,
  UsersIcon,
} from 'lucide-react';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, href, useLocation } from 'react-router';
import styles from './TopNavigation.module.css';
import type { NavigationItem } from '@/data/getNavigation.server';
import { Menu, MenuButton, MenuItem } from '@headlessui/react';
import { DropdownMenu } from '@/components/DropdownMenu/DropdownMenu';
import { NavLink } from 'react-router';
import clsx from 'clsx';

export interface TopNavigationLink {
  label: string;
  to: string;
}

export interface TopNavigationProps {
  navigation: Navigation;
  onNavigationClick?: () => void;
}

export const icons: Record<string, ReactNode> = {
  'diva-output': <BookOpenIcon />,
  'diva-person': <UsersIcon />,
  'diva-project': <ChartGanttIcon />,
  'diva-course': <NotebookTabsIcon />,
  'diva-organisation': <BuildingIcon />,
  'diva-journal': <NewspaperIcon />,
  'diva-subject': <FlaskRoundIcon />,
  'diva-programme': <GraduationCapIcon />,
  'diva-series': <LibraryIcon />,
  'diva-localLabel': <TagIcon />,
  'diva-publisher': <BookCheckIcon />,
  'diva-funder': <HandCoinsIcon />,
  'diva-member': <MonitorCogIcon />,
};

export const TopNavigation = ({ navigation }: TopNavigationProps) => {
  const devMode = useIsDevMode();
  const location = useLocation();
  const { t } = useTranslation();

  const isOtherNavActive = navigation.otherNavigationItems.some(
    (navItem) => navItem.link === location.pathname,
  );

  return (
    <nav className={styles['top-navigation']}>
      <ul>
        {navigation.mainNavigationItems
          .sort(compareNavigationItems)
          .map((navItem) => (
            <li key={navItem.id}>
              <NavigationLink
                to={navItem.link}
                label={t(navItem.textId)}
                icon={icons[navItem.id]}
              />
            </li>
          ))}

        <li>
          <Menu>
            <MenuButton
              className={clsx(
                styles['navigation-link'],
                styles['menu-navigation-button'],
              )}
              data-active={isOtherNavActive}
            >
              <MenuIcon />
              <span className={styles['label']}>
                {t('divaClient_moreNavigationText')}
              </span>
              <ChevronDownIcon className={styles['menu-navigation-chevron']} />
            </MenuButton>
            <DropdownMenu anchor='bottom end'>
              {navigation.otherNavigationItems.map((navItem) => (
                <MenuItem key={navItem.id}>
                  <NavLink
                    to={navItem.link}
                    className={styles['menu-navigation-link']}
                  >
                    {icons[navItem.id]}
                    {t(navItem.textId)}
                  </NavLink>
                </MenuItem>
              ))}
              {devMode && (
                <>
                  <MenuItem>
                    <NavLink
                      to={href('/design-system')}
                      className={styles['menu-navigation-link']}
                    >
                      <PaletteIcon />
                      Design system
                    </NavLink>
                  </MenuItem>
                </>
              )}
            </DropdownMenu>
          </Menu>
        </li>
      </ul>
    </nav>
  );
};

export const compareNavigationItems = (
  a: NavigationItem,
  b: NavigationItem,
) => {
  const sortOrder = [
    'diva-output',
    'diva-person',
    'diva-project',
    'diva-course',
    'diva-organisation',
    'diva-journal',
    'diva-subject',
    'diva-programme',
    'diva-series',
    'diva-localLabel',
    'diva-publisher',
    'diva-funder',
  ];
  const aIndex = sortOrder.indexOf(a.id);
  const bIndex = sortOrder.indexOf(b.id);
  return (
    (aIndex === -1 ? Infinity : aIndex) - (bIndex === -1 ? Infinity : bIndex)
  );
};
