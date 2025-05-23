import axios, { type AxiosResponse } from 'axios';
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
): Promise<AxiosResponse<T>> {
  const apiUrl: string = coraApiUrl(`/record/${type}/${id}`);
  const headers = createHeaders(
    { Accept: decorated ? RECORD_CONTENT_TYPE_DECORATED : RECORD_CONTENT_TYPE },
    authToken,
  );
  return axios.get(apiUrl, { headers });
}
