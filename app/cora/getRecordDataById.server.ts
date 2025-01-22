import type { AxiosResponse } from 'axios';
import axios from 'axios';
import {
  coraApiUrl,
  createHeaders,
  RECORD_CONTENT_TYPE,
} from '@/cora/helper.server';

export async function getRecordDataById<T>(
  type: string,
  id: string,
  authToken?: string,
): Promise<AxiosResponse<T>> {
  const apiUrl: string = coraApiUrl(`/record/${type}/${id}`);
  const headers = createHeaders({ Accept: RECORD_CONTENT_TYPE }, authToken);

  return axios.get(apiUrl, { headers });
}
