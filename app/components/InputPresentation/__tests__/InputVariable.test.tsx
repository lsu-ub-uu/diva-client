import type { FormComponentTextVar } from '@/components/FormGenerator/types';
import { describe, expect, it } from 'vitest';
import { InputVariable } from '../InputVariable';
import { render, screen } from '@testing-library/react';
import { IconButton } from '@/components/IconButton/IconButton';
import { XIcon } from 'lucide-react';
import userEvent from '@testing-library/user-event';

describe('InputVariable', () => {
  it('renders an Input', () => {
    const component = {
      type: 'textVariable',
      name: 'someNameInData',
      label: 'someNameInData',
      showLabel: true,
      mode: 'input',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
        minNumberOfRepeatingToShow: 1,
      },
      validation: {
        type: 'regex',
        pattern: '^[a-zA-Z]$',
      },
      inputType: 'input',
    } as FormComponentTextVar;

    render(<InputVariable component={component} path='somePath' />);
    expect(screen.getByLabelText('someNameInData')).toBeInTheDocument();
  });

  it('renders an Input with attributes', () => {
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
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
        minNumberOfRepeatingToShow: 1,
      },
      validation: {
        type: 'regex',
        pattern: '^[a-zA-Z]$',
      },
      inputType: 'input',
    } as FormComponentTextVar;

    render(<InputVariable component={component} path='somePath' />);
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
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
        minNumberOfRepeatingToShow: 1,
      },
      validation: {
        type: 'regex',
        pattern: '^[a-zA-Z]$',
      },
      inputType: 'input',
      finalValue: 'finalValue',
    } as FormComponentTextVar;

    render(<InputVariable component={component} path='somePath' />);
    expect(screen.getByText('someNameInData')).toBeInTheDocument();
    expect(screen.getByText('finalValue')).toBeInTheDocument();
  });

  it('renders without label', () => {
    const component = {
      type: 'textVariable',
      name: 'someNameInData',
      label: 'someNameInData',
      showLabel: false,
      mode: 'input',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
        minNumberOfRepeatingToShow: 1,
      },
      validation: {
        type: 'regex',
        pattern: '^[a-zA-Z]$',
      },
      inputType: 'input',
    } as FormComponentTextVar;

    render(<InputVariable component={component} path='somePath' />);
    expect(screen.queryByLabelText('someNameInData')).not.toBeInTheDocument();
  });

  it.each([
    ['textarea', 'TEXTAREA'],
    ['input', 'INPUT'],
  ])('renders as %s', (inputType, expectedTagName) => {
    const component = {
      type: 'textVariable',
      name: 'someNameInData',
      label: 'someNameInData',
      showLabel: true,
      mode: 'input',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
        minNumberOfRepeatingToShow: 1,
      },
      validation: {
        type: 'regex',
        pattern: '^[a-zA-Z]$',
      },
      inputType,
    } as FormComponentTextVar;

    render(<InputVariable component={component} path='somePath' />);
    const element = screen.getByLabelText('someNameInData');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe(expectedTagName);
  });

  it('renders an Input with actionButtons', () => {
    const component = {
      type: 'textVariable',
      name: 'someNameInData',
      label: 'someNameInData',
      showLabel: true,
      mode: 'input',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
        minNumberOfRepeatingToShow: 1,
      },
      validation: {
        type: 'regex',
        pattern: '^[a-zA-Z]$',
      },
      inputType: 'input',
    } as FormComponentTextVar;

    render(
      <InputVariable
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
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
        minNumberOfRepeatingToShow: 1,
      },
      validation: {
        type: 'regex',
        pattern: '^[a-zA-Z]$',
      },
      inputType: 'input',
    } as FormComponentTextVar;

    render(
      <InputVariable
        component={component}
        path='somePath'
        parentPresentationStyle={parentPresentationStyle as any}
      />,
    );
    const fieldset = screen.getByRole('group', { name: 'someNameInData' });
    expect(fieldset).toHaveAttribute('data-variant', parentPresentationStyle);
  });

  it('should validate input against pattern and show client validation error', async () => {
    const component = {
      type: 'textVariable',
      name: 'someNameInData',
      label: 'someNameInData',
      showLabel: true,
      mode: 'input',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
        minNumberOfRepeatingToShow: 1,
      },
      validation: {
        type: 'regex',
        pattern: '^[a-zA-Z]$',
      },
      inputType: 'input',
    } as FormComponentTextVar;

    render(<InputVariable component={component} path='somePath' />);

    const user = userEvent.setup();

    const input = screen.getByLabelText('someNameInData');
    await user.type(input, '???');
    await user.click(document.body);

    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
