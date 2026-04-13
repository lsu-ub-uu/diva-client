import type { FormComponentNumVar } from '@/components/FormGenerator/types';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InputFieldArray } from '../InputFieldArray';

describe('InputFieldArray', () => {
  it('render InputFieldArray', () => {
    const component = {
      type: 'textVariable',
      name: 'someNameInData',
      label: 'someNameInData',
      showLabel: true,
      mode: 'input',
      validation: {
        type: 'number',
        min: 1,
        max: 20,
        warningMin: 2,
        warningMax: 10,
        numberOfDecimals: 0,
      },
      repeat: {
        repeatMin: 1,
        repeatMax: 5,
      },
      inputType: 'input',
    } as FormComponentNumVar;

    render(
      <InputFieldArray path='path' component={component} initialData={[]} />,
    );

    expect(
      screen.getByRole('textbox', { name: 'someNameInData' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'divaClient_addFieldText' }),
    ).toBeInTheDocument();
  });

  it('render correct minNumberOfRepeatingToShow', () => {
    const component = {
      type: 'textVariable',
      name: 'someNameInData',
      label: 'someNameInData',
      showLabel: true,
      mode: 'input',
      validation: {
        type: 'number',
        min: 1,
        max: 20,
        warningMin: 2,
        warningMax: 10,
        numberOfDecimals: 0,
      },
      repeat: {
        repeatMin: 1,
        repeatMax: 5,
        minNumberOfRepeatingToShow: 0,
      },
      inputType: 'input',
    } as FormComponentNumVar;

    render(
      <InputFieldArray path='path' component={component} initialData={[]} />,
    );

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'divaClient_addFieldText' }),
    ).toBeInTheDocument();
  });
});
