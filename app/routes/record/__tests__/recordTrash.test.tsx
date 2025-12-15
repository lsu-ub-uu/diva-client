import type { DataGroup } from '@/cora/cora-data/types.server';
import { describe, expect, it } from 'vitest';
import { updateRecordToBeTrashed } from '../recordTrash';

describe('updateRecordToBeTrashed', () => {
  it('should set inTrashBin variable to true when it is false', () => {
    const originalRecord: DataGroup = {
      name: 'someRootName',
      children: [
        {
          name: 'recordInfo',
          children: [
            { name: 'id', value: 'someRecordId' },
            { name: 'inTrashBin', value: 'false' },
          ],
        },
        { name: 'someData', value: 'someValue' },
      ],
    };

    const updatedRecord = updateRecordToBeTrashed(originalRecord);

    expect(updatedRecord).toEqual({
      name: 'someRootName',
      children: [
        {
          name: 'recordInfo',
          children: [
            { name: 'id', value: 'someRecordId' },
            { name: 'inTrashBin', value: 'true' },
          ],
        },
        { name: 'someData', value: 'someValue' },
      ],
    });
  });

  it('should handle record that does not have inTrashBin variable', () => {
    const originalRecord: DataGroup = {
      name: 'someRootName',
      children: [
        {
          name: 'recordInfo',
          children: [{ name: 'id', value: 'someRecordId' }],
        },
        { name: 'someData', value: 'someValue' },
      ],
    };

    const updatedRecord = updateRecordToBeTrashed(originalRecord);

    expect(updatedRecord).toEqual({
      name: 'someRootName',
      children: [
        {
          name: 'recordInfo',
          children: [
            { name: 'id', value: 'someRecordId' },
            { name: 'inTrashBin', value: 'true' },
          ],
        },
        { name: 'someData', value: 'someValue' },
      ],
    });
  });

  it('should handle record that already has inTrashBin set to true', () => {
    const originalRecord: DataGroup = {
      name: 'someRootName',
      children: [
        {
          name: 'recordInfo',
          children: [
            { name: 'id', value: 'someRecordId' },
            { name: 'inTrashBin', value: 'true' },
          ],
        },
        { name: 'someData', value: 'someValue' },
      ],
    };

    const updatedRecord = updateRecordToBeTrashed(originalRecord);

    expect(updatedRecord).toEqual({
      name: 'someRootName',
      children: [
        {
          name: 'recordInfo',
          children: [
            { name: 'id', value: 'someRecordId' },
            { name: 'inTrashBin', value: 'true' },
          ],
        },
        { name: 'someData', value: 'someValue' },
      ],
    });
  });

  it('should not mutate input data', () => {
    const originalRecord: DataGroup = {
      name: 'someRootName',
      children: [
        {
          name: 'recordInfo',
          children: [
            { name: 'id', value: 'someRecordId' },
            { name: 'inTrashBin', value: 'false' },
          ],
        },
        { name: 'someData', value: 'someValue' },
      ],
    };

    const originalClone = structuredClone(originalRecord);
    updateRecordToBeTrashed(originalRecord);
    expect(originalRecord).toEqual(originalClone);
  });
});
