import type { FormComponentWithData } from '@/components/FormGenerator/types';
import { describe, expect, it } from 'vitest';
import { ValidationErrorContext } from '../InputPresentation';
import { InputAttributes } from '../InputAttributes';
import { render, screen } from '@testing-library/react';
import type { CoraData } from '@/cora/cora-data/types.server';
import type { ValidationError } from '../validateFormData';
import type { PropsWithChildren } from 'react';

describe('InputAttributes', () => {
  const wrapper = ({ children }: PropsWithChildren) => (
    <ValidationErrorContext.Provider value={{}}>
      {children}
    </ValidationErrorContext.Provider>
  );

  it('renders nothing if no attributes', () => {
    const component = {
      type: 'textVariable',
      name: 'someField',
      label: 'someLabel',
      showLabel: true,
      mode: 'input',
    } as FormComponentWithData;

    const { container } = render(
      <InputAttributes
        component={component}
        path='somePath'
        data={undefined}
      />,
      { wrapper },
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders select when attribute without finalValue', () => {
    const component = {
      type: 'textVariable',
      name: 'someField',
      label: 'someLabel',
      showLabel: true,
      mode: 'input',
      attributes: [
        {
          name: 'color',
          label: 'attribute.color',
          placeholder: 'Select a color',
          options: [
            { value: 'red', label: 'Red' },
            { value: 'blue', label: 'Blue' },
          ],
        },
      ],
    } as FormComponentWithData;

    render(
      <InputAttributes
        component={component}
        path='somePath'
        data={undefined}
      />,
      { wrapper },
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders hidden input when attribute has finalValue', () => {
    const component = {
      type: 'textVariable',
      name: 'someField',
      label: 'someLabel',
      showLabel: true,
      mode: 'input',
      attributes: [
        {
          name: 'color',
          label: 'attribute.color',
          placeholder: 'Select a color',
          options: [
            { value: 'red', label: 'Red' },
            { value: 'blue', label: 'Blue' },
          ],
          finalValue: 'red',
        },
      ],
      attributesToShow: 'all',
    } as FormComponentWithData;

    const { container } = render(
      <InputAttributes
        component={component}
        path='somePath'
        data={undefined}
      />,
      { wrapper },
    );
    const hiddenInput = container.querySelector('input[type="hidden"]');
    expect(hiddenInput).toBeInTheDocument();
    expect(hiddenInput).toHaveAttribute('name', 'somePath._color');
    expect(hiddenInput).toHaveAttribute('value', 'red');
  });

  it.each([
    ['all', true],
    ['selectable', false],
    ['none', false],
  ])(
    'handles finalValue text visibility when attributesToShow is %s',
    (attributesToShow, shouldShowValueText) => {
      const component = {
        type: 'textVariable',
        name: 'someField',
        label: 'someLabel',
        showLabel: true,
        mode: 'input',
        finalValue: 'red',
        attributes: [
          {
            name: 'color',
            label: 'attribute.color',
            placeholder: 'Select a color',
            options: [
              { value: 'red', label: 'Red' },
              { value: 'blue', label: 'Blue' },
            ],
            finalValue: 'red',
          },
        ],
        attributesToShow,
      } as FormComponentWithData;

      const { container } = render(
        <InputAttributes
          component={component}
          path='somePath'
          data={undefined}
        />,
        { wrapper },
      );

      const hiddenInput = container.querySelector('input[type="hidden"]');
      expect(hiddenInput).toBeInTheDocument();
      if (shouldShowValueText) {
        expect(screen.getByText(/Red/)).toBeInTheDocument();
      } else {
        expect(screen.queryByText(/Red/)).not.toBeInTheDocument();
      }
    },
  );

  it('renders select with correct options', () => {
    const component = {
      type: 'textVariable',
      name: 'someField',
      label: 'someLabel',
      showLabel: true,
      mode: 'input',
      attributes: [
        {
          name: 'color',
          label: 'attribute.color',
          placeholder: 'Select a color',
          options: [
            { value: 'red', label: 'Red' },
            { value: 'blue', label: 'Blue' },
          ],
        },
      ],
    } as FormComponentWithData;

    render(
      <InputAttributes
        component={component}
        path='somePath'
        data={undefined}
      />,
      { wrapper },
    );
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[1]).toHaveTextContent('Red');
    expect(options[2]).toHaveTextContent('Blue');
  });

  it('sets default value from data', () => {
    const data = {
      attributes: { color: 'blue' },
    } as unknown as CoraData;

    const component = {
      type: 'textVariable',
      name: 'someField',
      label: 'someLabel',
      showLabel: true,
      mode: 'input',
      attributes: [
        {
          name: 'color',
          label: 'attribute.color',
          placeholder: 'Select a color',
          options: [
            { value: 'red', label: 'Red' },
            { value: 'blue', label: 'Blue' },
          ],
        },
      ],
    } as FormComponentWithData;

    render(
      <InputAttributes component={component} path='somePath' data={data} />,
      { wrapper },
    );
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('blue');
  });

  it('handles multiple attributes', () => {
    const component = {
      type: 'textVariable',
      name: 'someField',
      label: 'someLabel',
      showLabel: true,
      mode: 'input',
      attributes: [
        {
          name: 'color',
          label: 'color',
          placeholder: 'Select a color',
          options: [
            { value: 'red', label: 'Red' },
            { value: 'blue', label: 'Blue' },
          ],
        },
        {
          name: 'size',
          label: 'size',
          placeholder: 'Select a size',
          options: [
            { value: 'small', label: 'Small' },
            { value: 'large', label: 'Large' },
          ],
        },
      ],
    } as FormComponentWithData;

    render(
      <InputAttributes
        component={component}
        path='somePath'
        data={undefined}
      />,
      { wrapper },
    );
    expect(screen.getByText('color')).toBeInTheDocument();
    expect(screen.getByText('size')).toBeInTheDocument();
    const selects = screen.getAllByRole('combobox');
    expect(selects).toHaveLength(2);
  });

  it('applies aria-invalid when validation error exists', () => {
    const validationErrors: Record<string, ValidationError> = {
      'somePath._color': {
        message: 'Required',
        label: 'Color',
        type: 'required',
      },
    };

    const errorWrapper = ({ children }: PropsWithChildren) => (
      <ValidationErrorContext.Provider value={validationErrors}>
        {children}
      </ValidationErrorContext.Provider>
    );

    const component = {
      type: 'textVariable',
      name: 'someField',
      label: 'someLabel',
      showLabel: true,
      mode: 'input',
      attributes: [
        {
          name: 'color',
          label: 'attribute.color',
          placeholder: 'Select a color',
          options: [
            { value: 'red', label: 'Red' },
            { value: 'blue', label: 'Blue' },
          ],
        },
      ],
    } as FormComponentWithData;

    render(
      <InputAttributes
        component={component}
        path='somePath'
        data={undefined}
      />,
      { wrapper: errorWrapper },
    );
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-invalid', 'true');
  });
});
