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

import { MemberBar } from '@/components/Layout/MemberBar/MemberBar';
import { Header } from '@/components/Layout/Header/Header';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import { NavigationLoader } from '@/components/NavigationLoader/NavigationLoader';
import type { ReactNode } from 'react';
import styles from './Layout.module.css';

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <header className={styles['header']}>
        <NavigationLoader />
        <MemberBar color='#efefef'>
          <p>MemberBar</p>
        </MemberBar>
        <div className='container'>
          <Header />
        </div>
      </header>
      <div className='container'>
        <div className={styles['breadcrumbs']}>
          <Breadcrumbs />
        </div>

        {children}
      </div>
    </>
  );
};
