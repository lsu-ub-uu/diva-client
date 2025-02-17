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
  TextStyle,
} from '@/components/FormGenerator/types';
import { getErrorMessageForField } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { useRemixFormContext } from 'remix-hook-form';
import { type ReactNode, useContext } from 'react';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import styles from './FormComponent.module.css';
import { OutputField } from '@/components/FormGenerator/components/OutputField';
import { useTranslation } from 'react-i18next';
import { Field } from '@/components/Input/Field';
import { Input } from '@/components/Input/Input';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import { Textarea } from '@/components/Input/Textarea';

interface TextOrNumberVariableProps {
  reactKey: string;
  component: FormComponentTextVar | FormComponentNumVar;
  path: string;
  parentPresentationStyle: string | undefined;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
  textStyle?: TextStyle;
}

export const TextOrNumberVariable = ({
  component,
  path,
  parentPresentationStyle,
  attributes,
  actionButtonGroup,
  textStyle,
}: TextOrNumberVariableProps) => {
  const { t } = useTranslation();
  const { getValues, register, formState } = useRemixFormContext();
  const { linkedData, showTooltips } = useContext(FormGeneratorContext);
  const value = getValues(path);

  const errorMessage = getErrorMessageForField(formState, path);
  if (component.mode === 'output' && !value) {
    return null;
  }

  const label = component.showLabel ? t(component.label) : undefined;

  return (
    <div
      className={styles.component}
      data-colspan={component.gridColSpan ?? 12}
    >
      <DevInfo component={component} path={path} />

      {(component.mode === 'output' || component.finalValue) && (
        <OutputField
          className={styles.component}
          data-colspan={component.gridColSpan ?? 12}
          label={label}
          value={value ?? component.finalValue}
          textStyle={textStyle}
          info={
            (showTooltips || undefined) &&
            component.tooltip && {
              title: t(component.tooltip.title),
              body: t(component.tooltip.body),
            }
          }
          adornment={
            <>
              {attributes}
              {actionButtonGroup}
            </>
          }
        />
      )}

      {component.finalValue && <input type='hidden' {...register(path)} />}

      {!component.finalValue && component.mode === 'input' && (
        <Field
          className={styles.component}
          data-colspan={component.gridColSpan ?? 12}
          label={component.showLabel && t(component.label)}
          errorMessage={errorMessage}
          variant={parentPresentationStyle === 'inline' ? 'inline' : 'block'}
          info={
            (showTooltips || undefined) &&
            component.tooltip && {
              title: t(component.tooltip.title),
              body: t(component.tooltip.body),
            }
          }
          adornment={
            <>
              {attributes}
              {actionButtonGroup}
            </>
          }
        >
          {'inputType' in component && component.inputType === 'textarea' ? (
            <Textarea
              {...register(path)}
              invalid={errorMessage !== undefined}
              placeholder={component.placeholder}
              readOnly={!!component.finalValue}
            />
          ) : (
            <Input
              {...register(path)}
              type={
                'inputFormat' in component
                  ? (component.inputFormat ?? 'password')
                  : 'text'
              }
              invalid={errorMessage !== undefined}
              placeholder={component.placeholder}
              readOnly={!!component.finalValue}
            />
          )}
        </Field>
      )}
    </div>
  );
};
