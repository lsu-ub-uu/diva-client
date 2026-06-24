import type { Auth } from '@/auth/Auth';
import type {
  BFFRecordType,
  BFFSearch,
  Dependencies,
} from '@/cora/bffTypes.server';

export const getPublicSearchForRecordType = (
  dependencies: Dependencies,
  recordType: BFFRecordType,
  auth: Auth | undefined,
): BFFSearch | undefined => {
  const searchId = getSearchIdForRecordType(dependencies, recordType, auth);
  if (!searchId) {
    return undefined;
  }

  const search = dependencies.searchPool.get(searchId);
  if (!search || search.searchGroup !== 'publicSearch') {
    return undefined;
  }

  return search;
};

const getSearchIdForRecordType = (
  dependencies: Dependencies,
  recordType: BFFRecordType,
  auth: Auth | undefined,
): string | undefined => {
  if (recordType.id === 'diva-output') {
    return auth ? 'outputAdminSearch' : 'outputPublicSearch';
  }

  return recordType.searchId;
};
