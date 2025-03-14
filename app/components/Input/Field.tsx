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
  Description,
  Field as HUIField,
  type FieldProps as HUIFieldProps,
  Label,
} from '@headlessui/react';
import type { ReactNode } from 'react';
import styles from './Input.module.css';
import clsx from 'clsx';
import { WarningIcon } from '@/icons';
import { FieldInfo } from '@/components/FieldInfo/FieldInfo';

interface FieldProps extends HUIFieldProps {
  label?: ReactNode;
  adornment?: ReactNode;
  children?: ReactNode;
  variant?: 'block' | 'inline';
  size?: 'small' | 'medium' | 'large';
  errorMessage?: ReactNode;
  info?: {
    title: string;
    body: string;
  };
}

export const Field = ({
  label,
  adornment,
  children,
  variant = 'block',
  size = 'medium',
  className,
  errorMessage,
  info,
  ...rest
}: FieldProps) => {
  return (
    <HUIField
      {...rest}
      className={clsx(styles['field'], className)}
      data-variant={variant}
      data-size={size}
    >
      <div className={styles['label-and-children-wrapper']}>
        <div className={styles['label-and-adornment-wrapper']}>
          {label && <Label>{label}</Label>}
          {info && <FieldInfo {...info} />}
          <div className={styles['adornments']}>{adornment}</div>
        </div>
        <div className={styles['input-wrapper']}>
          {children} <WarningIcon className={styles['error-icon']} />
        </div>
      </div>
      {errorMessage && (
        <Description className={styles['error-message']}>
          {errorMessage}
        </Description>
      )}
    </HUIField>
  );
};
