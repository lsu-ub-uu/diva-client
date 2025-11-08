import type { FieldValues, UseFormGetValues } from 'react-hook-form';
import { describe, expect, it } from 'vitest';
import type {
  FormComponentContainer,
  FormComponentGroup,
  FormComponentTextVar,
} from '../../types';
import { formComponentHasData } from '../formComponentHasData';
import { get } from 'lodash-es';

describe('formComponentHasData', () => {
  it('returns true for group with data', () => {
    const mockData = {
      parentName: {
        groupName: {
          child1: { value: 'value1' },
          child2: { value: 'value2' },
        },
      },
    };
    const getValuesMock = ((path: string) => {
      return get(mockData, path);
    }) as UseFormGetValues<FieldValues>;

    const group = { name: 'groupName' } as FormComponentGroup;
    expect(formComponentHasData('parentName', group, getValuesMock)).toBe(true);
  });

  it('returns false for group without data', () => {
    const mockData = {
      parentName: {
        groupName: {
          child1: { value: '' },
          child2: { value: '' },
        },
      },
    };

    const getValuesMock = ((path: string) => {
      return get(mockData, path);
    }) as UseFormGetValues<FieldValues>;

    const group = { name: 'groupName' } as FormComponentGroup;
    expect(formComponentHasData('parentName', group, getValuesMock)).toBe(
      false,
    );
  });

  it('returns true for SContainer with data', () => {
    const mockData = {
      parentName: {
        groupName: {
          child1: { value: 'value1' },
          child2: { value: 'value2' },
        },
      },
    };
    const getValuesMock = ((path: string) => {
      return get(mockData, path);
    }) as UseFormGetValues<FieldValues>;

    const container = {
      type: 'container',
      containerType: 'surrounding',
      components: [
        { name: 'child1', type: 'textVariable' },
        { name: 'child2', type: 'textVariable' },
      ],
    } as FormComponentContainer;
    expect(
      formComponentHasData('parentName.groupName', container, getValuesMock),
    ).toBe(true);
  });

  it('returns true for SContainer with data in child group', () => {
    const mockData = {
      parentName: {
        groupName: {
          child1: { value: '' },
          child2: {
            nestedChild: { value: 'value2' },
          },
        },
      },
    };
    const getValuesMock = ((path: string) => {
      return get(mockData, path);
    }) as UseFormGetValues<FieldValues>;

    const container = {
      type: 'container',
      containerType: 'surrounding',
      components: [
        { name: 'child1', type: 'textVariable' },
        { name: 'child2', type: 'group' },
      ],
    } as FormComponentContainer;
    expect(
      formComponentHasData('parentName.groupName', container, getValuesMock),
    ).toBe(true);
  });

  it('returns true for SContainer with not data in child group', () => {
    const mockData = {
      parentName: {
        groupName: {
          child1: { value: '' },
          child2: {
            nestedChild: { value: '' },
          },
        },
      },
    };
    const getValuesMock = ((path: string) => {
      return get(mockData, path);
    }) as UseFormGetValues<FieldValues>;

    const container = {
      type: 'container',
      containerType: 'surrounding',
      components: [
        { name: 'child1', type: 'textVariable' },
        { name: 'child2', type: 'group' },
      ],
    } as FormComponentContainer;
    expect(
      formComponentHasData('parentName.groupName', container, getValuesMock),
    ).toBe(false);
  });

  it('returns false for SContainer without data', () => {
    const mockData = {
      parentName: {
        groupName: {
          child1: { value: '' },
          child2: { value: '' },
        },
      },
    };
    const getValuesMock = ((path: string) => {
      return get(mockData, path);
    }) as UseFormGetValues<FieldValues>;

    const container = {
      type: 'container',
      containerType: 'surrounding',
      components: [
        { name: 'child1', type: 'textVariable' },
        { name: 'child2', type: 'textVariable' },
      ],
    } as FormComponentContainer;
    expect(
      formComponentHasData('parentName.groupName', container, getValuesMock),
    ).toBe(false);
  });

  it('returns true for variable with data', () => {
    const mockData = {
      parentName: {
        groupName: {
          child1: { value: 'someValue' },
          child2: { value: 'someOtherValue' },
        },
      },
    };

    const getValuesMock = ((path: string) => {
      return get(mockData, path);
    }) as UseFormGetValues<FieldValues>;

    const variable = {
      name: 'child1',
      type: 'textVariable',
    } as FormComponentTextVar;
    expect(
      formComponentHasData('parentName.groupName', variable, getValuesMock),
    ).toBe(true);
  });

  it('returns false for variable without data', () => {
    const mockData = {
      parentName: {
        groupName: {
          child1: { value: '' },
          child2: { value: 'someOtherValue' },
        },
      },
    };

    const getValuesMock = ((path: string) => {
      return get(mockData, path);
    }) as UseFormGetValues<FieldValues>;

    const variable = {
      name: 'child1',
      type: 'textVariable',
    } as FormComponentTextVar;
    expect(
      formComponentHasData('parentName.groupName', variable, getValuesMock),
    ).toBe(false);
  });
});
