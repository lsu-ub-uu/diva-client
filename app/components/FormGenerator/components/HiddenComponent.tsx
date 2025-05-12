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

import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import type { FormComponentHidden } from '@/components/FormGenerator/types';
import { HiddenInput } from './HiddenInput';
import type { ReactNode } from 'react';

interface HiddenComponentProps {
  name: string;
  component: FormComponentHidden;
  attributes?: ReactNode;
}

export const HiddenComponent = ({
  name,
  component,
  attributes,
}: HiddenComponentProps) => {
  const finalValue = component.finalValue;

  return (
    <>
      <DevInfo component={component} path={name} />

      <HiddenInput name={name} value={finalValue} />
      {attributes}
    </>
  );
};
