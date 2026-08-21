import {
  coraApiUrl,
  createHeaders,
  RECORD_CONTENT_TYPE,
  RECORD_CONTENT_TYPE_DECORATED,
} from '@/cora/helper.server';

type FetchLikeResponse<T> = {
  data: T;
  status: number;
};

export async function getRecordDataById<T>(
  type: string,
  id: string,
  authToken?: string,
  decorated: boolean = false,
): Promise<FetchLikeResponse<T>> {
  const apiUrl: string = coraApiUrl(`/record/${type}/${id}`);
  const rawHeaders = createHeaders(
    { Accept: decorated ? RECORD_CONTENT_TYPE_DECORATED : RECORD_CONTENT_TYPE },
    authToken,
  );
  const headers = Object.fromEntries(
    Object.entries(rawHeaders).filter(([, value]) => value !== undefined),
  ) as Record<string, string>;

  const response = await fetch(apiUrl, { headers });
  return {
    data: await response.json(),
    status: response.status,
  };
}
