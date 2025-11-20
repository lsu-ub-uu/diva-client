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
import { CloseIcon, MenuIcon } from '@/icons';
import type { UserPreferences } from '@/userPreferences/userPreferencesCookie.server';
import { clsx } from 'clsx';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
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
  editableMember: string | undefined;
  ref?: React.Ref<HTMLElement>;
}

export const Header = ({
  className,
  member,
  user,
  userPreferences,
  loginUnits,
  appTokenLogins,
  recordTypes,
  editableMember,
  ref,
}: HeaderProps) => {
  const { t } = useTranslation();
  const mobileDialogRef = useRef<HTMLDialogElement>(null);
  return (
    <header className={clsx(styles.header, className)} ref={ref}>
      <NavigationLoader />
      <MemberBar member={member} loggedIn={user !== undefined} />
      <div className={styles['diva-header-bar']}>
        <div className={styles['header-bar-left']}>
          <div className={styles['header-mobile-menu-button']}>
            <Button
              variant='icon'
              aria-label={t('divaClient_showMenuText')}
              onClick={() => mobileDialogRef.current?.showModal()}
            >
              <MenuIcon />
            </Button>
            <dialog
              ref={mobileDialogRef}
              className={styles['mobile-menu-dialog']}
              // eslint-disable-next-line react/no-unknown-property
              closedby='any'
            >
              <div className={styles['mobile-menu-header']}>
                <LanguageSwitcher />
                <ColorSchemeSwitcher
                  colorScheme={userPreferences.colorScheme}
                />
                <Button
                  className={styles['menu-close-button']}
                  variant='icon'
                  aria-label={t('divaClient_closeText')}
                  onClick={() => mobileDialogRef.current?.close()}
                >
                  <CloseIcon />
                </Button>
              </div>
              <hr />
              <TopNavigation
                recordTypes={recordTypes}
                editableMember={editableMember}
                onNavigationClick={() => mobileDialogRef.current?.close()}
              />
            </dialog>
          </div>
          <Link to='/'>
            <DivaLogo className={styles.logo} />
          </Link>
        </div>
        <div className={styles['header-bar-right']}>
          <div className={styles['color-theme-switcher']}>
            <ColorSchemeSwitcher colorScheme={userPreferences.colorScheme} />
          </div>
          <div className={styles['header-bar-login-language']}>
            <LoginMenu
              loginUnits={loginUnits}
              appTokenLogins={appTokenLogins}
            />
            <div className={styles['language-switcher']}>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
