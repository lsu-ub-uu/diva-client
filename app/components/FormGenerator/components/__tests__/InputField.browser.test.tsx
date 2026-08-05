/*
 * Copyright 2025 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import { InputField } from '@/components/FormGenerator/components/InputField';
import type {
  FormComponentCollVar,
  FormComponentNumVar,
  FormComponentTextVar,
} from '@/components/FormGenerator/types';
import { FieldContext } from '@/components/Input/Fieldset';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { FormProvider, useForm } from 'react-hook-form';

vi.mock('@/utils/useHydrated', () => ({
  useHydrated: vi.fn(),
}));

import { useHydrated } from '@/utils/useHydrated';

const fieldContextValue = {
  ids: {
    label: 'test-label',
    details: 'test-details',
    input: 'test-input',
    error: 'test-error',
  },
  validationError: false,
};

interface WrapperProps {
  component: FormComponentTextVar | FormComponentNumVar;
  path?: string;
  invalid?: boolean;
  defaultValues?: Record<string, string>;
}

const Wrapper = ({
  component,
  path = 'field',
  invalid = false,
  defaultValues = {},
}: WrapperProps) => {
  const methods = useForm({ defaultValues });
  return (
    <FormProvider {...methods}>
      <FieldContext value={fieldContextValue}>
        <InputField
          component={component}
          path={path}
          invalid={invalid}
          register={methods.register}
          control={methods.control}
        />
      </FieldContext>
    </FormProvider>
  );
};

const textVarComponent: FormComponentTextVar = {
  type: 'textVariable',
  name: 'field',
  label: 'fieldLabelTextId',
  showLabel: true,
  inputType: 'input',
  mode: 'input',
};

const numVarComponent: FormComponentNumVar = {
  type: 'numberVariable',
  name: 'field',
  label: 'fieldLabelTextId',
  showLabel: true,
  mode: 'input',
};

const collVarComponent = {
  type: 'collectionVariable',
  name: 'field',
  label: 'fieldLabelTextId',
  showLabel: true,
  mode: 'input',
  options: [
    { value: 'option1', label: 'option1LabelTextId' },
    { value: 'option2', label: 'option2LabelTextId' },
  ],
} as FormComponentCollVar;

const collVarWith21Options = {
  ...collVarComponent,
  options: Array.from({ length: 21 }, (_, i) => ({
    value: `option${i}`,
    label: `option${i}LabelTextId`,
  })),
} as FormComponentCollVar;

beforeEach(() => {
  vi.mocked(useHydrated).mockReturnValue(true);
});

describe('InputField', () => {
  describe('collVar with less than or equal to 20 options renders Select', () => {
    it('renders a select element with placeholder and translated options', async () => {
      const screen = await render(<Wrapper component={collVarComponent} />);

      const select = screen.getByRole('combobox');
      await expect.element(select).toBeVisible();

      const options = select.element().querySelectorAll('option');
      expect(options).toHaveLength(3); // placeholder + 2 options
      expect(options[0].value).toBe('');
      expect(options[1].value).toBe('option1');
      expect(options[2].value).toBe('option2');
    });

    it('sets aria-label when showLabel is false', async () => {
      const component = {
        ...collVarComponent,
        showLabel: false,
      } as unknown as FormComponentTextVar;

      const screen = await render(<Wrapper component={component} />);

      await expect
        .element(screen.getByRole('combobox', { name: 'fieldLabelTextId' }))
        .toBeVisible();
    });

    it('does not set aria-label when showLabel is true', async () => {
      const screen = await render(<Wrapper component={collVarComponent} />);

      const select = screen.getByRole('combobox');
      expect(select.element().getAttribute('aria-label')).toBeNull();
    });

    it('sets aria-details from FieldContext', async () => {
      const screen = await render(<Wrapper component={collVarComponent} />);

      const select = screen.getByRole('combobox');
      expect(select.element().getAttribute('aria-details')).toBe(
        'test-details',
      );
    });

    it('sets aria-invalid when invalid is true', async () => {
      const screen = await render(
        <Wrapper component={collVarComponent} invalid={true} />,
      );

      const select = screen.getByRole('combobox');
      expect(select.element().getAttribute('aria-invalid')).toBe('true');
    });

    it('does not set data-has-value when value is empty', async () => {
      const screen = await render(<Wrapper component={collVarComponent} />);

      const select = screen.getByRole('combobox');
      expect(select.element().hasAttribute('data-has-value')).toBe(false);
    });

    it('sets data-has-value when field has a value', async () => {
      const screen = await render(
        <Wrapper
          component={collVarComponent}
          defaultValues={{ field: 'option1' }}
        />,
      );

      const select = screen.getByRole('combobox');
      expect(select.element().hasAttribute('data-has-value')).toBe(true);
    });
  });

  describe('collVar with more than 20 options and hydrated renders a Combobox', () => {
    it('renders a Combobox instead of a select', async () => {
      vi.mocked(useHydrated).mockReturnValue(true);

      const { container } = await render(
        <Wrapper component={collVarWith21Options} />,
      );

      expect(container.querySelector('select')).toBeNull();
      expect(container.querySelector('input')).not.toBeNull();
    });

    it('forwards invalid state to the Combobox', async () => {
      vi.mocked(useHydrated).mockReturnValue(true);

      const screen = await render(
        <Wrapper component={collVarWith21Options} invalid={true} />,
      );

      await expect
        .element(screen.getByRole('combobox'))
        .toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('collVar with more than 20 options and not hydrated renders a select', () => {
    it('falls back to Select when not hydrated', async () => {
      vi.mocked(useHydrated).mockReturnValue(false);

      const { container } = await render(
        <Wrapper component={collVarWith21Options} />,
      );

      const select = container.querySelector('select');
      expect(select).not.toBeNull();
      expect(select?.querySelectorAll('option')).toHaveLength(22);
    });
  });

  describe('textVar with inputType textarea renders textarea', () => {
    const textareaComponent: FormComponentTextVar = {
      ...textVarComponent,
      inputType: 'textarea',
    };

    it('renders a textarea element', async () => {
      const screen = await render(<Wrapper component={textareaComponent} />);

      await expect.element(screen.getByRole('textbox')).toBeVisible();
      expect(screen.getByRole('textbox').element().tagName.toLowerCase()).toBe(
        'textarea',
      );
    });

    it('is readOnly when finalValue is set', async () => {
      const component: FormComponentTextVar = {
        ...textareaComponent,
        finalValue: 'locked value',
      };

      const screen = await render(<Wrapper component={component} />);

      expect(screen.getByRole('textbox').element()).toHaveProperty(
        'readOnly',
        true,
      );
    });

    it('is not readOnly when finalValue is not set', async () => {
      const screen = await render(<Wrapper component={textareaComponent} />);

      expect(screen.getByRole('textbox').element()).toHaveProperty(
        'readOnly',
        false,
      );
    });

    it('sets translated placeholder when provided', async () => {
      const component: FormComponentTextVar = {
        ...textareaComponent,
        placeholder: 'somePlaceholderTextId',
      };

      const screen = await render(<Wrapper component={component} />);

      await expect
        .element(screen.getByRole('textbox'))
        .toHaveAttribute('placeholder', 'somePlaceholderTextId');
    });

    it('sets aria-invalid when invalid is true', async () => {
      const screen = await render(
        <Wrapper component={textareaComponent} invalid={true} />,
      );

      await expect
        .element(screen.getByRole('textbox'))
        .toHaveAttribute('aria-invalid', 'true');
    });

    it('sets data-has-value when field has a value', async () => {
      const screen = await render(
        <Wrapper
          component={textareaComponent}
          defaultValues={{ field: 'some text' }}
        />,
      );

      expect(
        screen.getByRole('textbox').element().hasAttribute('data-has-value'),
      ).toBe(true);
    });
  });

  describe('textVar with inputType input renders input', () => {
    it('renders an input element of type text', async () => {
      const screen = await render(<Wrapper component={textVarComponent} />);

      const input = screen.getByRole('textbox');
      await expect.element(input).toBeVisible();
      expect(input.element().tagName.toLowerCase()).toBe('input');
      await expect.element(input).toHaveAttribute('type', 'text');
    });

    it('sets translated placeholder when provided', async () => {
      const component: FormComponentTextVar = {
        ...textVarComponent,
        placeholder: 'somePlaceholderTextId',
      };

      const screen = await render(<Wrapper component={component} />);

      await expect
        .element(screen.getByRole('textbox'))
        .toHaveAttribute('placeholder', 'somePlaceholderTextId');
    });

    it('is readOnly when finalValue is set', async () => {
      const component: FormComponentTextVar = {
        ...textVarComponent,
        finalValue: 'locked',
      };

      const screen = await render(<Wrapper component={component} />);

      expect(screen.getByRole('textbox').element()).toHaveProperty(
        'readOnly',
        true,
      );
    });

    it('sets aria-label when showLabel is false', async () => {
      const component: FormComponentTextVar = {
        ...textVarComponent,
        showLabel: false,
      };

      const screen = await render(<Wrapper component={component} />);

      await expect
        .element(screen.getByRole('textbox', { name: 'fieldLabelTextId' }))
        .toBeVisible();
    });

    it('sets aria-details from FieldContext', async () => {
      const screen = await render(<Wrapper component={textVarComponent} />);

      await expect
        .element(screen.getByRole('textbox'))
        .toHaveAttribute('aria-details', 'test-details');
    });

    it('sets aria-invalid when invalid is true', async () => {
      const screen = await render(
        <Wrapper component={textVarComponent} invalid={true} />,
      );

      await expect
        .element(screen.getByRole('textbox'))
        .toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('textVar with inputFormat password renders input type password', () => {
    it('renders input with type password', async () => {
      const component: FormComponentTextVar = {
        ...textVarComponent,
        inputFormat: 'password',
      };

      const { container } = await render(<Wrapper component={component} />);

      const input = container.querySelector('input[type="password"]');
      expect(input).not.toBeNull();
    });
  });

  describe('numVar renders input type text', () => {
    it('renders an input element of type text', async () => {
      const screen = await render(<Wrapper component={numVarComponent} />);

      const input = screen.getByRole('textbox');
      await expect.element(input).toBeVisible();
      expect(input.element().tagName.toLowerCase()).toBe('input');
      await expect.element(input).toHaveAttribute('type', 'text');
    });

    it('sets aria-label when showLabel is false', async () => {
      const component: FormComponentNumVar = {
        ...numVarComponent,
        showLabel: false,
      };

      const screen = await render(<Wrapper component={component} />);

      await expect
        .element(screen.getByRole('textbox', { name: 'fieldLabelTextId' }))
        .toBeVisible();
    });

    it('sets aria-invalid when invalid is true', async () => {
      const screen = await render(
        <Wrapper component={numVarComponent} invalid={true} />,
      );

      await expect
        .element(screen.getByRole('textbox'))
        .toHaveAttribute('aria-invalid', 'true');
    });

    it('sets data-has-value when field has a value', async () => {
      const screen = await render(
        <Wrapper component={numVarComponent} defaultValues={{ field: '42' }} />,
      );

      expect(
        screen.getByRole('textbox').element().hasAttribute('data-has-value'),
      ).toBe(true);
    });

    it('does not set data-has-value when value is empty', async () => {
      const screen = await render(<Wrapper component={numVarComponent} />);

      expect(
        screen.getByRole('textbox').element().hasAttribute('data-has-value'),
      ).toBe(false);
    });
  });
});
