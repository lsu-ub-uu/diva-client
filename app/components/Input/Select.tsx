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
  Select as HUISelect,
  type SelectProps as HUISelectProps,
} from '@headlessui/react';
import styles from './Input.module.css';
import chevronUrl from '@/icons/ChevronDown.svg';
import clsx from 'clsx';
import { type ForwardedRef, forwardRef } from 'react';

type SelectProps = HUISelectProps;

export const Select = forwardRef(function Select(
  { className, ...rest }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  return (
    <HUISelect
      className={clsx(styles.select, className)}
      {...rest}
      style={{ backgroundImage: `url(${chevronUrl})` }}
      ref={ref}
    />
  );
});
