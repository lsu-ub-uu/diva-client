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
import { CardContent, Grid2 as Grid, IconButton } from '@mui/material';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import {
  checkIfPresentationStyleOrParentIsInline,
  getGroupLevel,
  headlineLevelToTypographyVariant,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { type ReactNode, useContext } from 'react';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { Card } from '@/components/Card/Card';
import styles from './Group.module.css';
import { CardHeader } from '@/components/Card/CardHeader';
import { CardTitle } from '@/components/Card/CardTitle';
import { Typography } from '@/components/Typography/Typography';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import { Attributes } from '@/components/FormGenerator/components/Attributes';
import { ComponentList } from '@/components/FormGenerator/ComponentList';
import { useRemixFormContext } from 'remix-hook-form';
import { cleanFormData, hasOnlyAttributes } from '@/utils/cleanFormData';

interface GroupProps {
  currentComponentNamePath: string;
  component: FormComponentContainer | FormComponentGroup;
  parentPresentationStyle: string | undefined;
  childWithNameInDataArray: string[];
  actionButtonGroup?: ReactNode;
}

export const Group = ({
  currentComponentNamePath,
  component,
  parentPresentationStyle,
  childWithNameInDataArray,
  actionButtonGroup,
}: GroupProps) => {
  const { boxGroups } = useContext(FormGeneratorContext);
  const { getValues } = useRemixFormContext();
  const { t } = useTranslation();

  const groupLevel = getGroupLevel(currentComponentNamePath);
  const inline = checkIfPresentationStyleOrParentIsInline(
    component,
    parentPresentationStyle,
  );
  const hasNoValues = hasOnlyAttributes(
    cleanFormData(getValues(currentComponentNamePath)),
  );

  if (component.mode === 'output' && hasNoValues) {
    return null;
  }

  return (
    <Grid
      size={12}
      id={`anchor_${addAttributesToName(component, component.name)}`}
      className={`${styles.group} anchorLink`}
      data-inline={inline}
    >
      <DevInfo component={component} />
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
              <Tooltip
                title={t(component.tooltip?.title as string)}
                body={t(component.tooltip?.body as string)}
              >
                <IconButton
                  disableRipple
                  color='info'
                  aria-label='info'
                >
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </CardTitle>
          )}
          <Attributes
            component={component}
            path={currentComponentNamePath}
          />

          {actionButtonGroup}
        </CardHeader>
        <CardContent>
          <Grid
            container
            spacing={2}
          >
            {component.components && (
              <ComponentList
                components={component.components}
                childWithNameInDataArray={childWithNameInDataArray}
                parentPresentationStyle={
                  component.presentationStyle ?? parentPresentationStyle
                }
                path={currentComponentNamePath}
              />
            )}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
