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
import type { BFFTheme } from '@/cora/transform/bffTypes.server';
import { useLanguage } from '@/i18n/useLanguage';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Button } from '@/components/Button/Button';
import { ChevronDownIcon } from '@/icons';
import { useTranslation } from 'react-i18next';

interface MemberBarProps {
  theme: BFFTheme;
  loggedIn: boolean;
}

export const MemberBar = ({ theme, loggedIn }: MemberBarProps) => {
  const { t } = useTranslation();
  const lang = useLanguage();
  const links = loggedIn ? theme.adminLinks : theme.publicLinks;

  return (
    <section
      className={styles['member-bar']}
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
      aria-label={theme.pageTitle[lang]}
    >
      {theme.logo.svg && (
        <div
          role='img'
          aria-label={`${theme.pageTitle[lang]} logo`}
          className={styles['logo-wrapper']}
          dangerouslySetInnerHTML={{
            __html: theme.logo.svg,
          }}
        />
      )}
      {!theme.logo.svg && theme.logo.url && (
        <img src={theme.logo.url} alt={`${theme.pageTitle[lang]} logo`} />
      )}

      {links && (
        <>
          <div className={styles['links']}>
            <ul>
              {links.map((link) => (
                <li key={link[lang].url}>
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
    </section>
  );
};
