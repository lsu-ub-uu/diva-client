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

import styles from './FloatingActionButton.module.css';
import type { ElementType, HTMLProps, ReactNode } from 'react';

interface FloatingActionButtonProps
  extends Omit<HTMLProps<HTMLButtonElement>, 'as'> {
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
  as,
  ...rest
}: FloatingActionButtonProps) => {
  const Root = as || 'button';
  return (
    <Root
      className={styles['floating-action-button']}
      data-variant={variant}
      {...rest}
    >
      {icon} <span className={styles['content']}>{text}</span>
    </Root>
  );
};
