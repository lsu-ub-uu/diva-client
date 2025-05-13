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

import type {
  FormComponentNumVar,
  FormComponentTextVar,
} from '@/components/FormGenerator/types';
import {
  findOptionLabelByValue,
  getErrorMessageForField,
  isComponentCollVar,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { useRemixFormContext } from 'remix-hook-form';
import { type ReactNode, use } from 'react';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { OutputField } from '@/components/FormGenerator/components/OutputField';
import { useTranslation } from 'react-i18next';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { InputField } from '@/components/FormGenerator/components/InputField';
import { Fieldset } from '@/components/Input/Fieldset';

interface VariableProps {
  component: FormComponentTextVar | FormComponentNumVar;
  path: string;
  parentPresentationStyle: string | undefined;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
}

export const Variable = ({
  component,
  path,
  parentPresentationStyle,
  attributes,
  actionButtonGroup,
}: VariableProps) => {
  const { t } = useTranslation();
  const { getValues, register, control, formState } = useRemixFormContext();
  const { showTooltips } = use(FormGeneratorContext);
  const value = getValues(path);

  const errorMessage = getErrorMessageForField(formState, path);
  if (component.mode === 'output' && !value) {
    return null;
  }

  const label = component.showLabel ? t(component.label) : undefined;

  return (
    <div
      className='form-component-item'
      data-colspan={component.gridColSpan ?? 12}
      id={`anchor_${addAttributesToName(component, component.name)}`}
    >
      <DevInfo component={component} path={path} />

      {(component.mode === 'output' || component.finalValue) && (
        <OutputField
          className='form-component-item'
          data-colspan={component.gridColSpan ?? 12}
          label={label}
          value={getOutputDisplayValue(component, value)}
          textStyle={component.textStyle}
          info={showTooltips ? component.tooltip : undefined}
          variant={parentPresentationStyle === 'inline' ? 'inline' : 'block'}
          adornment={
            <>
              {attributes}
              {actionButtonGroup}
            </>
          }
          path={path}
        />
      )}

      {component.finalValue && <input type='hidden' {...register(path)} />}

      {!component.finalValue && component.mode === 'input' && (
        <Fieldset
          className='form-component-item'
          data-colspan={component.gridColSpan ?? 12}
          label={component.showLabel ? t(component.label) : undefined}
          errorMessage={errorMessage}
          variant={parentPresentationStyle === 'inline' ? 'inline' : 'block'}
          info={showTooltips ? component.tooltip : undefined}
          attributes={attributes}
          actionButtonGroup={actionButtonGroup}
        >
          <InputField
            component={component}
            path={path}
            invalid={errorMessage !== undefined}
            register={register}
            control={control}
          />
        </Fieldset>
      )}
    </div>
  );
};

const getOutputDisplayValue = (
  component: FormComponentTextVar | FormComponentNumVar,
  value: any,
) => {
  if (isComponentCollVar(component)) {
    return findOptionLabelByValue(component.options, value);
  }

  return value ?? component.finalValue;
};
