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
 */

import { IconButton } from '@mui/material';
import { InfoIcon } from '@/icons';
import { Tooltip } from '@/components/Tooltip/Tooltip';

interface TooltipHelpButtonProps {
  title: string;
  body: string;
}

export const TooltipHelpButton = (props: TooltipHelpButtonProps) => {
  return (
    <Tooltip title={props.title} body={props.body}>
      <IconButton sx={{ p: 0 }} disableRipple color='info' aria-label='info'>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};
