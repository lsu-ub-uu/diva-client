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

import type { FormComponent } from '@/components/FormGenerator/types';
import { Component } from '@/components/FormGenerator/Component';
import { useValueFromData } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { pickBy } from 'lodash-es';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';

interface FormComponentListGeneratorProps {
  components: FormComponent[];
  parentPresentationStyle?: string;
  path?: string;
}

export const ComponentList = ({
  components,
  parentPresentationStyle,
  path = '',
}: FormComponentListGeneratorProps) => {
  const data = useValueFromData<Record<string, any>>(path);

  const hiddenData = data && getHiddenData(data, components, path);

  return (
    <>
      {hiddenData &&
        Object.entries(hiddenData).map(([key, value]) => (
          <>
            <DevInfo
              component={
                { type: 'hiddenData', name: key } as unknown as FormComponent
              }
              path={key}
            />
            <input type='hidden' name={key} value={value} key={key} />
          </>
        ))}
      {components.map((component, i) => (
        <Component
          key={i}
          component={component}
          path={path}
          parentPresentationStyle={parentPresentationStyle}
        />
      ))}
    </>
  );
};

const isAttribute = (key: string) => key.startsWith('_');

const getHiddenData = (
  data: Record<string, any>,
  components: FormComponent[],
  path: string | undefined,
) => {
  return flatten(
    pickBy(
      data,
      (_value, key) =>
        !isAttribute(key) &&
        !components.find((c) => addAttributesToName(c, c.name).startsWith(key)),
    ),
    path,
  );
};

const flatten = (inputValue: any, initialPath: string = '') => {
  const result: Record<string, string> = {};

  const processValue = (currentValue: any, currentPath: string) => {
    if (Array.isArray(currentValue)) {
      currentValue.forEach((item, index) => {
        processValue(item, `${currentPath}[${index}]`);
      });
    } else if (typeof currentValue === 'object' && currentValue !== null) {
      Object.entries(currentValue).forEach(([key, value]) => {
        processValue(value, `${currentPath}.${key}`);
      });
    } else {
      result[currentPath] = currentValue;
    }
  };

  processValue(inputValue, initialPath);

  return result;
};
