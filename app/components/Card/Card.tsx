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

import { useId, type ReactNode } from 'react';
import styles from './Card.module.css';
import { CardContext } from '@/components/Card/CardContext';

export interface CardProps {
  children: ReactNode;
  boxed?: boolean;
  label?: string;
}

export const Card = ({ children, boxed = false, label }: CardProps) => {
  const id = useId();
  const ids = {
    heading: `card-heading-${id}`,
    section: `card-section-${id}`,
  };
  return (
    <section
      id={ids.section}
      aria-labelledby={ids.heading}
      aria-label={label}
      className={styles['card']}
      {...(boxed && { 'data-boxed': '' })}
    >
      <CardContext value={{ boxed, ids }}>{children}</CardContext>
    </section>
  );
};
