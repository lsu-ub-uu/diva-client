import type {
  BFFRecordType,
  BFFSearch,
  Dependencies,
} from '@/cora/bffTypes.server';
import { describe, expect, it } from 'vitest';
import { getPublicSearchForRecordType } from '../getPublicSearchForRecordType';
import type { Auth } from '@/auth/Auth';
import { listToPool } from 'server/dependencies/util/listToPool';

describe('getPublicSearchForRecordType', () => {
  it('returns recordType search for regular record type', () => {
    const search = createSearch('someRecordTypeSearch');
    const dependencies = createDependencies([search]);
    const recordType = {
      id: 'someRecordType',
      searchId: 'someRecordTypeSearch',
    } as BFFRecordType;

    const result = getPublicSearchForRecordType(
      dependencies,
      recordType,
      undefined,
    );

    expect(result).toBe(search);
  });

  it('returns undefined when recordType does not have searchId', () => {
    const dependencies = createDependencies([]);
    const recordType = {
      id: 'someRecordType',
    } as BFFRecordType;

    const result = getPublicSearchForRecordType(
      dependencies,
      recordType,
      undefined,
    );

    expect(result).toBeUndefined();
  });

  it('returns outputAdminSearch when user is logged in and recordType is diva-output', () => {
    const search = createSearch('outputAdminSearch');
    const dependencies = createDependencies([search]);
    const recordType = {
      id: 'diva-output',
      searchId: 'divaOutputSearch',
    } as BFFRecordType;

    const auth = {} as Auth;

    const result = getPublicSearchForRecordType(dependencies, recordType, auth);

    expect(result).toBe(search);
  });

  it('returns outputPublicSearch when user is not logged in and recordType is diva-output', () => {
    const search = createSearch('outputPublicSearch');
    const dependencies = createDependencies([search]);
    const recordType = {
      id: 'diva-output',
      searchId: 'divaOutputSearch',
    } as BFFRecordType;

    const result = getPublicSearchForRecordType(
      dependencies,
      recordType,
      undefined,
    );

    expect(result).toBe(search);
  });
});

const createSearch = (
  id: string,
  searchGroup: BFFSearch['searchGroup'] = 'publicSearch',
) =>
  ({
    id,
    searchGroup,
  }) as BFFSearch;

const createDependencies = (searches: BFFSearch[]) => {
  return { searchPool: listToPool(searches) } as Dependencies;
};
