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
  Button as HUIButton,
  type ButtonProps as HUIButtonProps,
} from '@headlessui/react';

import styles from './Button.module.css';
import clsx from 'clsx';
import { type ElementType, type Ref } from 'react';

interface ButtonProps extends Omit<HUIButtonProps, 'as'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  as?: ElementType;
  to?: string;
  href?: string;
  ref?: Ref<HTMLButtonElement>;
}

export const Button = ({
  variant = 'secondary',
  size = 'medium',
  fullWidth = false,
  className,
  ref,
  ...rest
}: ButtonProps) => {
  return (
    <HUIButton
      className={clsx(styles.button, className)}
      data-variant={variant}
      data-size={size}
      ref={ref}
      {...(fullWidth ? { 'data-fullwidth': '' } : {})}
      {...rest}
    />
  );
};
