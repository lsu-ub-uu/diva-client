import { Button } from '@/components/Button/Button';
import { useLanguage } from '@/i18n/useLanguage';
import { useIsDevMode } from '@/utils/useIsDevMode';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';
import { IconButton } from '@/components/IconButton/IconButton';
import { BugOffIcon } from 'lucide-react';

interface FooterProps {
  applicationVersion: string;
}

const accessibilityLink = {
  sv: 'https://www.info.diva-portal.org/w/diva/om-diva/diva-portalernas-tillganglighetsredogorelse',
  en: 'https://www.info.diva-portal.org/w/diva/en/about-diva/accessibility-report---diva',
};

const aboutLink = {
  sv: 'https://www.info.diva-portal.org/w/diva/om-diva',
  en: 'https://www.info.diva-portal.org/w/diva/en/about-diva',
};

export const Footer = ({ applicationVersion }: FooterProps) => {
  const { t } = useTranslation();
  const language = useLanguage();
  const devMode = useIsDevMode();
  const [devModeClickCount, setDevModeClickCount] = useState(0);

  const handleVersionClick = () => {
    if (devModeClickCount > 4) {
      localStorage.setItem('diva-dev', 'true');
      window.location.reload();
    }
    setDevModeClickCount(devModeClickCount + 1);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles['footer-links']}>
        {devMode && (
          <IconButton
            tooltip='Disable dev mode'
            size='small'
            onClick={() => {
              localStorage.removeItem('diva-dev');
              window.location.reload();
            }}
          >
            <BugOffIcon />
          </IconButton>
        )}
        {/* eslint-disable-next-line  */}
        <span
          className={styles['footer-link']}
          onClick={handleVersionClick}
          style={{ transform: `rotate(${devModeClickCount}deg)` }}
        >
          {t('divaClient_footerVersionText', { version: applicationVersion })}
        </span>
        <FooterLink href={accessibilityLink[language]}>
          {t('divaClient_footerAccessibilityLinkText')}
        </FooterLink>
        <FooterLink href={aboutLink[language]}>
          {t('divaClient_footerAboutLinkText')}
        </FooterLink>
        <FooterLink href='/rest'>
          {t('divaClient_footerRestApiLinkText')}
        </FooterLink>
        <FooterLink href='/jsclient'>
          {t('divaClient_footerJsClientLinkText')}
        </FooterLink>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <Button
    variant='tertiary'
    as='a'
    href={href}
    className={styles['footer-link']}
  >
    {children}
  </Button>
);
