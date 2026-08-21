import {
  coraApiUrl,
  createHeaders,
  RECORD_LIST_CONTENT_TYPE,
} from '@/cora/helper.server';
import { logError } from '@/logging/logger.server';

type FetchLikeResponse<T> = {
  data: T;
  status: number;
};

export async function getRecordDataListByType<T>(
  type: string,
  authToken?: string,
): Promise<FetchLikeResponse<T>> {
  const apiUrl: string = coraApiUrl(`/record/${type}`);
  const rawHeaders = createHeaders(
    { Accept: RECORD_LIST_CONTENT_TYPE },
    authToken,
  );
  const headers = Object.fromEntries(
    Object.entries(rawHeaders).filter(([, value]) => value !== undefined),
  ) as Record<string, string>;
  try {
    const response = await fetch(apiUrl, { headers });
    return {
      data: await response.json(),
      status: response.status,
    };
  } catch (error) {
    logError(error, `Failed to fetch record data list of type ${type}`);
    throw error;
  }
}
