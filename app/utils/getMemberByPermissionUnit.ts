import type { BFFMember } from '@/cora/bffTypes.server';

export const getMemberByPermissionUnit = (
  members: BFFMember[],
  permissionUnit: string | undefined,
): BFFMember | undefined => {
  if (!permissionUnit) {
    return undefined;
  }
  return members.find(
    (member) => member.memberPermissionUnit === permissionUnit,
  );
};
