import type { Auth } from '@/auth/Auth';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { searchRecords } from '@/data/searchRecords.server';
import { createRouteErrorResponse } from '@/errorHandling/createRouteErrorResponse.server';
import { isAxiosError } from 'axios';

interface PerformSearchParams {
  dependencies: Dependencies;
  searchId: string;
  searchQuery: any;
  auth: Auth | undefined;
  decorated?: boolean;
}

export const performSearch = async ({
  dependencies,
  searchId,
  searchQuery,
  auth,
  decorated = false,
}: PerformSearchParams) => {
  try {
    return searchRecords(dependencies, searchId, searchQuery, auth, decorated);
  } catch (error) {
    if (isAxiosError(error) && error.status && error.status >= 500) {
      throw createRouteErrorResponse(error);
    }

    return {
      data: [],
      fromNo: 0,
      toNo: 0,
      totalNo: 0,
      containDataOfType: 'mixed',
    };
  }
};
