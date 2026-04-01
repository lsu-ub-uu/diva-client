import type { FormComponentNumVar } from '@/components/FormGenerator/types';
import { IconButton } from '@/components/IconButton/IconButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { XIcon } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { InputNumberVariable } from '../InputNumberVariable';

describe('InputNumberVariable', () => {
  it('renders an InputNumber', () => {
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
      inputType: 'input',
    } as FormComponentNumVar;

    render(<InputNumberVariable component={component} path='somePath' />);
    expect(screen.getByLabelText('someNameInData')).toBeInTheDocument();
  });

  it('renders an InputNumber with attributes', () => {
    const component = {
      type: 'textVariable',
      name: 'someNameInData',
      label: 'someNameInData',
      showLabel: true,
      mode: 'input',
      attributes: [
        {
          name: 'language',
          presentationId: 'somePresentationIdLanguage1',
          type: 'collectionVariable',
          placeholder: 'initialEmptyValueText',
          mode: 'input',
          tooltip: {
            title: 'languageCollectionVarText',
            body: 'languageCollectionVarDefText',
          },
          label: 'languageCollectionVarText',
          showLabel: true,
          options: [
            {
              value: 'eng',
              label: 'engLangItemText',
            },
            {
              value: 'swe',
              label: 'sweLangItemText',
            },
          ],
        },
      ],
      validation: {
        type: 'number',
        min: 1,
        max: 20,
        warningMin: 2,
        warningMax: 10,
        numberOfDecimals: 0,
      },
      inputType: 'input',
    } as FormComponentNumVar;

    render(<InputNumberVariable component={component} path='somePath' />);
    expect(
      screen.getByRole('combobox', { name: 'languageCollectionVarText' }),
    ).toBeInTheDocument();
  });

  it('renders a finalValue', () => {
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
      inputType: 'input',
      finalValue: '99999',
    } as FormComponentNumVar;

    render(<InputNumberVariable component={component} path='somePath' />);
    expect(screen.getByText('someNameInData')).toBeInTheDocument();
    expect(screen.getByText('99999')).toBeInTheDocument();
  });

  it('renders without label', () => {
    const component = {
      type: 'textVariable',
      name: 'someNameInData',
      label: 'someNameInData',
      showLabel: false,
      mode: 'input',
      validation: {
        type: 'number',
        min: 1,
        max: 20,
        warningMin: 2,
        warningMax: 10,
        numberOfDecimals: 0,
      },
      inputType: 'input',
    } as FormComponentNumVar;

    render(<InputNumberVariable component={component} path='somePath' />);
    expect(screen.queryByLabelText('someNameInData')).not.toBeInTheDocument();
  });

  it('renders with actionButtons', () => {
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
      inputType: 'input',
    } as FormComponentNumVar;

    render(
      <InputNumberVariable
        component={component}
        path='somePath'
        actionButtonGroup={
          <IconButton tooltip='Close'>
            <XIcon />
          </IconButton>
        }
      />,
    );
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it.each([
    ['inline', 'inline'],
    ['block', 'block'],
  ])('renders with parentPresentationStyle=%s', (parentPresentationStyle) => {
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
      inputType: 'input',
    } as FormComponentNumVar;

    render(
      <InputNumberVariable
        component={component}
        path='somePath'
        parentPresentationStyle={parentPresentationStyle as any}
      />,
    );
    const fieldset = screen.getByRole('group', { name: 'someNameInData' });
    expect(fieldset).toHaveAttribute('data-variant', parentPresentationStyle);
  });

  it.todo(
    'should validate input against pattern and show client validation error',
    async () => {
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
        inputType: 'input',
      } as FormComponentNumVar;

      render(<InputNumberVariable component={component} path='somePath' />);

      const user = userEvent.setup();

      const input = screen.getByLabelText('someNameInData');
      await user.type(input, '21');
      await user.click(document.body);

      expect(input).toHaveAttribute('aria-invalid', 'true');
    },
  );
});
