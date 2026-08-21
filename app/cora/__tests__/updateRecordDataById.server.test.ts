import {
  coraApiUrl,
  RECORD_CONTENT_TYPE,
  RECORD_GROUP_CONTENT_TYPE,
} from '@/cora/helper.server';
import { updateRecordDataById } from '@/cora/updateRecordDataById.server';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('updateRecordDataById', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should update data for a specific id', async () => {
    const type = 'divaOutput';
    const actual = {
      name: 'divaOutput',
      children: [
        {
          name: 'recordInfo',
          children: [
            {
              name: 'dataDivider',
              children: [
                {
                  name: 'linkedRecordType',
                  value: 'system',
                },
                {
                  name: 'linkedRecordId',
                  value: 'divaData',
                },
              ],
            },
            {
              name: 'validationType',
              children: [
                {
                  name: 'linkedRecordType',
                  value: 'validationType',
                },
                {
                  name: 'linkedRecordId',
                  value: 'thesisManuscript',
                },
              ],
            },
          ],
        },
        {
          name: 'title',
          children: [
            {
              name: 'mainTitle',
              value: 'aaaa',
            },
          ],
        },
        {
          name: 'contentType',
          value: 'otherAcademic',
        },
        {
          name: 'outputType',
          children: [
            {
              name: 'outputType',
              value: 'artisticOutput',
            },
          ],
        },
        {
          name: 'domain',
          value: 'ivl',
        },
      ],
    };
    const recordId = 'divaOutput:11111111111111';
    const authToken = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    const expectedResponse = {
      status: 200,
    };
    const apiUrl: string = coraApiUrl(`/record/${type}/${recordId}`);
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(expectedResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const response = await updateRecordDataById(
      recordId,
      actual,
      type,
      authToken,
    );

    expect(fetchMock).toHaveBeenCalledWith(apiUrl, {
      method: 'POST',
      headers: {
        Accept: RECORD_CONTENT_TYPE,
        'Content-Type': RECORD_GROUP_CONTENT_TYPE,
        Authtoken: `${authToken}`,
      },
      body: JSON.stringify(actual),
    });
    expect(response.data).toEqual(expect.objectContaining(expectedResponse));
  });

  it('should send request without auth header when auth token is omitted', async () => {
    const type = 'divaOutput';
    const recordId = 'divaOutput:22222222222222';
    const payload = {
      name: 'divaOutput',
      children: [{ name: 'contentType', value: 'otherAcademic' }],
    };
    const apiUrl: string = coraApiUrl(`/record/${type}/${recordId}`);
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await updateRecordDataById(recordId, payload, type);

    expect(fetchMock).toHaveBeenCalledWith(apiUrl, {
      method: 'POST',
      headers: {
        Accept: RECORD_CONTENT_TYPE,
        'Content-Type': RECORD_GROUP_CONTENT_TYPE,
      },
      body: JSON.stringify(payload),
    });
  });

  it('should reject when fetch fails', async () => {
    const type = 'divaOutput';
    const recordId = 'divaOutput:33333333333333';
    const payload = {
      name: 'divaOutput',
      children: [{ name: 'domain', value: 'ivl' }],
    };
    const networkError = new Error('network failed');

    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(networkError));

    await expect(updateRecordDataById(recordId, payload, type)).rejects.toThrow(
      'network failed',
    );
  });

  it('should return parsed data and non-2xx status', async () => {
    const type = 'divaOutput';
    const recordId = 'divaOutput:44444444444444';
    const payload = {
      name: 'divaOutput',
      children: [
        { name: 'title', children: [{ name: 'mainTitle', value: 'x' }] },
      ],
    };
    const expectedErrorResponse = {
      message: 'Bad request',
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify(expectedErrorResponse), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    const response = await updateRecordDataById<typeof expectedErrorResponse>(
      recordId,
      payload,
      type,
    );

    expect(response.status).toBe(400);
    expect(response.data).toEqual(expectedErrorResponse);
  });

  it('should reject when response body is not valid json', async () => {
    const type = 'divaOutput';
    const recordId = 'divaOutput:55555555555555';
    const payload = {
      name: 'divaOutput',
      children: [
        {
          name: 'outputType',
          children: [{ name: 'outputType', value: 'artisticOutput' }],
        },
      ],
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response('not-json', {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    await expect(
      updateRecordDataById(recordId, payload, type),
    ).rejects.toThrow();
  });

  it('should serialize payload without mutating it', async () => {
    const type = 'divaOutput';
    const recordId = 'divaOutput:66666666666666';
    const payload = {
      name: 'divaOutput',
      children: [
        {
          name: 'recordInfo',
          children: [{ name: 'linkedRecordType', value: 'system' }],
        },
      ],
    };
    const payloadBeforeCall = JSON.stringify(payload);
    const apiUrl: string = coraApiUrl(`/record/${type}/${recordId}`);
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await updateRecordDataById(recordId, payload, type);

    expect(fetchMock).toHaveBeenCalledWith(apiUrl, {
      method: 'POST',
      headers: {
        Accept: RECORD_CONTENT_TYPE,
        'Content-Type': RECORD_GROUP_CONTENT_TYPE,
      },
      body: payloadBeforeCall,
    });
    expect(JSON.stringify(payload)).toBe(payloadBeforeCall);
  });
});
