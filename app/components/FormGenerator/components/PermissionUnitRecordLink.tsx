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

import type { User } from '@/auth/createUser';
import type { FormComponentRecordLink } from '@/components/FormGenerator/types';
import type { BFFMember } from '@/cora/transform/bffTypes.server';
import { useMember, useUser } from '@/utils/rootLoaderDataUtils';
import { useEffect } from 'react';
import { useRemixFormContext } from 'remix-hook-form';
import { DevInfo } from './DevInfo';
import { RecordLinkWithSearch } from './RecordLinkWithSearch';

interface PermissionUnitRecordLinkProps {
  component: FormComponentRecordLink;
  path: string;
}
export const PermissionUnitRecordLink = ({
  component /*  */,
  path,
}: PermissionUnitRecordLinkProps) => {
  const { setValue } = useRemixFormContext();
  const member = useMember();
  const user = useUser();

  const autoPermissionUnit = getAutoPermissionUnit(member, user);

  useEffect(() => {
    if (autoPermissionUnit) {
      setValue(path, autoPermissionUnit);
    }
  }, [setValue, path, autoPermissionUnit]);

  if (autoPermissionUnit) {
    return (
      <>
        <DevInfo
          label={'PermissionUnitRecordLink'}
          component={component}
          path={path}
        />

        <input type='hidden' name={path} value={autoPermissionUnit} />
      </>
    );
  }

  return <RecordLinkWithSearch component={component} path={path} />;
};

const getAutoPermissionUnit = (
  member: BFFMember | undefined,
  user: User | undefined,
) => {
  const memberPermissionUnit = member?.memberPermissionUnit;
  if (memberPermissionUnit) {
    return memberPermissionUnit;
  }

  if (user?.permissionUnit && user?.permissionUnit.length === 1) {
    return user.permissionUnit[0];
  }
};
