import {
  coraApiUrl,
  createHeaders,
  RECORD_CONTENT_TYPE,
  RECORD_CONTENT_TYPE_DECORATED,
} from '@/cora/helper.server';
import axios, { AxiosError, type AxiosResponse } from 'axios';

export async function getRecordDataById<T>(
  type: string,
  id: string,
  authToken?: string,
  decorated: boolean = false,
): Promise<AxiosResponse<T>> {
  const apiUrl: string = coraApiUrl(`/record/${type}/${id}`);
  const headers = createHeaders(
    { Accept: decorated ? RECORD_CONTENT_TYPE_DECORATED : RECORD_CONTENT_TYPE },
    authToken,
  );
  throw new AxiosError(
    'Internal Server Error',
    'ERR_BAD_RESPONSE',
    undefined,
    undefined,
    {
      status: 500,
      statusText: 'Internal Server Error',
      headers: {},
      config: {} as any,
      data: { message: 'Something went wrong' },
    },
  );
  return axios.get(apiUrl, { headers });
}
