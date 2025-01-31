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

import { useTranslation } from 'react-i18next';
import type { SxProps } from '@mui/material';
import { Typography as MuiTypography } from '@mui/material';
import type { ElementType } from 'react';
import type { TextStyle } from '@/components/FormGenerator/types';

export interface DivaTypographyVariants {
  variant: TextStyle;
}

interface TypographyProps extends DivaTypographyVariants {
  text: string;
  sx?: SxProps;
}

const mapTextStyleToComponent = (textStyle: TextStyle): ElementType => {
  switch (textStyle) {
    case 'h1TextStyle':
      return 'h1';
    case 'h2TextStyle':
      return 'h2';
    case 'h3TextStyle':
      return 'h3';
    case 'h4TextStyle':
      return 'h4';
    case 'h5TextStyle':
      return 'h5';
    case 'h6TextStyle':
      return 'h6';
    default:
      return 'p';
  }
};

export const Typography = (props: TypographyProps) => {
  const { t } = useTranslation();

  return (
    <MuiTypography
      component={mapTextStyleToComponent(props.variant)}
      {...props}
      sx={{
        fontWeight: props.variant === 'boldTextStyle' ? 'bold' : 'medium',
        ...props.sx,
      }}
    >
      {t(props.text)}
    </MuiTypography>
  );
};
