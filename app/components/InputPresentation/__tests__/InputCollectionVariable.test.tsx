import type { FormComponentCollVar } from '@/components/FormGenerator/types';
import { IconButton } from '@/components/IconButton/IconButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { XIcon } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { InputCollectionVariable } from '../InputCollectionVariable';

describe('InputCollectionVariable', () => {
  it('renders an InputCollection', () => {
    const component = {
      type: 'collectionVariable',
      name: 'someNameInData',
      label: 'someNameInData',
      showLabel: true,
      mode: 'input',
      options: [
        {
          value: 'value1',
          label: 'value1LangItemText',
        },
        {
          value: 'value2',
          label: 'value2LangItemText',
        },
      ],
      inputType: 'input',
    } as FormComponentCollVar;

    render(<InputCollectionVariable component={component} path='somePath' />);
    expect(screen.getByLabelText('someNameInData')).toBeInTheDocument();
  });

  it('renders an InputCollection with attributes', () => {
    const component = {
      type: 'collectionVariable',
      name: 'someNameInData',
      label: 'someNameInData',
      showLabel: true,
      mode: 'input',
      options: [
        {
          value: 'value1',
          label: 'value1LangItemText',
        },
        {
          value: 'value2',
          label: 'value2LangItemText',
        },
      ],
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
      inputType: 'input',
    } as FormComponentCollVar;

    render(<InputCollectionVariable component={component} path='somePath' />);
    expect(
      screen.getByRole('combobox', { name: 'languageCollectionVarText' }),
    ).toBeInTheDocument();
  });

  it('renders a finalValue', () => {
    const component = {
      type: 'collectionVariable',
      name: 'someNameInData',
      label: 'someNameInData',
      showLabel: true,
      mode: 'input',
      options: [
        {
          value: 'value1',
          label: 'value1LangItemText',
        },
        {
          value: 'value2',
          label: 'value2LangItemText',
        },
      ],
      inputType: 'input',
      finalValue: 'someFinalValue',
    } as FormComponentCollVar;

    render(<InputCollectionVariable component={component} path='somePath' />);
    expect(screen.getByText('someNameInData')).toBeInTheDocument();
    expect(screen.getByText('someFinalValue')).toBeInTheDocument();
  });

  it('renders without label', () => {
    const component = {
      type: 'collectionVariable',
      name: 'someNameInData',
      label: 'someNameInData',
      showLabel: false,
      mode: 'input',
      inputType: 'input',
      options: [
        {
          value: 'value1',
          label: 'value1LangItemText',
        },
        {
          value: 'value2',
          label: 'value2LangItemText',
        },
      ],
    } as FormComponentCollVar;

    render(<InputCollectionVariable component={component} path='somePath' />);
    expect(screen.queryByLabelText('someNameInData')).not.toBeInTheDocument();
  });

  it('renders with actionButtons', () => {
    const component = {
      type: 'collectionVariable',
      name: 'someNameInData',
      label: 'someNameInData',
      showLabel: true,
      mode: 'input',
      inputType: 'input',
      options: [
        {
          value: 'value1',
          label: 'value1LangItemText',
        },
        {
          value: 'value2',
          label: 'value2LangItemText',
        },
      ],
    } as FormComponentCollVar;

    render(
      <InputCollectionVariable
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
      type: 'collectionVariable',
      name: 'someNameInData',
      label: 'someNameInData',
      showLabel: true,
      mode: 'input',
      inputType: 'input',
      options: [
        {
          value: 'value1',
          label: 'value1LangItemText',
        },
        {
          value: 'value2',
          label: 'value2LangItemText',
        },
      ],
    } as FormComponentCollVar;

    render(
      <InputCollectionVariable
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
        type: 'collectionVariable',
        name: 'someNameInData',
        label: 'someNameInData',
        showLabel: true,
        mode: 'input',
        inputType: 'input',
        options: [
          {
            value: 'value1',
            label: 'value1LangItemText',
          },
          {
            value: 'value2',
            label: 'value2LangItemText',
          },
        ],
      } as FormComponentCollVar;

      render(<InputCollectionVariable component={component} path='somePath' />);

      const user = userEvent.setup();

      const input = screen.getByLabelText('someNameInData');
      await user.type(input, '21');
      await user.click(document.body);

      expect(input).toHaveAttribute('aria-invalid', 'true');
    },
  );
});
