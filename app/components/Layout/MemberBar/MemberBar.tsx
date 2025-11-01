/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import styles from './MemberBar.module.css';
import type { BFFMember } from '@/cora/transform/bffTypes.server';
import { useLanguage } from '@/i18n/useLanguage';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Button } from '@/components/Button/Button';
import { ChevronDownIcon } from '@/icons';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import React from 'react';

interface MemberBarProps {
  member: BFFMember | undefined;
  loggedIn: boolean;
  children?: ReactNode;
}

const defaultMember: BFFMember = {
  id: 'default',
  pageTitle: { sv: 'DiVA', en: 'DiVA' },
  logo: {
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.25 0 27 29"><path d="m1.913 19.276-.606-1.1c.47-.37.934-.724 1.385-1.094 1.535-1.258 2.903-2.671 4.015-4.324.133-.199.122-.331-.007-.523-1.316-1.956-2.998-3.553-4.853-4.984l-.544-.416.6-1.092c.826.301 1.63.614 2.447.889 1.648.555 3.336.92 5.074 1.05.234.018.343-.052.445-.27 1.011-2.167 1.576-4.458 1.925-6.811l.076-.502h1.26c.053.385.115.773.158 1.162.245 2.206 1.005 4.254 1.901 6.263.083.186.214.165.356.156a17.111 17.111 0 0 0 3.846-.679c1.257-.374 2.497-.807 3.781-1.227l.519 1.041c-.618.51-1.239 1.003-1.838 1.521-1.341 1.158-2.547 2.442-3.557 3.904-.134.194-.133.324 0 .519 1.351 1.984 3.079 3.596 4.957 5.061l.444.349-.543 1.1c-.601-.227-1.189-.461-1.785-.671-1.868-.657-3.778-1.123-5.759-1.28-.262-.021-.387.064-.494.294-.973 2.089-1.558 4.289-1.88 6.564l-.101.722h-1.167c-.373-1.591-.697-3.164-1.121-4.708-.248-.9-.663-1.753-.992-2.631-.076-.204-.19-.255-.401-.236-2.112.196-4.154.692-6.144 1.416-.459.167-.913.35-1.395.536Zm14.968-6.76c-.001-2.438-1.945-4.365-4.367-4.401-2.484-.037-4.411 2.103-4.412 4.399-.001 2.298 1.915 4.402 4.395 4.373 2.449-.029 4.385-1.934 4.384-4.371z" class="path1" style="fill:#fff;fill-opacity:1" transform="matrix(1.17377 0 0 1.17377 -1.53 -.116)"/></svg>',
  },
  backgroundColor: '#75598e',
  textColor: '#ffffff',
  hostnames: [],
  loginUnitIds: [],
};

export const MemberBar = ({
  member = defaultMember,
  loggedIn,
  children,
}: MemberBarProps) => {
  const { t } = useTranslation();
  const lang = useLanguage();

  const links = loggedIn ? member.adminLinks : member.publicLinks;

  return (
    <section
      className={styles['member-bar']}
      style={
        {
          '--member-background-color': member.backgroundColor,
          '--member-text-color': member.textColor,
          '--member-background-color-dark-mode':
            member.backgroundColorDarkMode || member.backgroundColor,
          '--member-text-color-dark-mode':
            member.textColorDarkMode || member.textColor,
        } as React.CSSProperties
      }
      aria-label={member.pageTitle[lang]}
    >
      {member.logo.svg && (
        <div
          role='img'
          aria-label={`${member.pageTitle[lang]} logo`}
          className={styles['logo-wrapper']}
          dangerouslySetInnerHTML={{
            __html: member.logo.svg,
          }}
        />
      )}
      {!member.logo.svg && member.logo.url && (
        <img src={member.logo.url} alt={`${member.pageTitle[lang]} logo`} />
      )}

      {links && (
        <>
          <div className={styles['links']}>
            <ul>
              {links.map((link, index) => (
                <li key={index}>
                  <a href={link[lang].url} target='_blank' rel='noreferrer'>
                    {link[lang].displayLabel}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <Popover className='relative'>
            <PopoverButton
              as={Button}
              variant='tertiary'
              size='small'
              className={styles['links-popover-button']}
              aria-hidden={true}
            >
              {t('divaClient_memberBarLinksText')} <ChevronDownIcon />
            </PopoverButton>
            <PopoverPanel
              anchor='bottom'
              className={styles['links-popover-panel']}
            >
              <ul>
                {links.map((link) => (
                  <li key={link[lang].url}>
                    <a href={link[lang].url} target='_blank' rel='noreferrer'>
                      {link[lang].displayLabel}
                    </a>
                  </li>
                ))}
              </ul>
            </PopoverPanel>
          </Popover>
        </>
      )}

      <div className={styles['button-wrapper']}>{children}</div>
    </section>
  );
};
