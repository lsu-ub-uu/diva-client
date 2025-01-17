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

import { Grid2 as Grid } from '@mui/material';
import type { ReactNode } from 'react';
import styles from './SidebarLayout.module.css';

interface SidebarLayoutProps {
  children?: ReactNode;
  sidebarContent?: ReactNode;
}

export const SidebarLayout = ({
  sidebarContent,
  children,
}: SidebarLayoutProps) => {
  return (
    <Grid
      container
      columnSpacing={{ md: 4 }}
      className={styles.sidebarLayout}
    >
      <Grid
        size={3}
        display={{ xs: 'none', sm: 'none', md: 'block' }}
      >
        <aside>{sidebarContent}</aside>
      </Grid>
      <Grid
        sx={{ paddingBottom: '64px' }}
        size={9}
      >
        <main>{children}</main>
      </Grid>
    </Grid>
  );
};
