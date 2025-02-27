/*
 * Copyright 2025 Uppsala University Library
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
  FormComponentContainer,
  FormComponentGroup,
} from '@/components/FormGenerator/types';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import {
  checkIfPresentationStyleIsInline,
  getGroupLevel,
  headlineLevelToTypographyVariant,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { type ReactNode, use } from 'react';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { Card } from '@/components/Card/Card';
import { CardHeader } from '@/components/Card/CardHeader';
import { CardTitle } from '@/components/Card/CardTitle';
import { Typography } from '@/components/Typography/Typography';
import { Attributes } from '@/components/FormGenerator/components/Attributes';
import { ComponentList } from '@/components/FormGenerator/ComponentList';
import { useRemixFormContext } from 'remix-hook-form';
import { cleanFormData, hasOnlyAttributes } from '@/utils/cleanFormData';
import { CardContent } from '@/components/Card/CardContent';
import styles from './FormComponent.module.css';
import { FieldInfo } from '@/components/FieldInfo/FieldInfo';

interface GroupProps {
  currentComponentNamePath: string;
  component: FormComponentContainer | FormComponentGroup;
  parentPresentationStyle: string | undefined;
  actionButtonGroup?: ReactNode;
}

export const Group = ({
  currentComponentNamePath,
  component,
  parentPresentationStyle,
  actionButtonGroup,
}: GroupProps) => {
  const { boxGroups, showTooltips } = use(FormGeneratorContext);
  const { getValues } = useRemixFormContext();

  const groupLevel = getGroupLevel(currentComponentNamePath);
  const inline = checkIfPresentationStyleIsInline(component);

  // TODO: Check for valuable data instead
  const hasNoValues = hasOnlyAttributes(
    cleanFormData(getValues(currentComponentNamePath)),
  );

  if (component.mode === 'output' && hasNoValues) {
    return null;
  }
  return (
    <div
      className={`${styles['component']} anchorLink`}
      data-colspan={component.gridColSpan ?? 12}
      id={`anchor_${addAttributesToName(component, component.name)}`}
    >
      <DevInfo component={component} path={currentComponentNamePath} />
      <Card boxed={boxGroups && groupLevel !== 0}>
        <CardHeader>
          {component.showLabel && (
            <CardTitle>
              <Typography
                text={component?.label ?? ''}
                variant={headlineLevelToTypographyVariant(
                  component.headlineLevel,
                )}
              />
              {component.tooltip && showTooltips && (
                <FieldInfo {...component.tooltip} />
              )}
            </CardTitle>
          )}
          <Attributes component={component} path={currentComponentNamePath} />

          {actionButtonGroup}
        </CardHeader>
        <CardContent>
          <div
            className={styles['container']}
            data-layout={inline ? 'inline' : 'grid'}
          >
            {component.components && (
              <ComponentList
                components={component.components}
                parentPresentationStyle={
                  component.presentationStyle ?? parentPresentationStyle
                }
                path={currentComponentNamePath}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
