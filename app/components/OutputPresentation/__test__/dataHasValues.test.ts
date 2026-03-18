import { describe, expect, it } from 'vitest';
import { dataHasValues } from '../dataHasValues';
import type { DataAtomic, RecordLink } from '@/cora/cora-data/types.server';

describe('dataHasValues', () => {
  it('returns false for atomic with empty value', () => {
    const data: DataAtomic = { name: 'someName', value: '' };
    expect(dataHasValues(data)).toBe(false);
  });

  it('returns true for atomic with value', () => {
    const data: DataAtomic = { name: 'someName', value: 'some value' };
    expect(dataHasValues(data)).toBe(true);
  });

  it('returns true for record link', () => {
    const data: RecordLink = {
      name: 'someName',
      children: [
        { name: 'linkedRecordType', value: 'someRecordType' },
        { name: 'linkedRecordId', value: 'someRecordId' },
      ],
    };
    expect(dataHasValues(data)).toBe(true);
  });

  it('returns true for a group with an atomic child with value', () => {
    const data = {
      name: 'group',
      children: [
        { name: 'child1', value: '' },
        { name: 'child2', value: 'some value' },
      ],
    };
    expect(dataHasValues(data)).toBe(true);
  });

  it('returns false for a group with only atomic children without values', () => {
    const data = {
      name: 'group',
      children: [
        { name: 'child1', value: '' },
        { name: 'child2', value: '' },
      ],
    };
    expect(dataHasValues(data)).toBe(false);
  });

  it('returns false for a group with no children', () => {
    const data = {
      name: 'group',
      children: [],
    };
    expect(dataHasValues(data)).toBe(false);
  });

  it('returns true for a group with a child group that has an atomic child with value', () => {
    const data = {
      name: 'group',
      children: [
        {
          name: 'childGroup',
          children: [
            { name: 'child1', value: '' },
            { name: 'child2', value: 'some value' },
          ],
        },
      ],
    };
    expect(dataHasValues(data)).toBe(true);
  });

  it('returns false for a group with a child group that has only atomic children without values', () => {
    const data = {
      name: 'group',
      children: [
        {
          name: 'childGroup',
          children: [
            { name: 'child1', value: '' },
            { name: 'child2', value: '' },
          ],
        },
      ],
    };
    expect(dataHasValues(data)).toBe(false);
  });
});
