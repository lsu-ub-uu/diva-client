import { describe, expect, it, vi } from 'vitest';
import { createBinaryRecord } from '../createBinaryRecord.server';
import {
  RECORD_CONTENT_TYPE,
  RECORD_GROUP_CONTENT_TYPE,
} from '../helper.server';

const expectedPayload = {
  name: 'binary',
  children: [
    {
      name: 'recordInfo',
      children: [
        {
          name: 'dataDivider',
          children: [
            { name: 'linkedRecordType', value: 'system' },
            { name: 'linkedRecordId', value: 'divaData' },
          ],
        },
        {
          name: 'validationType',
          children: [
            { name: 'linkedRecordType', value: 'validationType' },
            { name: 'linkedRecordId', value: 'genericBinary' },
          ],
        },
        { name: 'visibility', value: 'unpublished' },
        {
          name: 'hostRecord',
          children: [
            { name: 'linkedRecordType', value: 'someHostRecordType' },
            { name: 'linkedRecordId', value: 'someHostRecordId' },
          ],
        },
      ],
    },
    { name: 'originalFileName', value: 'testfile.txt' },
    { name: 'expectedFileSize', value: '1024' },
  ],
  attributes: { type: 'generic' },
};

describe('createBinaryRecord', () => {
  it('should create a binary record with the correct payload and headers', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({}), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await createBinaryRecord(
      'testfile.txt',
      '1024',
      'someHostRecordType',
      'someHostRecordId',
      'test-token',
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'https://cora.epc.ub.uu.se/diva/rest/record/binary/',
      {
        method: 'POST',
        headers: {
          Accept: RECORD_CONTENT_TYPE,
          'Content-Type': RECORD_GROUP_CONTENT_TYPE,
          Authtoken: 'test-token',
        },
        body: JSON.stringify(expectedPayload),
      },
    );
  });

  it('should omit Authtoken header when no authToken is provided', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({}), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await createBinaryRecord(
      'testfile.txt',
      '1024',
      'someHostRecordType',
      'someHostRecordId',
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'https://cora.epc.ub.uu.se/diva/rest/record/binary/',
      {
        method: 'POST',
        headers: {
          Accept: RECORD_CONTENT_TYPE,
          'Content-Type': RECORD_GROUP_CONTENT_TYPE,
        },
        body: JSON.stringify(expectedPayload),
      },
    );
  });
});
