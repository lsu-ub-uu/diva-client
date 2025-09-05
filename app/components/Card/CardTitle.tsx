/*
 * Copyright 2024 Uppsala University Library
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

import { use, type ReactNode } from 'react';
import styles from './Card.module.css';
import { CardContext } from './CardContext';

interface CardTitleProps {
  children: ReactNode;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  info?: ReactNode;
}

export const CardTitle = ({ children, level = 'h2', info }: CardTitleProps) => {
  const HeadingElement = level;
  const { ids } = use(CardContext);
  return (
    <div className={styles['card-title']}>
      <HeadingElement id={ids.heading} className={styles['card-heading']}>
        {children}
      </HeadingElement>
      {info}
    </div>
  );
};
