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

import type { HTMLProps, ReactNode } from 'react';
import { useContext } from 'react';

import styles from './Card.module.css';
import { CardContext } from '@/components/Card/CardContext';

interface CardHeaderProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader = ({ children }: CardHeaderProps) => {
  const { boxed } = useContext(CardContext);

  return (
    <div className={styles.cardHeader} {...(boxed && { 'data-boxed': '' })}>
      {children}
    </div>
  );
};
