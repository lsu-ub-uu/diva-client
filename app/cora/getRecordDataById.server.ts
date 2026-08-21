import { httpClient, type HttpResponse } from '@/cora/httpClient.server';
import {
  coraApiUrl,
  createHeaders,
  RECORD_CONTENT_TYPE,
  RECORD_CONTENT_TYPE_DECORATED,
} from '@/cora/helper.server';

export async function getRecordDataById<T>(
  type: string,
  id: string,
  authToken?: string,
  decorated: boolean = false,
): Promise<HttpResponse<T>> {
  const apiUrl: string = coraApiUrl(`/record/${type}/${id}`);
  const rawHeaders = createHeaders(
    { Accept: decorated ? RECORD_CONTENT_TYPE_DECORATED : RECORD_CONTENT_TYPE },
    authToken,
  );
  const headers = Object.fromEntries(
    Object.entries(rawHeaders).filter(([, value]) => value !== undefined),
  ) as Record<string, string>;

  return httpClient.get<T>(apiUrl, { headers });
}
