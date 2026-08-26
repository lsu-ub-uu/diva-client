import { Button } from '@/components/Button/Button';
import { IconButton } from '@/components/IconButton/IconButton';
import { useLanguage } from '@/i18n/useLanguage';
import { useIsDevMode } from '@/utils/useIsDevMode';
import { BugOffIcon } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';
import { href, NavLink } from 'react-router';
import { Popover } from '@/components/Popover/Popover';

interface FooterProps {
  applicationVersion: string;
  deploymentName: string;
  helmChartVersion: string;
}

const aboutLink = {
  sv: 'https://www.info.diva-portal.org/w/diva/om-diva',
  en: 'https://www.info.diva-portal.org/w/diva/en/about-diva',
};

export const Footer = ({
  applicationVersion,
  deploymentName,
  helmChartVersion,
}: FooterProps) => {
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
      <nav
        aria-label={t('divaClient_footerLinksAriaLabelText')}
        className={styles['footer-links']}
      >
        <FooterExternalLink href={aboutLink[language]}>
          {t('divaClient_footerAboutLinkText')}
        </FooterExternalLink>
        <FooterInternalLink
          href={href('/article/:articleId', { articleId: 'cookies' })}
        >
          {t('divaClient_footerCookiesLinkText')}
        </FooterInternalLink>

        <FooterInternalLink
          href={href('/article/:articleId', { articleId: 'accessibility' })}
        >
          {t('divaClient_footerAccessibilityLinkText')}
        </FooterInternalLink>
        <FooterInternalLink
          href={href('/article/:articleId', { articleId: 'developer' })}
        >
          {t('divaClient_footerDeveloperLinkText')}
        </FooterInternalLink>
      </nav>

      <Button
        variant='tertiary'
        className={styles['footer-version']}
        popoverTarget='footer-version-popover'
      >
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
        {t('divaClient_footerVersionText', { version: applicationVersion })}
      </Button>
      <Popover id='footer-version-popover' title='Deployment Info'>
        <dl>
          <dt>Deployment name</dt>
          <dd>{deploymentName}</dd>
          <dt>Helm chart version</dt>
          {/* eslint-disable-next-line */}
          <dd onClick={handleVersionClick}>{helmChartVersion}</dd>
          <dt>Application version</dt>
          <dd>{applicationVersion}</dd>
        </dl>
      </Popover>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: ReactNode;
}

const FooterExternalLink = ({ href, children }: FooterLinkProps) => (
  <Button
    variant='tertiary'
    as='a'
    href={href}
    rel='noopener noreferrer nofollow'
    className={styles['footer-link']}
  >
    {children}
  </Button>
);

const FooterInternalLink = ({ href, children }: FooterLinkProps) => (
  <Button
    variant='tertiary'
    as={NavLink}
    to={href}
    className={styles['footer-link']}
  >
    {children}
  </Button>
);
