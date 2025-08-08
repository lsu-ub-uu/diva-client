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

import { Button } from '@/components/Button/Button';
import { isComponentSingularAndOptional } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type { FormComponentWithData } from '@/components/FormGenerator/types';
import { AddCircleIcon } from '@/icons';
import React, { Fragment, use, type ReactNode } from 'react';
import type { Control } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { createDefaultValuesFromComponent } from '../defaultValues/defaultValues';
import { FormGeneratorContext } from '../FormGeneratorContext';
import { ActionButtonGroup } from './ActionButtonGroup';

interface FieldArrayComponentProps {
  control?: Control<any>;
  name: string;
  component: FormComponentWithData;
  renderCallback: (path: string, actionButtonGroup: ReactNode) => ReactNode;
  anchorId?: string;
}

export const FieldArrayComponent = ({
  control,
  name,
  component,
  renderCallback,
  anchorId,
}: FieldArrayComponentProps) => {
  const { t } = useTranslation();
  const { enhancedFields } = use(FormGeneratorContext);
  const notRemovableEnhancement =
    enhancedFields?.[name]?.type === 'notRemovable';

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
      {fields.map((field, index) => {
        const actionButtonGroup = component.mode === 'input' &&
          !notRemovableEnhancement && (
            <ActionButtonGroup
              entityName={`${t(component.label ?? '')}`}
              hideMoveButtons={isComponentSingularAndOptional(component)}
              hideDeleteButton={
                isComponentSingularAndOptional(component) &&
                !component.showLabel
              }
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
            className='form-component-item'
            data-colspan={component.gridColSpan ?? 12}
          >
            <Button
              id={fields.length === 0 ? anchorId : undefined}
              variant='tertiary'
              disabled={fields.length >= (component.repeat?.repeatMax ?? 1)}
              onClick={handleAppend}
              aria-label={t('divaClient_addFieldText', {
                fieldName: t(component.label),
              })}
            >
              <AddCircleIcon /> {t(component.label)}
            </Button>
          </div>
        )}
    </React.Fragment>
  );
};
