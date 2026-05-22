import type { FormComponentTextVar } from '@/components/FormGenerator/types';
import type { DataGroup } from '@/cora/cora-data/types.server';
import { describe, expect, it } from 'vitest';
import { findChildData } from '../findChildData';

describe('findChildData', () => {
  it('returns undefined when no matching data', () => {
    const component = {
      type: 'textVariable',
      name: 'test',
    } as FormComponentTextVar;

    const data = {
      name: 'root',
      type: 'group',
      children: [{ name: 'other', value: 'someValue' }],
    } as DataGroup;

    expect(findChildData(component, data)).toEqual([]);
  });

  it('returns matching name and no attributes', () => {
    const component = {
      type: 'textVariable',
      name: 'test',
    } as FormComponentTextVar;

    const data = {
      name: 'root',
      type: 'group',
      children: [{ name: 'test', value: 'someValue' }],
    } as DataGroup;

    const result = findChildData(component, data);
    expect(result).toEqual([{ name: 'test', value: 'someValue' }]);
  });

  it('returns matching name and attributes', () => {
    const component = {
      type: 'textVariable',
      name: 'test',
      attributes: [
        { name: 'attr1', options: [{ value: 'opt1' }, { value: 'opt2' }] },
      ],
    } as FormComponentTextVar;

    const data = {
      name: 'root',
      type: 'group',
      children: [
        {
          name: 'test',
          attributes: { attr1: 'opt1', attr2: 'opt3', value: 'someOtherValue' },
        },
        {
          name: 'test',
          attributes: { attr1: 'opt2' },
          value: 'someValue',
        },
      ],
    } as DataGroup;

    const result = findChildData(component, data);
    expect(result).toEqual([
      {
        name: 'test',
        attributes: { attr1: 'opt2' },
        value: 'someValue',
      },
    ]);
  });

  it('returns when data matches final value attribute', () => {
    const component = {
      type: 'textVariable',
      name: 'test',
      attributes: [
        {
          name: 'attr1',
          options: [{ value: 'opt1' }, { value: 'opt2' }],
          finalValue: 'opt2',
        },
      ],
    } as FormComponentTextVar;

    const data = {
      name: 'root',
      type: 'group',
      children: [
        {
          name: 'test',
          attributes: { attr1: 'opt1' },
          value: 'someOtherValue',
        },
        {
          name: 'test',
          attributes: { attr1: 'opt2' },
          value: 'someValue',
        },
      ],
    } as DataGroup;

    const result = findChildData(component, data);
    expect(result).toEqual([
      {
        name: 'test',
        attributes: { attr1: 'opt2' },
        value: 'someValue',
      },
    ]);
  });

  it('matches by attribute value', () => {
    const component = {
      type: 'textVariable',
      name: 'test',
      attributes: [
        {
          name: 'color',
          options: [{ value: 'blue' }, { value: 'red' }],
        },
      ],
    } as FormComponentTextVar;

    const data = {
      name: 'root',
      type: 'group',
      children: [
        {
          name: 'test',
          attributes: { color: 'blue' },
          value: 'someOtherValue',
        },
        {
          name: 'test',
          attributes: { color: 'red' },
          value: 'someValue',
        },
        {
          name: 'test',
          attributes: { color: 'yellow' },
          value: 'someValue',
        },
      ],
    } as DataGroup;

    const result = findChildData(component, data);
    expect(result).toEqual([
      {
        name: 'test',
        attributes: { color: 'blue' },
        value: 'someOtherValue',
      },
      {
        name: 'test',
        attributes: { color: 'red' },
        value: 'someValue',
      },
    ]);
  });
});
