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
import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  boxed?: boolean;
  label?: string;
  expanded?: boolean;
  hasValues?: boolean;
}

export const Card = ({
  children,
  boxed = false,
  label,
  className,
  expanded = true,
  ...rest
}: CardProps) => {
  const id = useId();
  const ids = {
    heading: `card-heading-${id}`,
    section: `card-section-${id}`,
  };
  return (
    <section
      id={ids.section}
      aria-labelledby={label ? undefined : ids.heading}
      aria-label={label}
      className={clsx(styles['card'], className)}
      data-expanded={expanded}
      {...rest}
      {...(boxed && { 'data-boxed': '' })}
    >
      <CardContext value={{ boxed, ids }}>{children}</CardContext>
    </section>
  );
};
