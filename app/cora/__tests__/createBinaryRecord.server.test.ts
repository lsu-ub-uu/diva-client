import { describe, expect, it, vi } from 'vitest';
import { createBinaryRecord } from '../createBinaryRecord.server';
import axios from 'axios';

vi.mock('axios');

describe('createBinaryRecord', () => {
  it('should create a binary record with the correct payload and headers', async () => {
    await createBinaryRecord(
      'testfile.txt',
      '1024',
      'someHostRecordType',
      'someHostRecordId',
      'test-token',
    );

    expect(vi.mocked(axios.post)).toHaveBeenCalledWith(
      'https://cora.epc.ub.uu.se/diva/rest/record/binary/',
      {
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
      },
      {
        headers: {
          Accept: 'application/vnd.cora.record+json',
          'Content-Type': 'application/vnd.cora.recordGroup+json',
          Authtoken: 'test-token',
        },
      },
    );
  });
});
