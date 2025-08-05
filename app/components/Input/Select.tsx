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
import { use, type HTMLProps, type ReactNode, type Ref } from 'react';
import { ChevronDownIcon } from '@/icons';
import { FieldContext } from './Fieldset';

interface SelectProps extends HTMLProps<HTMLSelectElement> {
  ref?: Ref<HTMLSelectElement>;
  adornment?: ReactNode;
}

export const Select = ({ className, adornment, ref, ...rest }: SelectProps) => {
  const { ids } = use(FieldContext);
  return (
    <div className={clsx(styles['select-wrapper'], className)}>
      {adornment && (
        <div className={clsx(styles['select-adornment'])}>{adornment}</div>
      )}
      <ChevronDownIcon
        className={styles['select-chevron']}
        aria-hidden='true'
      />
      <select id={ids.input} {...rest} ref={ref} />
    </div>
  );
};
