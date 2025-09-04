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

import { Card } from '@/components/Card/Card';
import { CardContent } from '@/components/Card/CardContent';
import { CardExpandButton } from '@/components/Card/CardExpandButton';
import { CardHeader } from '@/components/Card/CardHeader';
import { CardTitle } from '@/components/Card/CardTitle';
import { FieldInfo } from '@/components/FieldInfo/FieldInfo';
import { ComponentList } from '@/components/FormGenerator/ComponentList';
import { Attributes } from '@/components/FormGenerator/components/Attributes';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import {
  checkIfPresentationStyleIsInline,
  getGroupLevel,
  headlineLevelToTypographyVariant,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type { FormComponentGroup } from '@/components/FormGenerator/types';
import { Typography } from '@/components/Typography/Typography';
import { cleanFormData, hasOnlyAttributes } from '@/utils/cleanFormData';
import { type ReactNode, use } from 'react';
import { useTranslation } from 'react-i18next';
import { useRemixFormContext } from 'remix-hook-form';

interface GroupProps {
  currentComponentNamePath: string;
  component: FormComponentGroup;
  parentPresentationStyle?: string;
  actionButtonGroup?: ReactNode;
  anchorId?: string;
  expanded?: boolean | 'bothEqual';
  onExpandButtonClick?: () => void;
  childrenHidden?: boolean;
}

export const Group = ({
  currentComponentNamePath,
  component,
  parentPresentationStyle,
  actionButtonGroup,
  anchorId,
  expanded,
  onExpandButtonClick,
  childrenHidden,
}: GroupProps) => {
  const { t } = useTranslation();
  const { boxGroups, showTooltips } = use(FormGeneratorContext);
  const { enhancedFields } = use(FormGeneratorContext);
  const enhancement =
    enhancedFields && enhancedFields[currentComponentNamePath];
  const expandable =
    onExpandButtonClick !== undefined && expanded !== undefined;
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

  const showCardTitle = component.title !== undefined || component.showLabel;

  return (
    <div
      id={anchorId}
      className='form-component-item anchorLink'
      data-colspan={component.gridColSpan ?? 12}
    >
      <DevInfo component={component} path={currentComponentNamePath} />
      <Card
        boxed={boxGroups && groupLevel !== 0 && showCardTitle}
        label={!showCardTitle ? component.label : undefined}
      >
        <CardHeader
          enhancedFields={
            enhancement?.type === 'group' && enhancement?.alert === true
          }
          attributes={
            <Attributes component={component} path={currentComponentNamePath} />
          }
          actionButtonGroup={actionButtonGroup}
        >
          {showCardTitle && (
            <CardTitle
              level={component.headlineLevel}
              info={
                component.tooltip &&
                showTooltips && <FieldInfo {...component.tooltip} />
              }
            >
              {expandable ? (
                <CardExpandButton
                  expanded={expanded}
                  onClick={onExpandButtonClick}
                >
                  {t(component.title ?? component?.label)}
                </CardExpandButton>
              ) : (
                t(component?.label)
              )}
            </CardTitle>
          )}
        </CardHeader>
        <CardContent
          hidden={childrenHidden}
          enhancedFields={
            enhancement?.type === 'group' && enhancement?.alert === true
          }
        >
          <div
            className='form-component-container'
            data-layout={inline ? 'inline' : 'grid'}
          >
            {component.title && component.showLabel && (
              <Typography
                variant={headlineLevelToTypographyVariant(
                  component.headlineLevel,
                )}
                text={component.label}
                className='form-component-item anchorLink'
                data-colspan={12}
              />
            )}
            {component.components && (
              <ComponentList
                components={component.components}
                parentPresentationStyle={
                  component.presentationStyle ?? parentPresentationStyle
                }
                path={currentComponentNamePath}
                isRoot={groupLevel === 0}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
