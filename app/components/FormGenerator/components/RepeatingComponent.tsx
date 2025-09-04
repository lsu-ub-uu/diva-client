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
import type {
  FormComponent,
  FormComponentWithData,
} from '@/components/FormGenerator/types';
import { useRemixFormContext } from 'remix-hook-form';
import { Component } from '../Component';
import { isComponentSingularAndOptional } from '../formGeneratorUtils/formGeneratorUtils';
import { OptionalComponent } from './OptionalComponent';

interface RepeatingComponentProps {
  anchorId?: string;
  currentComponentNamePath: string;
  component: FormComponentWithData;
  parentPresentationStyle: string | undefined;
}

export const RepeatingComponent = ({
  currentComponentNamePath,
  component,
  parentPresentationStyle,
  anchorId,
}: RepeatingComponentProps) => {
  const { control } = useRemixFormContext();

  const fieldArrray = isComponentSingularAndOptional(component) ? (
    <OptionalComponent
      anchorId={anchorId}
      control={control}
      component={component}
      name={currentComponentNamePath}
      renderCallback={(actionButtonGroup) => {
        return (
          <Component
            path={currentComponentNamePath}
            component={component}
            parentPresentationStyle={parentPresentationStyle}
            actionButtonGroup={actionButtonGroup}
          />
        );
      }}
    />
  ) : (
    <FieldArrayComponent
      control={control}
      component={component}
      name={currentComponentNamePath}
      renderCallback={(arrayPath, actionButtonGroup) => {
        return (
          <Component
            path={arrayPath}
            component={component}
            parentPresentationStyle={parentPresentationStyle}
            actionButtonGroup={actionButtonGroup}
          />
        );
      }}
    />
  );

  if (component.mode === 'output') {
    return fieldArrray;
  }

  return (
    <section
      id={anchorId}
      className='form-component-item form-component-container'
      data-colspan={component.gridColSpan ?? 12}
      data-layout='grid'
    >
      {fieldArrray}
    </section>
  );
};
