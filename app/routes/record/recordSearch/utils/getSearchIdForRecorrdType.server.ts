import type { Auth } from '@/auth/Auth';
import type { BFFRecordType } from '@/cora/bffTypes.server';
import { NotFoundError } from '@/errorHandling/NotFoundError';

export const getSearchIdForRecordType = (
  recordType: BFFRecordType,
  auth: Auth | undefined,
): string => {
  if (recordType.id === 'diva-output') {
    return auth ? 'outputAdminSearch' : 'outputPublicSearch';
  }

  const searchId = recordType.searchId;

  if (!searchId) {
    throw new NotFoundError(
      `Record type ${recordType.id} does not have a searchId`,
    );
  }

  return searchId;
};
