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

import type { SxProps } from '@mui/material';
import { Box } from '@mui/material';
import type { ReactNode} from 'react';
import { useContext } from 'react';
import styles from './Card.module.css';
import { CardContext } from '@/components/Card/CardContext';

interface CardContentProps {
  children: ReactNode;
  sx?: SxProps;
}

export const CardContent = ({ children, sx = {} }: CardContentProps) => {
  const { boxed } = useContext(CardContext);
  return (
    <Box
      className={styles.cardContent}
      data-boxed={boxed}
      sx={sx}
    >
      {children}
    </Box>
  );
};
