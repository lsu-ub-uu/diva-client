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
import { checkIfSingularComponentHasValue } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { FieldArrayComponent } from '@/components/FormGenerator/components/FieldArrayComponent';
import { LeafComponent } from '@/components/FormGenerator/components/LeafComponent';
import { Attributes } from '@/components/FormGenerator/components/Attributes';
import { type ReactNode, use } from 'react';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { useRemixFormContext } from 'remix-hook-form';

interface RepeatingVariableProps {
  reactKey: string;
  component: FormComponentWithData;
  currentComponentNamePath: string;
  parentPresentationStyle: string | undefined;
}

export const RepeatingVariable = ({
  reactKey,
  component,
  currentComponentNamePath,
  parentPresentationStyle,
}: RepeatingVariableProps) => {
  const { control, getValues } = useRemixFormContext();
  const { linkedData } = use(FormGeneratorContext);

  const hasLinkedDataValue = checkIfSingularComponentHasValue(
    getValues,
    currentComponentNamePath,
  );

  if (!hasLinkedDataValue && linkedData) {
    return null;
  }

  return (
    <FieldArrayComponent
      key={reactKey}
      control={control}
      component={component}
      name={currentComponentNamePath}
      renderCallback={(
        variableArrayPath: string,
        actionButtonGroup: ReactNode,
      ) => {
        return (
          <LeafComponent
            component={component}
            reactKey={variableArrayPath}
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
