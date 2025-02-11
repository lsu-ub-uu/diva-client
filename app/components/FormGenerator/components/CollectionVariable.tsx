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
  FormComponentCollVar,
  TextStyle,
} from '@/components/FormGenerator/types';
import {
  checkIfComponentHasValue,
  getErrorMessageForField,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { useRemixFormContext } from 'remix-hook-form';
import { type ReactNode, useContext } from 'react';
import styles from './FormComponent.module.css';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { Field } from '@/components/Input/Field';
import { useTranslation } from 'react-i18next';
import { Select } from '@/components/Input/Select';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { InfoIcon } from '@/icons';
import { Button } from '@/components/Button/Button';

interface CollectionVariableProps {
  reactKey: string;
  component: FormComponentCollVar;
  path: string;
  parentPresentationStyle: string | undefined;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
  textStyle?: TextStyle;
}

export const CollectionVariable = ({
  component,
  parentPresentationStyle,
  attributes,
  actionButtonGroup,
  textStyle,
  path,
}: CollectionVariableProps) => {
  const { t } = useTranslation();
  const { showTooltips } = useContext(FormGeneratorContext);
  const { getValues, register, formState } = useRemixFormContext();
  const hasValue = checkIfComponentHasValue(getValues, path);
  const errorMessage = getErrorMessageForField(formState, path);
  if (component.mode === 'output' && !hasValue) {
    return null;
  }

  if (component.mode === 'input') {
    return (
      <Field
        className={styles.component}
        data-colspan={component.gridColSpan ?? 12}
        label={component.showLabel && t(component.label)}
        errorMessage={errorMessage}
        variant={parentPresentationStyle === 'inline' ? 'inline' : 'block'}
        infoTitle={showTooltips && t(component.tooltip.title)}
        infoBody={showTooltips && t(component.tooltip.body)}
        adornment={
          <div>
            {attributes}
            {actionButtonGroup}
          </div>
        }
      >
        <Select {...register(path)} invalid={errorMessage !== undefined}>
          <option value=''>{t('divaClient_optionNoneText')}</option>
          {(component.options ?? []).map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {t(item.label)}
              </option>
            );
          })}
        </Select>
      </Field>
    );
  }

  /*return (
    <div
      key={reactKey}
      className={styles.component}
      id={`anchor_${addAttributesToName(component, component.name)}`}
      data-colspan={component.gridColSpan ?? 12}
    >
      <DevInfo component={component} path={path} />

      <ControlledSelectField
        name={path}
        isLoading={false}
        loadingError={false}
        label={component.label ?? ''}
        showLabel={component.showLabel}
        placeholder={component.placeholder}
        tooltip={showTooltips ? component.tooltip : undefined}
        control={control}
        options={component.options}
        readOnly={!!component.finalValue}
        displayMode={component.mode}
        hasValue={hasValue}
        attributes={attributes}
        actionButtonGroup={actionButtonGroup}
        parentPresentationStyle={parentPresentationStyle}
        textStyle={component.textStyle}
      />
    </div>
  );*/
};
