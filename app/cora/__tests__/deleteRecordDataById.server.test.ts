import { deleteRecordDataById } from '@/cora/deleteRecordDataById.server';
import { coraApiUrl } from '@/cora/helper.server';
import { describe, expect, it, vi } from 'vitest';

describe('deleteRecordDataById', () => {
  it('should delete data for a specific id', async () => {
    const type = 'divaOutput';
    const recordId = 'divaOutput:11111111111111';
    const authToken = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    const expectedData = { status: 200 };
    const apiUrl: string = coraApiUrl(`/record/${type}/${recordId}`);
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(expectedData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const response = await deleteRecordDataById(recordId, type, authToken);

    expect(fetchMock).toHaveBeenCalledWith(apiUrl, {
      method: 'DELETE',
      headers: { Authtoken: authToken },
    });
    expect(response.data).toEqual(expect.objectContaining(expectedData));
  });

  it('should omit Authtoken header when no authToken is provided', async () => {
    const type = 'divaOutput';
    const recordId = 'divaOutput:11111111111111';
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await deleteRecordDataById(recordId, type);

    expect(fetchMock).toHaveBeenCalledWith(
      coraApiUrl(`/record/${type}/${recordId}`),
      {
        method: 'DELETE',
        headers: {},
      },
    );
  });
});
