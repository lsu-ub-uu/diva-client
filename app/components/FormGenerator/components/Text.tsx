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

import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import { convertChildStyleToString } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type { FormComponentText } from '@/components/FormGenerator/types';
import {
  mapTextStyleToComponent,
  Typography,
} from '@/components/Typography/Typography';
import { useTranslation } from 'react-i18next';

interface TextProps {
  component: FormComponentText;
}

export const Text = ({ component }: TextProps) => {
  const { t } = useTranslation();
  return (
    <div
      className='form-component-item'
      data-colspan={component.gridColSpan}
      style={{
        flexBasis:
          convertChildStyleToString(component.childStyle) === 'compact'
            ? 'auto'
            : '2em',
      }}
    >
      <DevInfo component={component} />

      <Typography
        as={mapTextStyleToComponent(component.textStyle)}
        variant={component.textStyle ?? 'bodyTextStyle'}
      >
        {t(component.name)}
      </Typography>
    </div>
  );
};
