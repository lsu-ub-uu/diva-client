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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { useTranslation } from 'react-i18next';

import styles from './NavigationPanel.module.css';
import { useLocation } from 'react-router';

export interface NavigationPanelLink {
  name: string;
  label: string;
}

export interface NavigationPanelProps {
  links: NavigationPanelLink[];
}

export const NavigationPanel = ({ links }: NavigationPanelProps) => {
  const { hash } = useLocation();
  const { t } = useTranslation();

  return (
    <nav className={styles['navigation-panel']}>
      <ul>
        {links.map((item) => (
          <li key={item.name}>
            <a
              href={`#anchor_${item.name}`}
              {...(hash === `#anchor_${item.name}`
                ? { 'aria-current': 'page' }
                : undefined)}
            >
              {t(item.label)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
