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

import { type ReactNode, use } from 'react';
import styles from './Card.module.css';
import { CardContext } from '@/components/Card/CardContext';

interface CardContentProps {
  children: ReactNode;
  enhancedFields?: boolean;
}

export const CardContent = ({ children, enhancedFields }: CardContentProps) => {
  const { boxed } = use(CardContext);
  return (
    <div
      data-alert={enhancedFields === true}
      className={styles['card-content']}
      {...(boxed && { 'data-boxed': '' })}
    >
      {children}
    </div>
  );
};
