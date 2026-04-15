import type { FormComponentNumVar } from '@/components/FormGenerator/types';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InputFieldArray } from '../InputFieldArray';
import userEvent from '@testing-library/user-event';

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

  it.each(
    Array.from({ length: 11 }, (_, minNumberOfRepeatingToShow) => ({
      minNumberOfRepeatingToShow,
    })),
  )(
    'render correct minNumberOfRepeatingToShow $minNumberOfRepeatingToShow',
    ({ minNumberOfRepeatingToShow }) => {
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
          repeatMax: 20,
          minNumberOfRepeatingToShow,
        },
        inputType: 'input',
      } as FormComponentNumVar;

      render(
        <InputFieldArray path='path' component={component} initialData={[]} />,
      );

      expect(screen.queryAllByRole('textbox')).toHaveLength(
        minNumberOfRepeatingToShow,
      );

      expect(
        screen.getByRole('button', { name: 'divaClient_addFieldText' }),
      ).toBeInTheDocument();
    },
  );

  it('does not render add button when repeatMax is reached', async () => {
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
        repeatMax: 2,
      },
      inputType: 'input',
    } as FormComponentNumVar;

    render(
      <InputFieldArray path='path' component={component} initialData={[]} />,
    );

    const button = screen.getByRole('button', {
      name: 'divaClient_addFieldText',
    });
    expect(button).toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(button);

    expect(
      screen.queryByRole('button', { name: 'divaClient_addFieldText' }),
    ).not.toBeInTheDocument();
  });

  it('handles handleAppend', async () => {
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
        minNumberOfRepeatingToShow: 1,
      },
      inputType: 'input',
    } as FormComponentNumVar;

    render(
      <InputFieldArray path='path' component={component} initialData={[]} />,
    );

    const button = screen.getByRole('button', {
      name: 'divaClient_addFieldText',
    });
    expect(button).toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(button);

    expect(
      screen.getAllByRole('textbox', { name: 'someNameInData' }),
    ).toHaveLength(2);
  });

  it('handles handleRemove', async () => {
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
        minNumberOfRepeatingToShow: 2,
      },
      inputType: 'input',
    } as FormComponentNumVar;

    render(
      <InputFieldArray path='path' component={component} initialData={[]} />,
    );

    const button = screen.getAllByLabelText('divaClient_deleteFieldText');

    const user = userEvent.setup();

    await user.click(button[0]);

    expect(
      screen.getAllByRole('textbox', { name: 'someNameInData' }),
    ).toHaveLength(1);
  });

  it('handles handleMove up', async () => {
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
        minNumberOfRepeatingToShow: 2,
      },
      inputType: 'input',
    } as FormComponentNumVar;

    render(
      <InputFieldArray path='path' component={component} initialData={[]} />,
    );
    const firstInput = screen.getAllByRole('textbox', {
      name: 'someNameInData',
    })[0];
    await userEvent.type(firstInput, 'first');
    const secondInput = screen.getAllByRole('textbox', {
      name: 'someNameInData',
    })[1];
    await userEvent.type(secondInput, 'second');

    const button = screen.getAllByLabelText('divaClient_moveFieldUpText');

    const user = userEvent.setup();

    await user.click(button[1]);

    const inputsAfterMove = screen.getAllByRole('textbox', {
      name: 'someNameInData',
    });

    expect((inputsAfterMove[0] as HTMLInputElement).value).toBe('second');
    expect((inputsAfterMove[1] as HTMLInputElement).value).toBe('first');
  });

  it('handles handleMove down', async () => {
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
        minNumberOfRepeatingToShow: 2,
      },
      inputType: 'input',
    } as FormComponentNumVar;

    render(
      <InputFieldArray path='path' component={component} initialData={[]} />,
    );
    const firstInput = screen.getAllByRole('textbox', {
      name: 'someNameInData',
    })[0];
    await userEvent.type(firstInput, 'first');
    const secondInput = screen.getAllByRole('textbox', {
      name: 'someNameInData',
    })[1];
    await userEvent.type(secondInput, 'second');

    const button = screen.getAllByLabelText('divaClient_moveFieldDownText');

    const user = userEvent.setup();

    await user.click(button[0]);

    const inputsAfterMove = screen.getAllByRole('textbox', {
      name: 'someNameInData',
    });

    expect((inputsAfterMove[0] as HTMLInputElement).value).toBe('second');
    expect((inputsAfterMove[1] as HTMLInputElement).value).toBe('first');
  });
});
