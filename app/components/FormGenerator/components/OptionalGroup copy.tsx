/*
 * Copyright 2024 Uppsala University Library
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

import { Group } from '@/components/FormGenerator/components/Group';
import type { FormComponentGroup } from '@/components/FormGenerator/types';
import { useRemixFormContext } from 'remix-hook-form';
import { OptionalComponent } from './OptionalComponent';

interface OptionalGroupProps {
  anchorId: string | undefined;
  currentComponentNamePath: string;
  component: FormComponentGroup;
  parentPresentationStyle: string | undefined;
}

export const OptionalGroup = ({
  anchorId,
  currentComponentNamePath,
  component,
  parentPresentationStyle,
}: OptionalGroupProps) => {
  const { control } = useRemixFormContext();

  const optionalComponent = (
    <OptionalComponent
      anchorId={anchorId}
      control={control}
      component={component}
      name={currentComponentNamePath}
      renderCallback={(actionButtonGroup) => {
        return (
          <Group
            currentComponentNamePath={currentComponentNamePath}
            component={component}
            parentPresentationStyle={parentPresentationStyle}
            actionButtonGroup={actionButtonGroup}
            anchorId={anchorId}
          />
        );
      }}
    />
  );

  if (component.mode === 'output') {
    return optionalComponent;
  }

  return (
    <section
      id={anchorId}
      className='form-component-item'
      data-colspan={component.gridColSpan ?? 12}
    >
      {optionalComponent}
    </section>
  );
};
