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

import {
  Component,
  getCurrentComponentNamePath,
} from '@/components/FormGenerator/Component';
import type {
  FormComponent,
  FormComponentGroup,
  FormComponentLeaf,
} from '@/components/FormGenerator/types';
import { addAttributesToName } from './defaultValues/defaultValues';
import {
  isComponentGroup,
  isComponentOptional,
  isComponentRepeating,
  isComponentSingularAndOptional,
  isComponentVariable,
  isComponentWithData,
} from './formGeneratorUtils/formGeneratorUtils';
import { RepeatingGroup } from './components/RepeatingGroup';
import { RepeatingVariable } from './components/RepeatingVariable';
import { OptionalGroup } from './components/OptionalGroup';
import { RepeatingComponent } from './components/RepeatingComponent';

interface FormComponentListGeneratorProps {
  components: FormComponent[];
  parentPresentationStyle?: string;
  path?: string;
  isRoot?: boolean;
}

export const ComponentList = ({
  components,
  parentPresentationStyle,
  path = '',
  isRoot = false,
}: FormComponentListGeneratorProps) => {
  return components.map((component) => {
    const componentPath = getCurrentComponentNamePath(component, path);
    const key = `${componentPath}.${component.presentationId}`;

    if (
      isComponentWithData(component) &&
      (isComponentRepeating(component) ||
        isComponentSingularAndOptional(component))
    ) {
      return (
        <RepeatingComponent
          key={key}
          currentComponentNamePath={componentPath}
          component={component}
          parentPresentationStyle={parentPresentationStyle}
          anchorId={
            isRoot
              ? `anchor_${addAttributesToName(component, component.name)}`
              : undefined
          }
        />
      );
    }
    return (
      <Component
        key={key}
        component={component}
        path={path}
        parentPresentationStyle={parentPresentationStyle}
        anchorId={
          isRoot
            ? `anchor_${addAttributesToName(component, component.name)}`
            : undefined
        }
      />
    );
  });
};

const isComponentGroupAndRepeating = (
  component: FormComponent,
): component is FormComponentGroup => {
  return (
    isComponentGroup(component) &&
    (isComponentRepeating(component) || isComponentOptional(component))
  );
};

const isComponentVariableAndRepeating = (
  component: FormComponent,
): component is FormComponentLeaf => {
  return (
    isComponentVariable(component) &&
    (isComponentRepeating(component) || isComponentOptional(component))
  );
};
