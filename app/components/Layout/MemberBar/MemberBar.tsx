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

interface MemberBarProps {
  theme: BFFTheme;
}

export const MemberBar = ({ theme }: MemberBarProps) => {
  const lang = useLanguage();

  return (
    <div
      className={styles['member-bar']}
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      {theme.logo.svg && (
        <div
          className={styles['logo-wrapper']}
          dangerouslySetInnerHTML={{
            __html: theme.logo.svg,
          }}
        />
      )}
      {!theme.logo.svg && theme.logo.url && (
        <img src={theme.logo.url} alt={theme.pageTitle[lang]} />
      )}

      <div className={styles['links']}>
        <ul>
          {(theme.publicLinks ?? []).map((link) => (
            <li key={link[lang].url}>
              <a href={link[lang].url} target='_blank' rel='noreferrer'>
                {link[lang].displayLabel}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
