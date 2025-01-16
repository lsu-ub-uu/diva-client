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

import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { Card } from '@/components/Card/Card';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import { CardHeader } from '@/components/Card/CardHeader';
import { CardTitle } from '@/components/Card/CardTitle';
import { Typography } from '@/components/Typography/Typography';
import { headlineLevelToTypographyVariant } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { Grid2 as Grid, IconButton } from '@mui/material';
import { Attributes } from '@/components/FormGenerator/components/Attributes';
import { CardContent } from '@/components/Card/CardContent';
import { ComponentList } from '@/components/FormGenerator/ComponentList';
import type {
  FormComponentContainer,
  FormComponentGroup,
} from '@/components/FormGenerator/types';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@mui/icons-material/Info';
import { useContext } from 'react';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';

interface FirstLevelGroupProps {
  currentComponentNamePath: string;
  reactKey: string;
  component: FormComponentContainer | FormComponentGroup;
  parentPresentationStyle: string | undefined;
  childWithNameInDataArray: string[];
}

export const FirstLevelGroup = ({
  reactKey,
  component,
  currentComponentNamePath,
  childWithNameInDataArray,
  parentPresentationStyle,
}: FirstLevelGroupProps) => {
  const { t } = useTranslation();
  const { boxGroups } = useContext(FormGeneratorContext);

  return (
    <Grid
      size={12}
      key={reactKey}
      className='anchorLink'
      id={`anchor_${addAttributesToName(component, component.name)}`}
    >
      <DevInfo component={component} />
      <Card boxed={boxGroups}>
        <CardHeader>
          {component.showLabel ? (
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
          ) : null}
          <Attributes
            component={component}
            path={currentComponentNamePath}
          />
        </CardHeader>
        <CardContent>
          <Grid
            container
            justifyContent='space-between'
            alignItems='flex-start'
            id={`anchor_${addAttributesToName(component, component.name)}`}
            gap={2}
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
