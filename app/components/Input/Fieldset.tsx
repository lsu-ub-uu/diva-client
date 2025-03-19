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

import { createContext, type HTMLProps, type ReactNode, useId } from 'react';
import { Description, Field, Label } from '@headlessui/react';
import styles from './Fieldset.module.css';
import { FieldInfo } from '@/components/FieldInfo/FieldInfo';
import { WarningIcon } from '@/icons';
import clsx from 'clsx';

interface FieldsetProps {
  className?: string;
  label?: string;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
  errorMessage?: ReactNode;
  children?: ReactNode;
  info?: {
    title: string;
    body: string;
  };
  variant?: 'block' | 'inline';
  size?: 'small' | 'medium' | 'large';
}

export const Fieldset = ({
  className,
  label,
  attributes,
  actionButtonGroup,
  info,
  children,
  errorMessage,
  variant,
  size,
}: FieldsetProps) => {
  const id = useId();

  const ids = {
    label: `${id}-label`,
    details: `${id}-details`,
  };

  return (
    <FieldContext value={{ ids }}>
      <Field>
        <FieldsetRoot
          label={label}
          hasAttributes={attributes !== undefined}
          className={clsx(styles['fieldset'], className)}
          data-variant={variant}
          data-size={size}
        >
          <div className={styles['label']}>
            {label && <Label id={ids.label}>{label}</Label>}
            {info && <FieldInfo {...info} />}
          </div>
          <div className={styles['attributes']}>{attributes}</div>
          <div className={styles['action-buttons']}>{actionButtonGroup}</div>
          <div className={styles['input']}>
            {children}
            <WarningIcon className={styles['error-icon']} aria-hidden='true' />
          </div>
          {errorMessage && (
            <Description className={styles['error-message']}>
              {errorMessage}
            </Description>
          )}
        </FieldsetRoot>
      </Field>
    </FieldContext>
  );
};

export const FieldContext = createContext({ ids: { label: '', details: '' } });

interface FieldsetRootProps extends HTMLProps<HTMLDivElement> {
  hasAttributes: boolean;
  label?: string;
  children?: ReactNode;
}

const FieldsetRoot = ({
  hasAttributes,
  children,
  label,
  ...rest
}: FieldsetRootProps) => {
  if (hasAttributes) {
    return (
      <fieldset {...rest}>
        <legend>{label}</legend>
        {children}
      </fieldset>
    );
  }
  return (
    <div role='group' aria-label={label} {...rest}>
      {children}
    </div>
  );
};
