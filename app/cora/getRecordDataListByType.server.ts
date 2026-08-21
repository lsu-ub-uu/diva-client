import { httpClient, type HttpResponse } from '@/cora/httpClient.server';
import {
  coraApiUrl,
  createHeaders,
  RECORD_LIST_CONTENT_TYPE,
} from '@/cora/helper.server';
import { logError } from '@/logging/logger.server';

export async function getRecordDataListByType<T>(
  type: string,
  authToken?: string,
): Promise<HttpResponse<T>> {
  const apiUrl: string = coraApiUrl(`/record/${type}`);
  const rawHeaders = createHeaders(
    { Accept: RECORD_LIST_CONTENT_TYPE },
    authToken,
  );
  const headers = Object.fromEntries(
    Object.entries(rawHeaders).filter(([, value]) => value !== undefined),
  ) as Record<string, string>;
  try {
    return await httpClient.get<T>(apiUrl, { headers });
  } catch (error) {
    logError(error, `Failed to fetch record data list of type ${type}`);
    throw error;
  }
}
