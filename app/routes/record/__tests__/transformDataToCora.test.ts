import { transform } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import { transformFormDataToCora } from '../transformFormDataToCora';

describe('transformDataToCora', () => {
  it('transforms variable with data', () => {
    const formData = new FormData();
    formData.append('root[0].variable[0]', 'some value');

    const result = transformFormDataToCora(formData);

    expect(result).toStrictEqual({
      name: 'root',
      children: [
        {
          name: 'variable',
          value: 'some value',
        },
      ],
    });
  });

  it('removes variable when no data', () => {
    const formData = new FormData();
    formData.append('root[0].variable[0]', 'some value');
    formData.append('root[0].variable2[0]', '');

    const result = transformFormDataToCora(formData);

    expect(result).toStrictEqual({
      name: 'root',
      children: [
        {
          name: 'variable',
          value: 'some value',
        },
      ],
    });
  });

  it('transforms data with repeat id', () => {
    const formData = new FormData();
    formData.append('root[0].variable[0]', 'some value');
    formData.append('root[0].variable[0]._repeatId', '1');
    formData.append('root[0].variable[1]', 'some other value');
    formData.append('root[0].variable[1]._repeatId', '2');

    const result = transformFormDataToCora(formData);

    expect(result).toStrictEqual({
      name: 'root',
      children: [
        {
          name: 'variable',
          value: 'some value',
          repeatId: '1',
        },
        {
          name: 'variable',
          value: 'some other value',
          repeatId: '2',
        },
      ],
    });
  });

  it('transforms group with repeat id', () => {
    const formData = new FormData();
    formData.append('root[0].childGroup[0]._repeatId', '1');
    formData.append('root[0].childGroup[0].variable', 'some value');

    const result = transformFormDataToCora(formData);

    expect(result).toStrictEqual({
      name: 'root',
      children: [
        {
          name: 'childGroup',
          repeatId: '1',
          children: [
            {
              name: 'variable',
              value: 'some value',
            },
          ],
        },
      ],
    });
  });

  it('does not remove attibute when data', () => {
    const formData = new FormData();
    formData.append('root[0].variable[0]', 'some value');
    formData.append('root[0].variable[0]._color', 'blue');

    const result = transformFormDataToCora(formData);

    expect(result).toStrictEqual({
      name: 'root',
      children: [
        {
          name: 'variable',
          value: 'some value',
          attributes: {
            color: 'blue',
          },
        },
      ],
    });
  });

  it('does removes _repeatId when no data', () => {
    const formData = new FormData();
    formData.append('root[0].variable1[0]', 'some value');
    formData.append('root[0].variable[0]', '');
    formData.append('root[0].variable[0]._repeatId', '1');

    const result = transformFormDataToCora(formData);

    expect(result).toStrictEqual({
      name: 'root',
      children: [
        {
          name: 'variable1',
          value: 'some value',
        },
      ],
    });
  });

  it('does remove value with only attribute', () => {
    const formData = new FormData();
    formData.append('root[0].variable[0]', '');
    formData.append('root[0].variable[0]._color', 'blue');

    const result = transformFormDataToCora(formData);

    expect(result).toStrictEqual(undefined);
  });

  it('does remove attibute when no data', () => {
    const formData = new FormData();
    formData.append('root[0].variable[0]', 'some value');
    formData.append('root[0].variable[0]._color', '');

    const result = transformFormDataToCora(formData);

    expect(result).toStrictEqual({
      name: 'root',
      children: [
        {
          name: 'variable',
          value: 'some value',
        },
      ],
    });
  });

  it('does remove recordLink when no data', () => {});
});
