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

import { useTranslation } from 'react-i18next';
import { NavLink, type UIMatch, useMatches } from 'react-router';
import styles from './Breadcrumbs.module.css';
import type { ReactNode } from 'react';
import DivaStar from '@/images/diva-star.svg?react';
import { HomeIcon } from '@/icons';

export type Breadcrumb = (match: MatchWithBreadcrumb) => ReactNode;

export interface HandleWithBreadcrumb {
  breadcrumb: Breadcrumb;
}

export interface MatchWithBreadcrumb extends UIMatch {
  data: {
    breadcrumb: string;
  };
}

const hasBreadcrumb = (match: UIMatch): match is MatchWithBreadcrumb =>
  match.data != null &&
  typeof match.data === 'object' &&
  'breadcrumb' in match.data;

export const Breadcrumbs = () => {
  const matches = useMatches();
  const { t } = useTranslation();

  return (
    <nav
      aria-label={t('divaClient_breadcrumbText')}
      className={styles['breadcrumbs']}
    >
      <ol>
        <li>
          <span aria-label={t('divaClient_breadcrumbStartText')}>
            <HomeIcon style={{ width: '1em', height: '1em' }} />{' '}
          </span>
        </li>
        {matches.filter(hasBreadcrumb).map((match) => {
          return (
            <li key={match.id}>
              <NavLink to={match.pathname}>{match.data.breadcrumb}</NavLink>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
