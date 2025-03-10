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

import { Fragment, type ReactNode, use, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionButtonGroup } from './ActionButtonGroup';
import { addAttributesToName } from '../defaultValues/defaultValues';
import { isComponentSingularAndOptional } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type { FormComponentWithData } from '@/components/FormGenerator/types';
import styles from './FormComponent.module.css';
import { Button } from '@/components/Button/Button';
import { AddCircleIcon } from '@/icons';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { get } from 'lodash-es';

interface FieldArrayComponentProps {
  name: string;
  component: FormComponentWithData;
  renderCallback: (path: string, actionButtonGroup: ReactNode) => ReactNode;
}

export const FieldArrayComponent = ({
  name,
  component,
  renderCallback,
}: FieldArrayComponentProps) => {
  const { t } = useTranslation();
  const { data, onFormChange } = use(FormGeneratorContext);
  const defaultValue = get(data, name);
  const minToShow =
    defaultValue?.length ?? component.repeat?.minNumberOfRepeatingToShow;
  const [fields, setFields] = useState<string[]>(
    minToShow
      ? Array.from({ length: minToShow }, () => crypto.randomUUID())
      : [],
  );

  useEffect(() => {
    onFormChange?.();
  }, [onFormChange, fields]);

  const append = () => {
    const id = crypto.randomUUID();
    setFields([...fields, id]);
  };

  const move = (prevIndex: number, newIndex: number) => {
    const newFields = [...fields];
    const [movedItem] = newFields.splice(prevIndex, 1);
    newFields.splice(newIndex, 0, movedItem);
    setFields(newFields);
  };

  const remove = (indexToRemove: number) => {
    setFields(fields.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      {fields.map((field, index) => {
        const actionButtonGroup = component.mode === 'input' && (
          <ActionButtonGroup
            entityName={`${t(component.label ?? '')}`}
            hideMoveButtons={isComponentSingularAndOptional(component)}
            moveUpButtonDisabled={index === 0}
            moveUpButtonAction={() => move(index, index - 1)}
            moveDownButtonDisabled={index === fields.length - 1}
            moveDownButtonAction={() => move(index, index + 1)}
            deleteButtonDisabled={
              fields.length <= (component.repeat?.repeatMin ?? 1)
            }
            deleteButtonAction={() => remove(index)}
            entityType={component.type}
          />
        );

        return (
          <Fragment key={field}>
            {renderCallback(`${name}[${index}]` as const, actionButtonGroup)}
          </Fragment>
        );
      })}
      {component.mode === 'input' &&
        component.label &&
        fields.length < (component.repeat?.repeatMax ?? 1) && (
          <div
            className={styles['component']}
            id={`anchor_${addAttributesToName(component, component.name)}`}
          >
            <Button
              variant='tertiary'
              disabled={fields.length >= (component.repeat?.repeatMax ?? 1)}
              onClick={append}
            >
              <AddCircleIcon /> {t(component.label)}
            </Button>
          </div>
        )}
    </>
  );
};
