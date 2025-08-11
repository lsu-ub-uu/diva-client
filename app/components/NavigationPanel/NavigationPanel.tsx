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

import { useEffect, useRef, useState, type RefObject } from 'react';
import styles from './NavigationPanel.module.css';
import { findFirstFocusableElement } from '@/utils/findFirstFocusableElement';

export interface NavigationPanelLink {
  name: string;
  label: string;
}

export interface NavigationPanelProps {
  links: NavigationPanelLink[];
}

export const NavigationPanel = ({ links }: NavigationPanelProps) => {
  const { t } = useTranslation();
  const [activeLink, setActiveLink] = useState<string | null>(links[0]?.name);
  const observerEnabledRef = useRef(true);

  useSectionObserver(setActiveLink, observerEnabledRef);

  const handleLinkClick = (itemName: string) => {
    const target = document.getElementById(`anchor_${itemName}`);

    if (!target) return;

    setActiveLink(itemName);
    highlightElement(target);
    disableObserver(observerEnabledRef);
    target.scrollIntoView({ behavior: 'smooth' });
    findFirstFocusableElement(target)?.focus({ preventScroll: true });
  };

  return (
    <nav className={styles['navigation-panel']}>
      <ul>
        {links.map((item) => (
          <li key={item.name}>
            <a
              href={`#anchor_${item.name}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.name);
              }}
              {...(activeLink === item.name
                ? { 'aria-current': 'location' }
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

const useSectionObserver = (
  onSectionChange: (name: string) => void,
  observerEnabledRef: RefObject<boolean>,
) => {
  useEffect(() => {
    const anchors = document.querySelectorAll('[id^="anchor_"]');

    if (anchors.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (observerEnabledRef.current === false) return;

      const intersectingEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (intersectingEntries.length > 0) {
        const closestAnchor = intersectingEntries[0];
        const anchorId = closestAnchor.target.id;
        onSectionChange(anchorId.replace('anchor_', ''));
      }
    }, observerOptions);

    anchors.forEach((anchor) => observer.observe(anchor));

    return () => {
      observer.disconnect();
    };
  }, [onSectionChange, observerEnabledRef]);
};

const highlightElement = (element: Element) => {
  element.classList.add('flash');
  setTimeout(() => {
    element.classList.remove('flash');
  }, 1000);
};

function disableObserver(observerEnabledRef: RefObject<boolean>) {
  observerEnabledRef.current = false;

  const enableObserver = () => {
    clearTimeout(fallbackTimeout);
    window.removeEventListener('scrollend', enableObserver);

    observerEnabledRef.current = true;
  };

  // Fallback for browsers that don't support scrollend
  const fallbackTimeout = setTimeout(enableObserver, 1500);

  window.addEventListener('scrollend', enableObserver);
}
