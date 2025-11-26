import { Button } from '@/components/Button/Button';
import styles from './Footer.module.css';
import type { ReactNode } from 'react';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles['footer-links']}>
      <FooterLink href='https://www.info.diva-portal.org/w/diva/om-diva/diva-portalernas-tillganglighetsredogorelse'>
        Tillgänglighet
      </FooterLink>
      <FooterLink href='https://www.info.diva-portal.org/w/diva/om-diva'>
        Om DiVA
      </FooterLink>
      <FooterLink href='/rest'>REST API</FooterLink>
      <FooterLink href='/jsclient'>JSClient</FooterLink>
    </div>
  </footer>
);

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
