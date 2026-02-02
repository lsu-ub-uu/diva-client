import { IconButton } from '@/components/IconButton/IconButton';
import { MenuIcon, XIcon } from 'lucide-react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useRef } from 'react';
import { ColorSchemeSwitcher } from '../ColorSchemeSwitcher';
import type { UserPreferences } from '@/userPreferences/userPreferencesCookie.server';
import { useTranslation } from 'react-i18next';
import type { Navigation } from '@/data/getNavigation';
import { NavigationLink } from '../TopNavigation/NavigationLink';
import { compareNavigationItems, icons } from '../TopNavigation/TopNavigation';
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
  const mobileDialogRef = useRef<HTMLDialogElement>(null);
  const navigationItems = [
    ...navigation.mainNavigationItems,
    ...navigation.otherNavigationItems,
  ];
  return (
    <div className={styles['header-mobile-menu-button']}>
      <IconButton
        tooltip={t('divaClient_showMenuText')}
        onClick={() => mobileDialogRef.current?.showModal()}
      >
        <MenuIcon />
      </IconButton>
      <dialog
        ref={mobileDialogRef}
        className={styles['mobile-menu-dialog']}
        closedby='any'
      >
        <div className={styles['mobile-menu-header']}>
          <LanguageSwitcher />
          <ColorSchemeSwitcher colorScheme={userPreferences.colorScheme} />
          <IconButton
            className={styles['menu-close-button']}
            tooltip={t('divaClient_closeText')}
            onClick={() => mobileDialogRef.current?.close()}
          >
            <XIcon />
          </IconButton>
        </div>
        <hr />
        <nav>
          <ul className={styles['mobile-navigation-list']}>
            {navigationItems.sort(compareNavigationItems).map((navItem) => (
              <li key={navItem.id}>
                <NavigationLink
                  to={navItem.link}
                  label={t(navItem.textId)}
                  icon={icons[navItem.id]}
                  onClick={() => mobileDialogRef.current?.close()}
                />
              </li>
            ))}
          </ul>
        </nav>
      </dialog>
    </div>
  );
};
