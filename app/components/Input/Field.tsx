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

import {
  Field as HUIField,
  type FieldProps as HUIFieldProps,
  Label,
} from '@headlessui/react';
import type { ReactNode } from 'react';
import styles from './Input.module.css';
import clsx from 'clsx';

interface FieldProps extends HUIFieldProps {
  label?: ReactNode;
  adornment?: ReactNode;
  children?: ReactNode;
  variant?: 'block' | 'inline';
  size?: 'small' | 'medium';
}

export const Field = ({
  label,
  adornment,
  children,
  variant = 'block',
  size = 'medium',
  className,
  ...rest
}: FieldProps) => {
  return (
    <HUIField
      {...rest}
      className={clsx(styles.field, className)}
      data-variant={variant}
      data-size={size}
    >
      <div className={styles.labelWrapper}>
        <Label>{label}</Label> {adornment}
      </div>
      {children}
    </HUIField>
  );
};
