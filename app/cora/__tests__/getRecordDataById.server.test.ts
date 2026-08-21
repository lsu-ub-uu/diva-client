import { getRecordDataById } from '@/cora/getRecordDataById.server';
import {
  coraApiUrl,
  RECORD_CONTENT_TYPE,
  RECORD_CONTENT_TYPE_DECORATED,
} from '@/cora/helper.server';
import { describe, expect, it, vi } from 'vitest';

describe('getRecordDataById', () => {
  it('should fetch data for a valid type and id', async () => {
    const type = 'divaOutput';
    const id = 'divaOutput:11111111111111';
    const authToken = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    const expectedData = { status: 200 };
    const apiUrl: string = coraApiUrl(`/record/${type}/${id}`);
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(expectedData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const response = await getRecordDataById(type, id, authToken);

    expect(fetchMock).toHaveBeenCalledWith(apiUrl, {
      headers: { Accept: RECORD_CONTENT_TYPE, Authtoken: authToken },
    });
    expect(response.data).toEqual(expect.objectContaining(expectedData));
  });

  it('should use decorated content type when decorated is true', async () => {
    const type = 'divaOutput';
    const id = 'divaOutput:11111111111111';
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await getRecordDataById(type, id, undefined, true);

    expect(fetchMock).toHaveBeenCalledWith(
      coraApiUrl(`/record/${type}/${id}`),
      {
        headers: { Accept: RECORD_CONTENT_TYPE_DECORATED },
      },
    );
  });

  it('should omit Authtoken header when no authToken is provided', async () => {
    const type = 'divaOutput';
    const id = 'divaOutput:11111111111111';
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await getRecordDataById(type, id);

    expect(fetchMock).toHaveBeenCalledWith(
      coraApiUrl(`/record/${type}/${id}`),
      {
        headers: { Accept: RECORD_CONTENT_TYPE },
      },
    );
  });
});
