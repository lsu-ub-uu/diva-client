/*
 * Copyright 2023 Uppsala University Library
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
import type { ReactNode } from 'react';
import type {
  Control,
  FieldValues,
  FormState,
  UseFormGetValues,
  UseFormReturn,
} from 'react-hook-form';
import { RemixFormProvider } from 'remix-hook-form';
import { vi } from 'vitest';
import { mock } from 'vitest-mock-extended';

export * from '@testing-library/react';

export const MockFormProvider = ({
  children,
  overrides = {},
  mockValues = {},
}: {
  children: ReactNode;
  overrides?: Partial<UseFormReturn<FieldValues>>;
  mockValues?: Record<string, any>;
}) => {
  const getValuesMock = (key: string) => mockValues[key];
  return (
    <RemixFormProvider
      {...overrides}
      handleSubmit={vi.fn()}
      register={vi.fn()}
      reset={vi.fn()}
      watch={vi.fn()}
      getValues={getValuesMock as UseFormGetValues<FieldValues>}
      getFieldState={vi.fn()}
      setError={vi.fn()}
      clearErrors={vi.fn()}
      setValue={vi.fn()}
      trigger={vi.fn()}
      formState={mock<FormState<FieldValues>>()}
      resetField={vi.fn()}
      unregister={vi.fn()}
      control={mock<Control>()}
      setFocus={vi.fn()}
      subscribe={vi.fn()}
      {...overrides}
    >
      {children}
    </RemixFormProvider>
  );
};
