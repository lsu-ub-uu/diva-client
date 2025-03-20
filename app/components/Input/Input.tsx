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
  Input as HUIInput,
  type InputProps as HUIInputProps,
} from '@headlessui/react';
import styles from './Input.module.css';
import clsx from 'clsx';
import { type Ref } from 'react';

interface InputProps extends HUIInputProps {
  ref?: Ref<HTMLInputElement>;
}

export const Input = ({ className, ref, ...rest }: InputProps) => {
  return (
    <HUIInput
      className={clsx(styles['input'], className)}
      ref={ref}
      {...rest}
    />
  );
};
