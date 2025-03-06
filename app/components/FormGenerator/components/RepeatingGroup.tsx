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

import type { FormComponentGroup } from '@/components/FormGenerator/types';
import { FieldArrayComponent } from '@/components/FormGenerator/components/FieldArrayComponent';
import { useRemixFormContext } from 'remix-hook-form';
import { Group } from '@/components/FormGenerator/components/Group';

interface RepeatingGroupProps {
  currentComponentNamePath: string;
  component: FormComponentGroup;
  parentPresentationStyle: string | undefined;
}

export const RepeatingGroup = ({
  currentComponentNamePath,
  component,
  parentPresentationStyle,
}: RepeatingGroupProps) => {
  return (
    <FieldArrayComponent
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
  );
};
