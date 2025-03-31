/*
 * Copyright 2025 Uppsala University Library
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

import { type HTMLProps, use } from 'react';
import styles from './Accordion.module.css';
import { AccordionContext } from '@/components/Accordion/Accordion';
import clsx from 'clsx';

export const AccordionContent = ({
  children,
  className,
  ...rest
}: HTMLProps<HTMLDivElement>) => {
  const { contentId, titleId } = use(AccordionContext);
  return (
    <div
      id={contentId}
      role='region'
      aria-labelledby={titleId}
      className={clsx(styles['content'], className)}
      {...rest}
    >
      {children}
    </div>
  );
};
