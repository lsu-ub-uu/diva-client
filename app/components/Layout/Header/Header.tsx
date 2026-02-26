import DivaLogo from '@/assets/divaLogo.svg?react';
import type { User } from '@/auth/createUser';
import { IconButton } from '@/components/IconButton/IconButton';
import { NavigationLoader } from '@/components/NavigationLoader/NavigationLoader';
import type { BFFMember } from '@/cora/bffTypes.server';
import type { ExampleUser } from '@/cora/bffTypes.server';
import type { Navigation } from '@/data/getNavigation.server';
import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';
import type { UserPreferences } from '@/userPreferences/userPreferencesCookie.server';
import { useIsDevMode } from '@/utils/useIsDevMode';
import { clsx } from 'clsx';
import { RefreshCwIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Form, href, Link, useLocation } from 'react-router';
import { MemberBar } from '../MemberBar/MemberBar';
import { ColorSchemeSwitcher } from './ColorSchemeSwitcher';
import styles from './Header.module.css';
import { LanguageSwitcher } from './LanguageSwitcher';
import LoginMenu from './Login/LoginMenu';
import { MobileNavigation } from './MobileNavigation/MobileNavigation';
import { TopNavigation } from './TopNavigation/TopNavigation';
interface HeaderProps {
  className?: string;
  member: BFFMember | undefined;
  user: User | undefined;
  userPreferences: UserPreferences;
  loginUnits: LoginDefinition[];
  exampleUsers: ExampleUser[];
  navigation: Navigation;
}

export const Header = ({
  className,
  member,
  user,
  userPreferences,
  loginUnits,
  exampleUsers,
  navigation,
}: HeaderProps) => {
  const location = useLocation();
  const returnTo = encodeURIComponent(location.pathname + location.search);
  const devMode = useIsDevMode();
  const { t } = useTranslation();
  return (
    <header className={clsx(styles.header, className)}>
      <NavigationLoader />
      <MemberBar member={member} loggedIn={user !== undefined} />
      <div className={clsx(styles['diva-header-bar'])}>
        <div className={clsx(styles['header-bar-content'], 'grid')}>
          <div className={styles['header-bar-left']}>
            <MobileNavigation
              navigation={navigation}
              userPreferences={userPreferences}
            />
            <Link to='/' aria-label={t('divaClient_breadcrumbStartText')}>
              <DivaLogo className={styles.logo} />
            </Link>
            <TopNavigation navigation={navigation} />
          </div>
          <div className={styles['header-bar-right']}>
            {devMode && (
              <Form
                action={href('/refreshDefinitions')}
                method='POST'
                reloadDocument
              >
                <input type='hidden' name='returnTo' value={returnTo} />
                <IconButton type='submit' tooltip='Refresh definitions'>
                  <RefreshCwIcon />
                </IconButton>
              </Form>
            )}

            <div className={styles['color-theme-switcher']}>
              <ColorSchemeSwitcher colorScheme={userPreferences.colorScheme} />
            </div>
            <div className={styles['language-switcher']}>
              <LanguageSwitcher />
            </div>
            <LoginMenu loginUnits={loginUnits} exampleUsers={exampleUsers} />
          </div>
        </div>
      </div>
    </header>
  );
};
