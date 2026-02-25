import {
  DrawerDialog,
  useDrawerDialog,
} from '@/components/DrawerDialog/DrawerDialog';
import { IconButton } from '@/components/IconButton/IconButton';
import type { Navigation } from '@/data/getNavigation.server';
import type { UserPreferences } from '@/userPreferences/userPreferencesCookie.server';
import { MenuIcon, XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ColorSchemeSwitcher } from '../ColorSchemeSwitcher';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { NavigationLink } from '../TopNavigation/NavigationLink';
import { icons } from '../TopNavigation/TopNavigation';
import styles from './MobileNavigation.module.css';

interface MobileNavigationProps {
  navigation: Navigation;
  userPreferences: UserPreferences;
}

export const MobileNavigation = ({
  navigation,
  userPreferences,
}: MobileNavigationProps) => {
  const { t } = useTranslation();
  const navigationItems = [
    ...navigation.mainNavigationItems,
    ...navigation.otherNavigationItems,
  ];
  const { showDrawerDialog, closeDrawerDialog, drawerDialogRef } =
    useDrawerDialog();
  return (
    <>
      <IconButton
        className={styles['header-mobile-menu-button']}
        tooltip={t('divaClient_showMenuText')}
        onClick={showDrawerDialog}
      >
        <MenuIcon />
      </IconButton>
      <DrawerDialog ref={drawerDialogRef}>
        <div className={styles['mobile-menu-header']}>
          <LanguageSwitcher />
          <ColorSchemeSwitcher colorScheme={userPreferences.colorScheme} />
          <IconButton
            tooltip={t('divaClient_closeMenuText')}
            onClick={closeDrawerDialog}
            className={styles['menu-close-button']}
          >
            <XIcon />
          </IconButton>
        </div>
        <hr />
        <nav>
          <ul className={styles['mobile-navigation-list']}>
            {navigationItems.map((navItem) => (
              <li key={navItem.id}>
                <NavigationLink
                  to={navItem.link}
                  label={t(navItem.textId)}
                  icon={icons[navItem.id]}
                  onClick={() => drawerDialogRef.current?.close()}
                />
              </li>
            ))}
          </ul>
        </nav>
      </DrawerDialog>
    </>
  );
};
