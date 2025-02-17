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
  Combobox as HUICombobox,
  ComboboxOption as HUIComboboxOption,
  type ComboboxOptionProps as HUIComboboxOptionProps,
  ComboboxOptions as HUIComboboxOptions,
  type ComboboxOptionsProps as HUIComboboxOptionsProps,
} from '@headlessui/react';
import clsx from 'clsx';
import styles from './Combobox.module.css';

export const Combobox = HUICombobox;

export const ComboboxOptions = ({
  className,
  ...rest
}: HUIComboboxOptionsProps) => {
  return (
    <HUIComboboxOptions
      className={clsx(styles.comboboxOptions, className)}
      {...rest}
    />
  );
};

export const ComboboxOption = ({
  className,
  ...rest
}: HUIComboboxOptionProps) => {
  return (
    <HUIComboboxOption
      className={clsx(styles.comboboxOption, className)}
      {...rest}
    />
  );
};
