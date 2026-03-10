import type {
  FormComponentGroup,
  FormComponentTextVar,
} from '@/components/FormGenerator/types';
import { describe, expect, it } from 'vitest';
import { transformToOutputData } from '../transformToOutputData';

describe('transformToOutputData', () => {
  it('should return a textVar with no difference in target schema', () => {
    const targetFormComponent = {
      type: 'group',
      name: 'root',
      components: [
        {
          name: 'someText',
        } as FormComponentTextVar,
      ],
    } as FormComponentGroup;

    const data = { root: { someText: { value: 'someValue' } } };

    const transformed = transformToOutputData(data, targetFormComponent);

    expect(transformed).toEqual({
      root: {
        someText: { value: 'someValue' },
      },
    });
  });

  it('should return a textVar with attribute with final value and no difference in target schema', () => {
    const targetFormComponent = {
      type: 'group',
      name: 'root',
      components: [
        {
          name: 'someText',
          attributes: [{ name: 'someAttr', finalValue: 'someFinalValue' }],
        } as FormComponentTextVar,
      ],
    } as FormComponentGroup;

    const data = {
      root: {
        someText_someAttr_someFinalValue: {
          value: 'someValue',
          _someAttr: 'someFinalValue',
        },
      },
    };

    const transformed = transformToOutputData(data, targetFormComponent);

    expect(transformed).toEqual({
      root: {
        someText_someAttr_someFinalValue: {
          value: 'someValue',
          _someAttr: 'someFinalValue',
        },
      },
    });
  });

  it('should return a textVar with multiple attribute and no difference in target schema', () => {
    const targetFormComponent = {
      type: 'group',
      name: 'root',
      components: [
        {
          name: 'someText',
          attributes: [
            { name: 'someAttr', finalValue: 'someFinalValue' },
            { name: 'someOtherAttr' },
          ],
        } as FormComponentTextVar,
      ],
    } as FormComponentGroup;

    const data = {
      root: {
        someText_someAttr_someFinalValue: {
          value: 'someValue',
          _someAttr: 'someFinalValue',
          _someOtherAttr: 'someOtherValue',
        },
      },
    };

    const transformed = transformToOutputData(data, targetFormComponent);

    expect(transformed).toEqual({
      root: {
        someText_someAttr_someFinalValue: {
          value: 'someValue',
          _someAttr: 'someFinalValue',
          _someOtherAttr: 'someOtherValue',
        },
      },
    });
  });

  it('should handle targetSchema having different final values than data', () => {
    const targetFormComponent = {
      type: 'group',
      name: 'root',
      components: [
        {
          name: 'someText',
          attributes: [{ name: 'someAttr' }],
        } as FormComponentTextVar,
      ],
    } as FormComponentGroup;

    const data = {
      root: {
        someText_someAttr_someFinalValue: {
          value: 'someValue',
          _someAttr: 'someFinalValue',
        },
      },
    };

    const transformed = transformToOutputData(data, targetFormComponent);

    expect(transformed).toEqual({
      root: {
        someText: {
          value: 'someValue',
          _someAttr: 'someFinalValue',
        },
      },
    });
  });

  it('should handle targetSchema having multiple variables with same nameInData with same attributes but diffrent finalValues in schema', () => {
    const targetFormComponent = {
      type: 'group',
      name: 'root',
      components: [
        {
          name: 'someText',
          attributes: [{ name: 'someAttr', finalValue: 'someFinalValue' }],
        } as FormComponentTextVar,
        {
          name: 'someText',
          attributes: [{ name: 'someAttr', finalValue: 'someOtherFinalValue' }],
        } as FormComponentTextVar,
      ],
    } as FormComponentGroup;

    const data = {
      root: {
        someText_someAttr_someFinalValue: {
          value: 'someValue',
          _someAttr: 'someFinalValue',
        },
        someText_someAttr_someOtherFinalValue: {
          value: 'someOtherValue',
          _someAttr: 'someOtherFinalValue',
        },
      },
    };

    const transformed = transformToOutputData(data, targetFormComponent);

    expect(transformed).toEqual({
      root: {
        someText_someAttr_someFinalValue: {
          value: 'someValue',
          _someAttr: 'someFinalValue',
        },
        someText_someAttr_someOtherFinalValue: {
          value: 'someOtherValue',
          _someAttr: 'someOtherFinalValue',
        },
      },
    });
  });
});
