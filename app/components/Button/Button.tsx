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

import styles from './Button.module.css';
import clsx from 'clsx';
import {
  type ElementType,
  type HTMLProps,
  type ReactNode,
  type Ref,
} from 'react';

export interface ButtonProps
  extends Omit<HTMLProps<HTMLButtonElement>, 'as' | 'size'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  as?: ElementType;
  to?: string;
  href?: string;
  ref?: Ref<HTMLButtonElement>;
  target?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  error?: boolean;
  children?: ReactNode;
}

export const Button = ({
  variant = 'secondary',
  size = 'medium',
  fullWidth = false,
  className,
  tooltipPosition = 'bottom',
  ref,
  error,
  as,
  ...rest
}: ButtonProps) => {
  const Root = as || 'button';
  return (
    <Root
      className={clsx(styles.button, className)}
      data-variant={variant}
      data-size={size}
      data-tooltip-position={tooltipPosition}
      ref={ref}
      type='button'
      {...(fullWidth ? { 'data-fullwidth': '' } : {})}
      {...(error ? { 'data-error': '' } : {})}
      {...rest}
    />
  );
};
