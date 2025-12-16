import type { DataGroup } from '@/cora/cora-data/types.server';
import { describe, expect, it } from 'vitest';
import { updateRecordToBeTrashed } from '../setRecordTrash.server';

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

    const updatedRecord = updateRecordToBeTrashed(originalRecord, true);

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

  it('should set inTrashBin variable to true for record that does not have inTrashBin variable', () => {
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

    const updatedRecord = updateRecordToBeTrashed(originalRecord, true);

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

  it('should set inTrashBin variable to true for record that already has inTrashBin set to true', () => {
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

    const updatedRecord = updateRecordToBeTrashed(originalRecord, true);

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

  it('should set inTrashBin variable to false when it is true', () => {
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

    const updatedRecord = updateRecordToBeTrashed(originalRecord, false);

    expect(updatedRecord).toEqual({
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
    updateRecordToBeTrashed(originalRecord, true);
    expect(originalRecord).toEqual(originalClone);
  });
});
