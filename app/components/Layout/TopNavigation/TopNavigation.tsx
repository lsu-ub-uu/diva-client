import { Button } from '@/components/Button/Button';
import { NavigationLink } from '@/components/Layout/TopNavigation/NavigationLink';
import type { Navigation } from '@/data/getNavigation';
import { useIsDevMode } from '@/utils/useIsDevMode';
import {
  BookCheckIcon,
  BookOpenIcon,
  BuildingIcon,
  ChartGanttIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  FlaskRoundIcon,
  GraduationCapIcon,
  HandCoinsIcon,
  LibraryIcon,
  MenuIcon,
  NewspaperIcon,
  NotebookTabsIcon,
  PaletteIcon,
  RefreshCwIcon,
  TagIcon,
  UsersIcon,
} from 'lucide-react';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, href, useLocation } from 'react-router';
import styles from './TopNavigation.module.css';
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
};

export const TopNavigation = ({
  navigation,
  onNavigationClick,
}: TopNavigationProps) => {
  const devMode = useIsDevMode();
  const location = useLocation();
  const returnTo = encodeURIComponent(location.pathname + location.search);

  const { t } = useTranslation();

  return (
    <nav className={styles['top-navigation']}>
      <ul>
        {navigation.mainNavigationItems
          .sort((a, b) => {
            const aIndex = sortOrder.indexOf(a.id);
            const bIndex = sortOrder.indexOf(b.id);
            return (
              (aIndex === -1 ? Infinity : aIndex) -
              (bIndex === -1 ? Infinity : bIndex)
            );
          })
          .map((navItem) => (
            <li key={navItem.id}>
              <NavigationLink
                to={navItem.link}
                label={t(navItem.textId)}
                icon={icons[navItem.id]}
                onClick={onNavigationClick}
              />
            </li>
          ))}

        <li>
          <button className={styles['navigation-link']}>
            <MenuIcon />
            <span className={styles['label']}>Mer</span>
            <ChevronDownIcon />
          </button>
        </li>

        {devMode && (
          <>
            <li>
              <NavigationLink
                to={href('/design-system')}
                label='Design system'
                icon={<PaletteIcon />}
              />
            </li>
            <li>
              <Form
                action={href('/refreshDefinitions')}
                method='POST'
                reloadDocument
              >
                <input type='hidden' name='returnTo' value={returnTo} />
                <Button variant='tertiary' type='submit' fullWidth>
                  <RefreshCwIcon />
                </Button>
              </Form>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
