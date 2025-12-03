import DivaLogo from '@/assets/divaLogo.svg?react';
import type { User } from '@/auth/createUser';
import type { AppTokenLogin } from '@/auth/getAppTokenLogins.server';
import { IconButton } from '@/components/IconButton/IconButton';
import { NavigationLoader } from '@/components/NavigationLoader/NavigationLoader';
import type {
  BFFMember,
  BFFRecordType,
} from '@/cora/transform/bffTypes.server';
import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';
import type { UserPreferences } from '@/userPreferences/userPreferencesCookie.server';
import { clsx } from 'clsx';
import { MenuIcon, XIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { MemberBar } from '../MemberBar/MemberBar';
import { TopNavigation } from '../TopNavigation/TopNavigation';
import { ColorSchemeSwitcher } from './ColorSchemeSwitcher';
import styles from './Header.module.css';
import { LanguageSwitcher } from './LanguageSwitcher';
import LoginMenu from './Login/LoginMenu';
interface HeaderProps {
  className?: string;
  member: BFFMember | undefined;
  user: User | undefined;
  userPreferences: UserPreferences;
  loginUnits: LoginDefinition[];
  appTokenLogins: AppTokenLogin[];
  recordTypes: BFFRecordType[];
  editableMember: string | undefined;
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
}: HeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === headerRef.current) {
            if (entry.isIntersecting) {
              document.body.classList.remove('scrolled-past-header');
            } else {
              document.body.classList.add('scrolled-past-header');
            }
          }
        });
      },
      { threshold: [0] },
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const { t } = useTranslation();
  const mobileDialogRef = useRef<HTMLDialogElement>(null);
  return (
    <header className={clsx(styles.header, className)} ref={headerRef}>
      <NavigationLoader />
      <MemberBar member={member} loggedIn={user !== undefined} />
      <div className={styles['diva-header-bar']}>
        <div className={styles['header-bar-left']}>
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
              // eslint-disable-next-line react/no-unknown-property
              closedby='any'
            >
              <div className={styles['mobile-menu-header']}>
                <LanguageSwitcher />
                <ColorSchemeSwitcher
                  colorScheme={userPreferences.colorScheme}
                />
                <IconButton
                  className={styles['menu-close-button']}
                  tooltip={t('divaClient_closeText')}
                  onClick={() => mobileDialogRef.current?.close()}
                >
                  <XIcon />
                </IconButton>
              </div>
              <hr />
              <TopNavigation
                recordTypes={recordTypes}
                editableMember={editableMember}
                onNavigationClick={() => mobileDialogRef.current?.close()}
              />
            </dialog>
          </div>
          <Link to='/' aria-label={t('divaClient_breadcrumbStartText')}>
            <DivaLogo className={styles.logo} />
          </Link>
        </div>
        <div className={styles['header-bar-right']}>
          <div className={styles['color-theme-switcher']}>
            <ColorSchemeSwitcher colorScheme={userPreferences.colorScheme} />
          </div>
          <div className={styles['language-switcher']}>
            <LanguageSwitcher />
          </div>
          <LoginMenu loginUnits={loginUnits} appTokenLogins={appTokenLogins} />
        </div>
      </div>
    </header>
  );
};
