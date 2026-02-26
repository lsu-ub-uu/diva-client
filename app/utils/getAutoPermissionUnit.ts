import type { User } from '@/auth/createUser';
import type { BFFMember } from '@/cora/bffTypes.server';

export const getAutoPermissionUnit = (
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
