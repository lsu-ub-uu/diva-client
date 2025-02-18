/*
 * Copyright 2023 Uppsala University Library
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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { Fragment, type ReactNode } from 'react';
import type { Control } from 'react-hook-form';
import { Controller, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ActionButtonGroup } from './ActionButtonGroup';
import {
  addAttributesToName,
  createDefaultValuesFromComponent,
} from '../defaultValues/defaultValues';
import { isComponentSingularAndOptional } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type { FormComponentWithData } from '@/components/FormGenerator/types';
import styles from './FormComponent.module.css';
import { Button } from '@/components/Button/Button';
import { AddCircleIcon } from '@/icons';

interface FieldArrayComponentProps {
  control?: Control<any>;
  name: string;
  component: FormComponentWithData;
  renderCallback: (path: string, actionButtonGroup: ReactNode) => ReactNode;
}

export const FieldArrayComponent = ({
  control,
  name,
  component,
  renderCallback,
}: FieldArrayComponentProps) => {
  const { t } = useTranslation();
  const { fields, append, move, remove } = useFieldArray({
    control: control,
    name: name,
  });
  const handleAppend = async () => {
    append(createDefaultValuesFromComponent(component, true));
  };

  const handleMove = async (prev: number, next: number) => {
    move(prev, next);
  };

  const handleRemove = async (index: number) => {
    remove(index);
  };

  return (
    <React.Fragment key={`${name}_fac`}>
      <Controller
        control={control}
        name={name}
        render={({ fieldState }) => (
          <>
            {fieldState.error && (
              <span style={{ color: 'red' }}>{fieldState.error?.message}</span>
            )}
          </>
        )}
      />
      {fields.map((field, index) => {
        const actionButtonGroup = component.mode === 'input' && (
          <ActionButtonGroup
            entityName={`${t(component.label ?? '')}`}
            hideMoveButtons={isComponentSingularAndOptional(component)}
            moveUpButtonDisabled={index === 0}
            moveUpButtonAction={() => handleMove(index, index - 1)}
            moveDownButtonDisabled={index === fields.length - 1}
            moveDownButtonAction={() => handleMove(index, index + 1)}
            deleteButtonDisabled={
              fields.length <= (component.repeat?.repeatMin ?? 1)
            }
            deleteButtonAction={() => handleRemove(index)}
            entityType={component.type}
            key={`${field.id}_${index}_f`}
          />
        );

        return (
          <Fragment key={`${field.id}_${index}_a`}>
            {renderCallback(`${name}[${index}]` as const, actionButtonGroup)}
          </Fragment>
        );
      })}

      {component.mode === 'input' &&
        component.label &&
        fields.length < (component.repeat?.repeatMax ?? 1) && (
          <div
            className={styles.component}
            id={`anchor_${addAttributesToName(component, component.name)}`}
          >
            <Button
              variant='tertiary'
              disabled={fields.length >= (component.repeat?.repeatMax ?? 1)}
              onClick={handleAppend}
            >
              <AddCircleIcon /> {t(component.label)}
            </Button>
          </div>
        )}
    </React.Fragment>
  );
};
