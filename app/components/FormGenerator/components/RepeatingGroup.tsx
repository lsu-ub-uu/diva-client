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
  reactKey: string;
  component: FormComponentGroup;
  parentPresentationStyle: string | undefined;
  childWithNameInDataArray: string[];
}

export const RepeatingGroup = ({
  currentComponentNamePath,
  reactKey,
  component,
  parentPresentationStyle,
  childWithNameInDataArray,
}: RepeatingGroupProps) => {
  const { control } = useRemixFormContext();
  return (
    <FieldArrayComponent
      key={reactKey}
      control={control}
      component={component}
      name={currentComponentNamePath}
      renderCallback={(arrayPath, actionButtonGroup) => {
        return (
          <Group
            currentComponentNamePath={arrayPath}
            component={component}
            parentPresentationStyle={parentPresentationStyle}
            childWithNameInDataArray={childWithNameInDataArray}
            actionButtonGroup={actionButtonGroup}
          />
        );
      }}
    />
  );
};
