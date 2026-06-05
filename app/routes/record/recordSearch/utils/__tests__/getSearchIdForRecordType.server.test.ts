import type { BFFRecordType } from '@/cora/bffTypes.server';
import { describe, expect, it } from 'vitest';
import { getSearchIdForRecordType } from '../getSearchIdForRecorrdType.server';
import type { Auth } from '@/auth/Auth';

describe('getSearchIdForRecordType', () => {
  it('returns recordType search for regular record type', () => {
    const recordType = {
      id: 'someRecordType',
      searchId: 'someRecordTypeSearch',
    } as BFFRecordType;

    const result = getSearchIdForRecordType(recordType, undefined);

    expect(result).toBe('someRecordTypeSearch');
  });

  it('throws error when recordType does not have searchId', () => {
    const recordType = {
      id: 'someRecordType',
    } as BFFRecordType;

    expect(() => getSearchIdForRecordType(recordType, undefined)).toThrow();
  });

  it('returns outputAdminSearch when user is logged in and recordType is diva-output', () => {
    const recordType = {
      id: 'diva-output',
      searchId: 'divaOutputSearch',
    } as BFFRecordType;

    const auth = {} as Auth;

    const result = getSearchIdForRecordType(recordType, auth);

    expect(result).toBe('outputAdminSearch');
  });

  it('returns outputPublicSearch when user is not logged in and recordType is diva-output', () => {
    const recordType = {
      id: 'diva-output',
      searchId: 'divaOutputSearch',
    } as BFFRecordType;

    const result = getSearchIdForRecordType(recordType, undefined);

    expect(result).toBe('outputPublicSearch');
  });
});
