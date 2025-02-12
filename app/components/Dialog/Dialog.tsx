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

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material';
import {
  DialogContent,
  DialogActions,
  Button,
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  Paper,
  Stack,
  IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CloseIcon } from '@/icons';

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(4),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: ReactNode;
  onClose?: () => void;
}

const DialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <MuiDialogTitle sx={{ m: 0, pl: 4 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme: Theme) => theme.palette.info.main,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

interface DialogProps {
  open: boolean;
  title: ReactNode;
  fixedHeader?: ReactNode;
  children?: ReactNode;
  closeButton: boolean;
  closeAction?: () => void;
  actions?: ReactNode[];
}

const StyledDialogPaper = styled(Paper)(() => ({
  width: '900px',
  height: '800px',
}));

export const Dialog = (props: DialogProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = () => {
    if (props.closeAction) props.closeAction();
    setOpen(false);
  };

  return (
    <StyledDialog
      PaperComponent={StyledDialogPaper}
      onClose={handleClose}
      aria-labelledby='customized-dialog-title'
      open={open}
    >
      <DialogTitle id='customized-dialog-title' onClose={handleClose}>
        {props.title}
      </DialogTitle>
      {props.fixedHeader && (
        <DialogTitle id='extra-dialog-title'>{props.fixedHeader}</DialogTitle>
      )}
      <DialogContent dividers>{props.children}</DialogContent>
      <DialogActions>
        <Stack direction='row' spacing={1}>
          {props.actions?.map((action) => action)}
          {props.closeButton && (
            <Button variant='contained' onClick={handleClose}>
              {t('common.close')}
            </Button>
          )}
        </Stack>
      </DialogActions>
    </StyledDialog>
  );
};
