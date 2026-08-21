import { getRecordDataListByType } from '@/cora/getRecordDataListByType.server';
import { coraApiUrl, RECORD_LIST_CONTENT_TYPE } from '@/cora/helper.server';
import { HttpError } from '@/cora/httpClient.server';
import { log } from '@/logging/logger.server';
import { describe, expect, it, vi } from 'vitest';

describe('getRecordDataListByType', () => {
  it('should fetch data for a valid type', async () => {
    const type = 'someValidType';
    const expectedData = { test: 'someTestValue' };
    const apiUrl: string = coraApiUrl(`/record/${type}`);
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify(expectedData), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    const response = await getRecordDataListByType(type);

    expect(response.data).toEqual(expect.objectContaining(expectedData));
  });

  it('should call fetch with correct url and headers', async () => {
    const type = 'someValidType';
    const authToken = 'validToken';
    const apiUrl: string = coraApiUrl(`/record/${type}`);
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await getRecordDataListByType(type, authToken);

    expect(fetchMock).toHaveBeenCalledWith(apiUrl, {
      headers: { Accept: RECORD_LIST_CONTENT_TYPE, Authtoken: authToken },
      method: 'GET',
    });
  });

  it('throws HttpError when status is non-2xx', async () => {
    const type = 'invalidType';
    const logErrorSpy = vi.spyOn(log, 'error').mockImplementation(() => {});
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({}), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    await expect(getRecordDataListByType(type, 'validToken')).rejects.toThrow(
      HttpError,
    );

    expect(logErrorSpy).toHaveBeenCalled();
    logErrorSpy.mockRestore();
  });

  it('logs the error and re-throws when fetch rejects', async () => {
    const type = 'someType';
    const logErrorSpy = vi.spyOn(log, 'error').mockImplementation(() => {});
    const error = new Error('network failure');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(error));

    await expect(getRecordDataListByType(type)).rejects.toThrow(error);

    expect(logErrorSpy).toHaveBeenCalledWith(
      { err: error },
      `Failed to fetch record data list of type ${type}: network failure`,
    );

    logErrorSpy.mockRestore();
  });
});
