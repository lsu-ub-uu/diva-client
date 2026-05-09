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
import type { BFFMember } from '@/cora/bffTypes.server';
import { useLanguage } from '@/i18n/useLanguage';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Button } from '@/components/Button/Button';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import clsx from 'clsx';

interface MemberBarProps {
  member: BFFMember | undefined;
  loggedIn: boolean;
  children?: ReactNode;
}

export const MemberBar = ({ member, loggedIn, children }: MemberBarProps) => {
  const { t } = useTranslation();
  const lang = useLanguage();

  if (!member || member.id === 'diva') {
    return <div className={styles['diva-bar']} />;
  }

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
      <div className={clsx(styles['bar-content'], 'grid')}>
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
      </div>
    </section>
  );
};
