import type { AxiosResponse } from 'axios';
import axios from 'axios';
import {
  coraApiUrl,
  createHeaders,
  RECORD_LIST_CONTENT_TYPE,
} from '@/cora/helper.server';
import { logError } from '@/logging/logger';

export async function getRecordDataListByType<T>(
  type: string,
  authToken?: string,
): Promise<AxiosResponse<T>> {
  const apiUrl: string = coraApiUrl(`/record/${type}`);
  const headers = createHeaders(
    { Accept: RECORD_LIST_CONTENT_TYPE },
    authToken,
  );
  try {
    return axios.get(apiUrl, { headers });
  } catch (error) {
    logError(error, `Failed to fetch record data list of type ${type}`);
    throw error;
  }
}
