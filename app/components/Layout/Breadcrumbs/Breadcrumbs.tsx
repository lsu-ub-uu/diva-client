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

import {
  Breadcrumbs as MuiBreadcrumbs,
  createSvgIcon,
  Link,
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import { useLocation, Link as RouterLink } from 'react-router';

const HomeIcon = createSvgIcon(
  <path
    fill='#613985'
    d='M11.042 1c.2 1.55.796 4.91 1.576 5.948 1.274.168 4.435-.988 5.857-1.587l.525.924c-1.221.951-3.787 3.194-4.281 4.4.494 1.204 3.06 3.408 4.281 4.36l-.525.924c-1.422-.599-4.583-1.755-5.857-1.587-.78 1.037-1.376 4.36-1.576 5.91h-1.05c-.2-1.55-.796-4.873-1.576-5.91-1.274-.168-4.47.988-5.89 1.587L2 15.045c1.221-.952 3.787-3.194 4.28-4.4C5.788 9.44 3.222 7.237 2 6.286l.525-.924c1.422.599 4.617 1.755 5.89 1.587C9.197 5.91 9.793 2.55 9.993 1h1.05ZM10.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'
  />,
  'Home',
);

export const Breadcrumbs = () => {
  const location = useLocation();
  const { t } = useTranslation();

  let currentLink = '';
  const crumbs = location.pathname
    ?.split('/')
    .filter((crumb: string) => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <Link
          key={crumb}
          underline='always'
          color='inherit'
          sx={{ display: 'flex', alignItems: 'center' }}
          component={RouterLink}
          to={currentLink}
        >
          {crumb}
        </Link>
      );
    });

  return (
    <MuiBreadcrumbs aria-label='breadcrumb'>
      <Link
        underline='always'
        color='inherit'
        sx={{ display: 'flex', alignItems: 'center' }}
        component={RouterLink}
        to='/'
      >
        <HomeIcon
          sx={{ mr: 0.5 }}
          color='inherit'
          fontSize='inherit'
        />
        {t('divaClient_breadcrumbStartText')}
      </Link>
      {crumbs}
    </MuiBreadcrumbs>
  );
};
