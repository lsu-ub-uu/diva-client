import { describe } from 'vitest';
import { parseAndValidateFormData } from '@/utils/parseAndValidateFormData';
import type { RecordFormSchema } from '@/components/FormGenerator/types';

describe('parseAndValidateFormData', () => {
  it('returns parsed data when valid', () => {
    const formDefinition: RecordFormSchema = {
      validationTypeId: '',
      form: {
        name: 'output',
        label: '',
        showLabel: true,
        type: 'group',

        components: [
          {
            name: 'name',
            type: 'textVariable',
            label: '',
            showLabel: true,
            repeat: { repeatMax: 1, repeatMin: 1 },
            validation: {
              pattern: '.*',
              type: 'regex',
            },
          },
        ],
      },
    };

    const formData = new FormData();
    formData.append('output.name.value', 'Pelle');

    const { parsedFormData, errors } = parseAndValidateFormData(
      formDefinition,
      formData,
    );

    expect(parsedFormData).toStrictEqual({
      output: {
        name: {
          value: 'Pelle',
        },
      },
    });
    expect(errors).not.toBeDefined();
  });

  it('returns parsed data and errors when invalid', () => {
    const formDefinition: RecordFormSchema = {
      validationTypeId: '',
      form: {
        name: 'output',
        label: '',
        showLabel: true,
        type: 'group',

        components: [
          {
            name: 'name',
            type: 'textVariable',
            label: '',
            showLabel: true,
            repeat: { repeatMax: 1, repeatMin: 1 },
            validation: {
              pattern: 'Olle',
              type: 'regex',
            },
          },
          {
            name: 'age',
            type: 'textVariable',
            label: '',
            showLabel: true,
            repeat: { repeatMax: 1, repeatMin: 1 },
            validation: {
              pattern: '[0-9]+',
              type: 'regex',
            },
          },
          {
            name: 'city',
            type: 'textVariable',
            label: '',
            showLabel: true,
            repeat: { repeatMax: 1, repeatMin: 1 },
            validation: {
              pattern: 'Uppsala',
              type: 'regex',
            },
          },
        ],
      },
    };

    const formData = new FormData();
    formData.append('output.name.value', 'Pelle');
    formData.append('output.age.value', 'tjutre');
    formData.append('output.city.value', 'Uppsala');

    const { parsedFormData, errors } = parseAndValidateFormData(
      formDefinition,
      formData,
    );

    expect(parsedFormData).toStrictEqual({
      output: {
        name: {
          value: 'Pelle',
        },
        age: {
          value: 'tjutre',
        },
        city: {
          value: 'Uppsala',
        },
      },
    });
    expect(errors).toStrictEqual({
      'output.name.value': ['Invalid input format'],
      'output.age.value': ['Invalid input format'],
    });
  });
});
