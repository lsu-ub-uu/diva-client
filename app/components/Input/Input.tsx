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

import styles from './Input.module.css';
import clsx from 'clsx';
import { use, type HTMLProps, type Ref } from 'react';
import { FieldContext } from './Fieldset';

interface InputProps extends HTMLProps<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
}

export const Input = ({ className, ref, ...rest }: InputProps) => {
  const { ids } = use(FieldContext);
  return (
    <input
      id={ids.input}
      className={clsx(styles['input'], className)}
      ref={ref}
      {...rest}
    />
  );
};
