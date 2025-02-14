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

import styled from '@emotion/styled';
import type { Theme, TooltipProps as MuiTooltipProps } from '@mui/material';
import {
  Box,
  ClickAwayListener,
  IconButton,
  Tooltip as MuiTooltip,
  tooltipClasses,
  Typography,
} from '@mui/material';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { CloseIcon } from '@/icons';

const StyledTooltip = styled(({ className, ...props }: MuiTooltipProps) => (
  <MuiTooltip arrow {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'rgba(0, 0, 0, 1)',
    minhHeight: 200,
    minWidth: 300,
    maxWidth: 600,
    fontSize: 16,
    border: '2px solid #2988D1',
    borderRadius: 8,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
  },
  [`& .${tooltipClasses.arrow}`]: {
    '&:before': {
      border: '2px solid #2988D1',
      backgroundColor: '#fff',
    },
    fontSize: 32,
    color: '#2988D1',
  },
}));

interface TooltipProps {
  title: string;
  body: string;
  children: ReactElement;
}

interface ContentProps {
  title: string;
  body: string;
  onClose: () => void;
}

const Content = (props: ContentProps) => {
  return (
    <Box>
      <IconButton
        aria-label='close'
        onClick={props.onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme: Theme) => theme.palette.info.main,
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography sx={{ fontWeight: 'bold', width: '90%' }}>
        {props.title}
      </Typography>
      <Typography variant='body1' sx={{ fontSize: 14 }}>
        {props.body}
      </Typography>
    </Box>
  );
};

/**
 *
 * @deprecated
 */
export const TooltipLegacy = (props: TooltipProps) => {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipToggle = () => {
    setOpen(!open);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <StyledTooltip
          placement='top'
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          onClick={handleTooltipToggle}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={<Content {...props} onClose={handleTooltipClose} />}
        >
          {props.children}
        </StyledTooltip>
      </Box>
    </ClickAwayListener>
  );
};
