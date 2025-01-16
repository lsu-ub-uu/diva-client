import type { AxiosResponse } from 'axios';
import axios from 'axios';
import {
  coraApiUrl,
  createHeaders,
  RECORD_LIST_CONTENT_TYPE,
} from '@/cora/helper.server';

export async function getRecordDataListByType<T>(
  type: string,
  authToken?: string,
): Promise<AxiosResponse<T>> {
  const apiUrl: string = coraApiUrl(`/record/${type}`);
  const headers = createHeaders(
    { Accept: RECORD_LIST_CONTENT_TYPE },
    authToken,
  );
  return axios.get(apiUrl, { headers });
}
