import { DropdownMenu } from '@/components/DropdownMenu/DropdownMenu';
import { NavigationLink } from '@/components/Layout/Header/TopNavigation/NavigationLink';
import { useIsDevMode } from '@/utils/useIsDevMode';
import { Menu, MenuButton, MenuItem } from '@headlessui/react';
import clsx from 'clsx';
import {
  BookCheckIcon,
  BookOpenIcon,
  BuildingIcon,
  ChartGanttIcon,
  ChevronDownIcon,
  EllipsisIcon,
  FlaskRoundIcon,
  GraduationCapIcon,
  HandCoinsIcon,
  LibraryIcon,
  MonitorCogIcon,
  NewspaperIcon,
  NotebookTabsIcon,
  PaletteIcon,
  TagIcon,
  UsersIcon,
} from 'lucide-react';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { href, NavLink, useLocation } from 'react-router';
import styles from './TopNavigation.module.css';
import type { Navigation } from '@/data/getNavigation.server';

export interface TopNavigationLink {
  label: string;
  to: string;
}

export interface TopNavigationProps {
  navigation: Navigation;
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

  const isOtherNavActive = navigation.otherNavigationItems.some((navItem) =>
    location.pathname.startsWith(navItem.link),
  );

  return (
    <nav className={styles['top-navigation']}>
      <ul>
        {navigation.mainNavigationItems.map((navItem) => (
          <li key={navItem.id}>
            <NavigationLink
              to={navItem.link}
              label={t(navItem.textId)}
              icon={icons[navItem.id]}
            />
          </li>
        ))}
        {navigation.otherNavigationItems.length > 0 && (
          <li>
            <Menu>
              <MenuButton
                className={clsx(
                  styles['navigation-link'],
                  styles['menu-navigation-button'],
                )}
                data-active={isOtherNavActive}
              >
                <EllipsisIcon />
                <span className={styles['label']}>
                  {t('divaClient_moreNavigationText')}
                </span>
                <ChevronDownIcon
                  className={styles['menu-navigation-chevron']}
                />
              </MenuButton>
              <DropdownMenu anchor='bottom start'>
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
        )}
      </ul>
    </nav>
  );
};
