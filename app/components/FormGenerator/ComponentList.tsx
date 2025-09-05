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
import type { FormComponent } from '@/components/FormGenerator/types';
import { RepeatingComponent } from './components/RepeatingComponent';
import { addAttributesToName } from './defaultValues/defaultValues';
import {
  isComponentRepeating,
  isComponentSingularAndOptional,
  isComponentWithData,
} from './formGeneratorUtils/formGeneratorUtils';

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
          parentPath={path}
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
        parentPath={path}
        currentComponentNamePath={componentPath}
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
