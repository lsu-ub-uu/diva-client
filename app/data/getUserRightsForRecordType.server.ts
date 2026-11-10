import { getRecordDataById } from '@/cora/getRecordDataById.server';
import type { RecordWrapper } from '@/cora/cora-data/types.server';
import type { Auth } from '@/auth/Auth';

export const USER_RIGHT_ACTION_LINKS = [
  'create',
  'index',
  'search',
  'list',
  'batch_index',
  'validate',
] as const;

export type UserRightActionLink = (typeof USER_RIGHT_ACTION_LINKS)[number];

export const getUserRightsForRecordType = async (
  recordTypeId: string,
  auth?: Auth,
): Promise<UserRightActionLink[]> => {
  const response = await getRecordDataById<RecordWrapper>(
    'recordType',
    recordTypeId,
    auth?.data?.token,
  );

  return response.data.record.actionLinks
    ? Object.keys(response.data.record.actionLinks).filter(
        (key): key is UserRightActionLink =>
          USER_RIGHT_ACTION_LINKS.some((allowedKey) => allowedKey === key),
      )
    : [];
};
