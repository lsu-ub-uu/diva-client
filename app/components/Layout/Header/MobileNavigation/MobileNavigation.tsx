import { IconButton } from '@/components/IconButton/IconButton';
import type { Navigation } from '@/data/getNavigation.server';
import type { UserPreferences } from '@/userPreferences/userPreferencesCookie.server';
import { MenuIcon, XIcon } from 'lucide-react';
import { useRef } from 'react';
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
            {navigationItems.map((navItem) => (
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
