import { describe, expect, it, vi } from 'vitest';
import { createBinaryRecord } from '../createBinaryRecord.server';
import { postRecordData } from '../postRecordData.server';

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

vi.mock('../postRecordData.server');

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

    expect(vi.mocked(postRecordData)).toHaveBeenCalledWith(
      expectedPayload,
      'binary',
      'test-token',
    );
  });
});
