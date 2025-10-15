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
import { Fragment, use, useState, type ReactNode } from 'react';
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
  renderCallback: (
    path: string,
    actionButtonGroup: ReactNode,
    index: number,
    isAppended: boolean,
  ) => ReactNode;
  anchorId?: string;
}

type RepeatingField = {
  repeatId?: string;
  id: string;
};

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
  const [appended, setAppended] = useState<string | null>(null);

  const { fields, append, move, remove } = useFieldArray({
    control: control,
    name: name,
  });

  const handleAppend = async () => {
    const newComponent = createDefaultValuesFromComponent(component, true);
    setAppended((newComponent as RepeatingField).repeatId ?? null);
    append(newComponent);
  };

  const handleMove = async (prev: number, next: number) => {
    move(prev, next);
  };

  const handleRemove = async (index: number) => {
    remove(index);
  };

  return (
    <>
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
            />
          );

        const repeatId = (field as RepeatingField).repeatId;

        return (
          <Fragment key={repeatId ?? field.id}>
            {renderCallback(
              `${name}[${index}]` as const,
              actionButtonGroup,
              index,
              appended === repeatId,
            )}
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
              tooltipPosition='top'
            >
              <AddCircleIcon /> {t(component.label)}
            </Button>
          </div>
        )}
    </>
  );
};
