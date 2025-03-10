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

import type { FormComponentWithData } from '@/components/FormGenerator/types';
import { FieldArrayComponent } from '@/components/FormGenerator/components/FieldArrayComponent';
import { LeafComponent } from '@/components/FormGenerator/components/LeafComponent';
import { Attributes } from '@/components/FormGenerator/components/Attributes';
import { type ReactNode, use } from 'react';
import { Group } from '@/components/FormGenerator/components/Group';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { get } from 'lodash-es';

interface RepeatingVariableProps {
  component: FormComponentWithData;
  currentComponentNamePath: string;
  parentPresentationStyle: string | undefined;
}

export const RepeatingVariable = ({
  component,
  currentComponentNamePath,
  parentPresentationStyle,
}: RepeatingVariableProps) => {
  const { data } = use(FormGeneratorContext);
  const defaultValue = get(data, currentComponentNamePath);

  if (
    component.mode === 'output' &&
    defaultValue !== undefined &&
    Array.isArray(defaultValue)
  ) {
    return defaultValue.map((_field, index) => {
      const variableArrayPath = `${currentComponentNamePath}[${index}]`;
      return (
        <LeafComponent
          key={index}
          name={`${variableArrayPath}.value`}
          component={component}
          parentPresentationStyle={parentPresentationStyle}
          attributes={
            <Attributes component={component} path={variableArrayPath} />
          }
        />
      );
    });
  }

  return (
    <FieldArrayComponent
      component={component}
      name={currentComponentNamePath}
      renderCallback={(
        variableArrayPath: string,
        actionButtonGroup: ReactNode,
      ) => {
        return (
          <LeafComponent
            component={component}
            name={`${variableArrayPath}.value`}
            parentPresentationStyle={parentPresentationStyle}
            attributes={
              <Attributes component={component} path={variableArrayPath} />
            }
            actionButtonGroup={actionButtonGroup}
          />
        );
      }}
    />
  );
};
