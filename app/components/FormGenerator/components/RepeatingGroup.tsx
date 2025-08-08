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

import { FieldArrayComponent } from '@/components/FormGenerator/components/FieldArrayComponent';
import { Group } from '@/components/FormGenerator/components/Group';
import type { FormComponentGroup } from '@/components/FormGenerator/types';
import { useRemixFormContext } from 'remix-hook-form';

interface RepeatingGroupProps {
  anchorId?: string;
  currentComponentNamePath: string;
  component: FormComponentGroup;
  parentPresentationStyle: string | undefined;
}

export const RepeatingGroup = ({
  currentComponentNamePath,
  component,
  parentPresentationStyle,
  anchorId,
}: RepeatingGroupProps) => {
  const { control } = useRemixFormContext();
  return (
    <section
      id={anchorId}
      className='form-component-item form-component-container'
      data-colspan={component.gridColSpan ?? 12}
      data-layout='grid'
    >
      <FieldArrayComponent
        control={control}
        component={component}
        name={currentComponentNamePath}
        renderCallback={(arrayPath, actionButtonGroup) => {
          return (
            <Group
              currentComponentNamePath={arrayPath}
              component={component}
              parentPresentationStyle={parentPresentationStyle}
              actionButtonGroup={actionButtonGroup}
            />
          );
        }}
      />
    </section>
  );
};
