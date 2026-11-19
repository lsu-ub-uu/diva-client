import type { DataGroup } from '@/cora/cora-data/types.server';
import { describe, expect, it } from 'vitest';
import { convertClassicValidationType } from '../convertClassicValidationType.server';

const createRecord = (validationType = 'classic_report'): DataGroup => ({
  name: 'output',
  attributes: { source: 'original' },
  children: [
    {
      name: 'recordInfo',
      children: [
        { name: 'id', value: 'output:123' },
        {
          name: 'validationType',
          children: [
            { name: 'linkedRecordType', value: 'validationType' },
            { name: 'linkedRecordId', value: validationType },
          ],
        },
      ],
    },
    { name: 'dataQuality', value: 'classic' },
    { name: 'title', children: [{ name: 'mainTitle', value: 'A title' }] },
  ],
});

describe('convertClassicValidationType', () => {
  it('updates only the validation type and data quality without mutating the input', () => {
    const record = createRecord();
    const original = structuredClone(record);

    expect(convertClassicValidationType(record)).toEqual({
      name: 'output',
      attributes: { source: 'original' },
      children: [
        {
          name: 'recordInfo',
          children: [
            { name: 'id', value: 'output:123' },
            {
              name: 'validationType',
              
              children: [
                { name: 'linkedRecordType', value: 'validationType' },
                { name: 'linkedRecordId', value: 'report' },
              ],
            },
          ],
        },
        { name: 'dataQuality', value: '2026' },
        { name: 'title', children: [{ name: 'mainTitle', value: 'A title' }] },
      ],
    });
    expect(record).toEqual(original);
  });

  it.each(['report', 'classic_', 'other_classic_report'])(
    'rejects invalid validation type %s',
    (validationType) => {
      expect(() => convertClassicValidationType(createRecord(validationType))).toThrow();
    },
  );
});