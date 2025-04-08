/*
 * Copyright 2025 Uppsala University Library
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

import type { FormComponentRecordLink } from '@/components/FormGenerator/types';
import { useRouteLoaderData } from 'react-router';
import type { loader } from '@/root';
import { useEffect } from 'react';
import { useRemixFormContext } from 'remix-hook-form';
import { DevInfo } from './DevInfo';

interface PermissionUnitRecordLinkProps {
  component: FormComponentRecordLink;
  path: string;
}
export const PermissionUnitRecordLink = ({
  component,
  path,
}: PermissionUnitRecordLinkProps) => {
  const { setValue } = useRemixFormContext();
  const rootLoaderData = useRouteLoaderData<typeof loader>('root');
  const memberPermissionUnit = rootLoaderData?.theme?.memberPermissionUnit;
  const auth = rootLoaderData?.auth
  console.log({auth})

  // If theme.permissionUnit
  useEffect(() => {
    if (memberPermissionUnit) {
      setValue(path, memberPermissionUnit);
    }
  }, [setValue, path, memberPermissionUnit]);

  // if (!user.permissionUnits.contains(theme.permissionUnit))
  
  if (memberPermissionUnit) {
    return <><DevInfo component={component} path={path} /></>;
  }

  // If user has 1 permission unit, set it.

  // If user has multiple PU, render input <RecordLinkWithSearch />
};
