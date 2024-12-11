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

import { Box, SxProps } from '@mui/material';
import { ReactNode } from 'react';
import styles from './Card.module.css';
import { CardContext } from '@/components/Card/CardContext';

export interface CardProps {
  children: ReactNode;
  boxed?: boolean;
  sx?: SxProps;
}

export const Card = ({ children, boxed = false, sx = {} }: CardProps) => {
  return (
    <Box
      className={styles.card}
      sx={sx}
      data-boxed={boxed}
    >
      <CardContext.Provider value={{ boxed }}>{children}</CardContext.Provider>
    </Box>
  );
};
