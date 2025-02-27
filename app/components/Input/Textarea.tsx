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
  Textarea as HUITextarea,
  type TextareaProps as HUITextareaProps,
} from '@headlessui/react';
import styles from './Input.module.css';
import clsx from 'clsx';
import { type Ref } from 'react';

interface TextareaProps extends HUITextareaProps {
  ref?: Ref<HTMLTextAreaElement>;
}

export const Textarea = ({ className, ref, ...rest }: TextareaProps) => {
  return (
    <HUITextarea
      className={clsx(styles['textarea'], className)}
      {...rest}
      ref={ref}
    />
  );
};
