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

import type { FormComponentHidden } from '@/components/FormGenerator/types';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';

interface HiddenInputProps {
  name: string;
  component: FormComponentHidden;
}

export const HiddenInput = ({ name, component }: HiddenInputProps) => {
  const finalValue = component.finalValue;

  return (
    <>
      <DevInfo component={component} path={name} />

      <input
        type='hidden'
        data-testid={`${name}-hidden-input`}
        name={name}
        value={finalValue}
      />
    </>
  );
};
