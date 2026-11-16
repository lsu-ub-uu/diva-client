import { Button } from '@/components/Button/Button';
import { NavigationLink } from '@/components/Layout/Header/TopNavigation/NavigationLink';
import { Menu, useMenu } from '@/components/Menu/Menu';
import { MenuItem } from '@/components/Menu/MenuItem';
import type { Navigation } from '@/data/getNavigation.server';
import {
  ChevronDownIcon,
  CourseIcon,
  DesignSystemIcon,
  EllipsisIcon,
  FunderIcon,
  JournalIcon,
  MemberIcon,
  OrganisationIcon,
  ClientContentIcon,
  ProgrammeIcon,
  ProjectIcon,
  PublicationIcon,
  PublishIcon,
  SeriesIcon,
  SubjectIcon,
  LabelIcon,
  PersonIcon,
} from '@/icons/icons';
import { useIsDevMode } from '@/utils/useIsDevMode';
import clsx from 'clsx';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { href, NavLink, useLocation } from 'react-router';
import styles from './TopNavigation.module.css';

export interface TopNavigationLink {
  label: string;
  to: string;
}

export interface TopNavigationProps {
  navigation: Navigation;
}

export const icons: Record<string, ReactNode> = {
  'diva-output': <PublicationIcon />,
  'diva-person': <PersonIcon />,
  'diva-project': <ProjectIcon />,
  'diva-course': <CourseIcon />,
  'diva-organisation': <OrganisationIcon />,
  'diva-journal': <JournalIcon />,
  'diva-subject': <SubjectIcon />,
  'diva-programme': <ProgrammeIcon />,
  'diva-series': <SeriesIcon />,
  'diva-localLabel': <LabelIcon />,
  'diva-publisher': <PublishIcon />,
  'diva-funder': <FunderIcon />,
  'diva-member': <MemberIcon />,
  'diva-clientContent': <ClientContentIcon />,
};

export const TopNavigation = ({ navigation }: TopNavigationProps) => {
  const devMode = useIsDevMode();
  const location = useLocation();
  const { t } = useTranslation();
  const { triggerProps, menuProps, closeMenu } = useMenu();

  const isOtherNavActive = navigation.otherNavigationItems.some((navItem) =>
    location.pathname.startsWith(navItem.link),
  );

  return (
    <nav className={styles['top-navigation']}>
      <ul className={styles['navigation-list']}>
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
            <Button
              variant='tertiary'
              className={clsx(
                styles['navigation-link'],
                styles['menu-navigation-button'],
              )}
              data-active={isOtherNavActive}
              {...triggerProps}
            >
              <EllipsisIcon />
              <span className={styles['label']}>
                {t('divaClient_moreNavigationText')}
              </span>
              <ChevronDownIcon className={styles['menu-navigation-chevron']} />
            </Button>
            <Menu alignment='center' {...menuProps}>
              {navigation.otherNavigationItems.map((navItem) => (
                <MenuItem key={navItem.id}>
                  <NavLink
                    to={navItem.link}
                    className={styles['menu-navigation-link']}
                    onClick={closeMenu}
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
                      onClick={closeMenu}
                    >
                      <DesignSystemIcon />
                      Design system
                    </NavLink>
                  </MenuItem>
                </>
              )}
            </Menu>
          </li>
        )}
      </ul>
    </nav>
  );
};
