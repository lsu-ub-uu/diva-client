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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import {
  Button as HUIButton,
  type ButtonProps as HUIButtonProps,
} from '@headlessui/react';
import styles from './FloatingActionButton.module.css';
import type { ElementType, ReactNode } from 'react';

interface FloatingActionButtonProps extends Omit<HUIButtonProps, 'as'> {
  variant?: 'primary' | 'secondary';
  text: string;
  icon: ReactNode;
  as?: ElementType;
  to?: string;
  href?: string;
}

export const FloatingActionButton = ({
  variant = 'secondary',
  icon,
  text,
  ...rest
}: FloatingActionButtonProps) => {
  return (
    <HUIButton
      className={styles['floating-action-button']}
      data-variant={variant}
      {...rest}
    >
      {icon} <span className={styles['content']}>{text}</span>
    </HUIButton>
  );
};
