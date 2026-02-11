import type { Auth } from '@/auth/Auth';
import type { Notification } from '@/auth/sessions.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { searchRecords } from '@/data/searchRecords.server';
import type { BFFSearchResult } from '@/types/record';
import { createNotificationFromAxiosError } from '@/utils/createNotificationFromAxiosError';
import type { TFunction } from 'i18next';

interface PerformSearchParams {
  dependencies: Dependencies;
  searchId: string;
  searchQuery: any;
  auth: Auth | undefined;
  decorated?: boolean;
  t: TFunction;
}

export interface PerformSearchResult extends BFFSearchResult {
  alert?: Notification;
}

export const performSearch = async ({
  dependencies,
  searchId,
  searchQuery,
  auth,
  decorated = false,
  t,
}: PerformSearchParams): Promise<PerformSearchResult> => {
  try {
    return await searchRecords(
      dependencies,
      searchId,
      searchQuery,
      auth,
      decorated,
    );
  } catch (error) {
    const notification = createNotificationFromAxiosError(t, error);

    return {
      data: [],
      fromNo: 0,
      toNo: 0,
      totalNo: 0,
      containDataOfType: 'mixed',
      alert: notification,
    };
  }
};
