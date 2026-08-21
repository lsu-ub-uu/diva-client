import {
  coraApiUrl,
  RECORD_CONTENT_TYPE,
  RECORD_GROUP_CONTENT_TYPE,
} from '@/cora/helper.server';
import { postRecordData } from '@/cora/postRecordData.server';
import { HttpError } from '@/cora/httpClient.server';
import { describe, expect, it, vi } from 'vitest';

describe('postRecordData', () => {
  it('should post a record to Cora', async () => {
    const authToken = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    const expectedResponse = { status: 200 };
    const apiUrl: string = coraApiUrl(`/record/${divaOutputType}`);
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(expectedResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const response = await postRecordData(
      divaOutputData,
      divaOutputType,
      authToken,
    );

    expect(fetchMock).toHaveBeenCalledWith(apiUrl, {
      method: 'POST',
      headers: {
        Accept: RECORD_CONTENT_TYPE,
        'Content-Type': RECORD_GROUP_CONTENT_TYPE,
        Authtoken: authToken,
      },
      body: JSON.stringify(divaOutputData),
    });
    expect(response.data).toEqual(expect.objectContaining(expectedResponse));
  });

  it('should throw HttpError on non-2xx status', async () => {
    const authToken = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ status: 400 }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    await expect(
      postRecordData(divaOutputData, divaOutputType, authToken),
    ).rejects.toThrow(HttpError);
  });

  it('should omit Authtoken header when no authToken is provided', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({}), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await postRecordData(divaOutputData, divaOutputType);

    expect(fetchMock).toHaveBeenCalledWith(
      coraApiUrl(`/record/${divaOutputType}`),
      {
        method: 'POST',
        headers: {
          Accept: RECORD_CONTENT_TYPE,
          'Content-Type': RECORD_GROUP_CONTENT_TYPE,
        },
        body: JSON.stringify(divaOutputData),
      },
    );
  });
});

const divaOutputType = 'divaOutput';
const divaOutputData = {
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
