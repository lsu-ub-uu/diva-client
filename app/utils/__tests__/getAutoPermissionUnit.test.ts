import { describe, expect, it } from 'vitest';
import { getAutoPermissionUnit } from '../getAutoPermissionUnit';
import type { BFFMember } from '@/cora/transform/bffTypes.server';
import type { User } from '@/auth/createUser';

describe('getAutoPermissionUnit', () => {
  it('should return member permission unit when member has memberPermissionUnit', () => {
    const member = {
      memberPermissionUnit: 'member-permission-unit',
    } as BFFMember;

    const user = {
      permissionUnit: ['user-permission-unit'],
    } as User;

    const result = getAutoPermissionUnit(member, user);

    expect(result).toBe('member-permission-unit');
  });

  it('should return user permission unit when member has no memberPermissionUnit and user has exactly one permissionUnit', () => {
    const member = {} as BFFMember;

    const user = {
      permissionUnit: ['user-permission-unit'],
    } as User;

    const result = getAutoPermissionUnit(member, user);

    expect(result).toBe('user-permission-unit');
  });

  it('should return undefined when member has no memberPermissionUnit and user has no permissionUnit', () => {
    const member = {} as BFFMember;

    const user = {} as User;

    const result = getAutoPermissionUnit(member, user);

    expect(result).toBeUndefined();
  });

  it('should return undefined when member has no memberPermissionUnit and user has multiple permissionUnits', () => {
    const member = {} as BFFMember;

    const user = {
      permissionUnit: ['unit-1', 'unit-2'],
    } as User;

    const result = getAutoPermissionUnit(member, user);

    expect(result).toBeUndefined();
  });

  it('should return undefined when member has no memberPermissionUnit and user has empty permissionUnit array', () => {
    const member = {} as BFFMember;

    const user = {
      permissionUnit: [] as string[],
    } as User;

    const result = getAutoPermissionUnit(member, user);

    expect(result).toBeUndefined();
  });

  it('should return undefined when both member and user are undefined', () => {
    const result = getAutoPermissionUnit(undefined, undefined);

    expect(result).toBeUndefined();
  });

  it('should return undefined when member is undefined and user has no permissionUnit', () => {
    const user = {} as User;

    const result = getAutoPermissionUnit(undefined, user);

    expect(result).toBeUndefined();
  });

  it('should return user permission unit when member is undefined and user has exactly one permissionUnit', () => {
    const user = {
      permissionUnit: ['user-permission-unit'],
    } as User;

    const result = getAutoPermissionUnit(undefined, user);

    expect(result).toBe('user-permission-unit');
  });

  it('should return undefined when user is undefined', () => {
    const member = {} as BFFMember;

    const result = getAutoPermissionUnit(member, undefined);

    expect(result).toBeUndefined();
  });

  it('should return member permission unit when user is undefined but member has memberPermissionUnit', () => {
    const member = {
      memberPermissionUnit: 'member-permission-unit',
    } as BFFMember;

    const result = getAutoPermissionUnit(member, undefined);

    expect(result).toBe('member-permission-unit');
  });
});
