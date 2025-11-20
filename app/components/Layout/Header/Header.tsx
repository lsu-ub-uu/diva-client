import DivaLogo from '@/assets/divaLogo.svg?react';
import type { User } from '@/auth/createUser';
import type { AppTokenLogin } from '@/auth/getAppTokenLogins.server';
import { Button } from '@/components/Button/Button';
import { NavigationLoader } from '@/components/NavigationLoader/NavigationLoader';
import type {
  BFFMember,
  BFFRecordType,
} from '@/cora/transform/bffTypes.server';
import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';
import { MenuIcon } from '@/icons';
import type { UserPreferences } from '@/userPreferences/userPreferencesCookie.server';
import { clsx } from 'clsx';
import { useRef } from 'react';
import { Link } from 'react-router';
import { ColorSchemeSwitcher } from '../HeaderOld/ColorSchemeSwitcher';
import { LanguageSwitcher } from '../HeaderOld/LanguageSwitcher';
import LoginMenu from '../HeaderOld/Login/LoginMenu';
import { MemberBar } from '../MemberBar/MemberBar';
import { TopNavigation } from '../TopNavigation/TopNavigation';
import styles from './Header.module.css';
interface HeaderProps {
  className?: string;
  member: BFFMember | undefined;
  user: User | undefined;
  userPreferences: UserPreferences;
  loginUnits: LoginDefinition[];
  appTokenLogins: AppTokenLogin[];
  recordTypes: BFFRecordType[];
}

export const Header = ({
  className,
  member,
  user,
  userPreferences,
  loginUnits,
  appTokenLogins,
  recordTypes,
}: HeaderProps) => {
  const mobileDialogRef = useRef<HTMLDialogElement>(null);
  return (
    <header className={clsx(styles.header, className)}>
      <NavigationLoader />
      <MemberBar member={member} loggedIn={user !== undefined} />
      <div className={styles['diva-header-bar']}>
        <div className={styles['header-mobile-menu-button']}>
          <Button
            variant='icon'
            aria-label='Open menu'
            onClick={() => mobileDialogRef.current?.showModal()}
          >
            <MenuIcon />
          </Button>
          <dialog
            ref={mobileDialogRef}
            className={styles['mobile-menu-dialog']}
            closedBy='any'
          >
            <TopNavigation
              recordTypes={recordTypes}
              onNavigationClick={() => mobileDialogRef.current?.close()}
            />
          </dialog>
        </div>
        <div className={styles['header-bar-left']}>
          <Link to='/'>
            <DivaLogo className={styles.logo} />
          </Link>
        </div>
        <div className={styles['header-bar-right']}>
          <ColorSchemeSwitcher colorScheme={userPreferences.colorScheme} />
          <div className={styles['header-bar-login-language']}>
            <LoginMenu
              loginUnits={loginUnits}
              appTokenLogins={appTokenLogins}
            />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};
