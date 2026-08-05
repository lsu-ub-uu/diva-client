import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { Variable } from '@/components/FormGenerator/components/Variable';
import type {
  FormComponentCollVar,
  FormComponentNumVar,
  FormComponentTextVar,
} from '@/components/FormGenerator/types';
import { MockFormProvider } from '@/utils/testUtils';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

const textVarComponent: FormComponentTextVar = {
  type: 'textVariable',
  name: 'someNameInData',
  label: 'someLabelTextId',
  showLabel: true,
  inputType: 'input',
  mode: 'input',
  placeholder: 'somePlaceholderTextId',
};

const numVarComponent: FormComponentNumVar = {
  type: 'numberVariable',
  name: 'someNameInData',
  label: 'someLabelTextId',
  showLabel: true,
  mode: 'input',
};

describe('Variable', () => {
  describe('input mode', () => {
    it('renders a labelled textbox for a textVariable', async () => {
      const screen = await render(
        <MockFormProvider>
          <Variable
            component={textVarComponent}
            path='someNameInData'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      await expect
        .element(screen.getByRole('textbox', { name: 'someLabelTextId' }))
        .toBeVisible();
    });

    it('renders a labelled textbox for a numberVariable', async () => {
      const screen = await render(
        <MockFormProvider>
          <Variable
            component={numVarComponent}
            path='someNameInData'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      await expect
        .element(screen.getByRole('textbox', { name: 'someLabelTextId' }))
        .toBeVisible();
    });

    it('does not render a label when showLabel is false', async () => {
      const component: FormComponentTextVar = {
        ...textVarComponent,
        showLabel: false,
      };

      const { container } = await render(
        <MockFormProvider>
          <Variable
            component={component}
            path='someNameInData'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      expect(container.querySelector('label')).toBeNull();
    });

    it('shows tooltip info when showTooltips is true', async () => {
      const component: FormComponentTextVar = {
        ...textVarComponent,
        tooltip: { title: 'tooltipTitle', body: 'tooltipBody' },
      };

      const screen = await render(
        <FormGeneratorContext
          value={{ showDevInfo: false, boxGroups: false, showTooltips: true }}
        >
          <MockFormProvider>
            <Variable
              component={component}
              path='someNameInData'
              parentPresentationStyle={undefined}
            />
          </MockFormProvider>
        </FormGeneratorContext>,
      );

      await expect
        .element(
          screen.getByRole('button', { name: 'divaClient_fieldInfoText' }),
        )
        .toBeVisible();
    });

    it('does not show tooltip when showTooltips is false', async () => {
      const component: FormComponentTextVar = {
        ...textVarComponent,
        tooltip: { title: 'tooltipTitle', body: 'tooltipBody' },
      };

      const { container } = await render(
        <FormGeneratorContext
          value={{ showDevInfo: false, boxGroups: false, showTooltips: false }}
        >
          <MockFormProvider>
            <Variable
              component={component}
              path='someNameInData'
              parentPresentationStyle={undefined}
            />
          </MockFormProvider>
        </FormGeneratorContext>,
      );

      expect(
        container.querySelector('[aria-label="divaClient_fieldInfoText"]'),
      ).toBeNull();
    });

    it('renders with inline variant when parentPresentationStyle is inline', async () => {
      const { container } = await render(
        <MockFormProvider>
          <Variable
            component={textVarComponent}
            path='someNameInData'
            parentPresentationStyle='inline'
          />
        </MockFormProvider>,
      );

      const fieldset = container.querySelector('[data-variant="inline"]');
      expect(fieldset).not.toBeNull();
    });

    it('renders with block variant when parentPresentationStyle is undefined', async () => {
      const { container } = await render(
        <MockFormProvider>
          <Variable
            component={textVarComponent}
            path='someNameInData'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      const fieldset = container.querySelector('[data-variant="block"]');
      expect(fieldset).not.toBeNull();
    });

    it('renders with default gridColSpan of 12', async () => {
      const { container } = await render(
        <MockFormProvider>
          <Variable
            component={textVarComponent}
            path='someNameInData'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      const wrapper = container.querySelector('[data-colspan="12"]');
      expect(wrapper).not.toBeNull();
    });

    it('renders with given gridColSpan', async () => {
      const component: FormComponentTextVar = {
        ...textVarComponent,
        gridColSpan: 6,
      };

      const { container } = await render(
        <MockFormProvider>
          <Variable
            component={component}
            path='someNameInData'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      const wrapper = container.querySelector('[data-colspan="6"]');
      expect(wrapper).not.toBeNull();
    });
  });

  describe('output mode', () => {
    it('renders nothing when mode is output and value is empty', async () => {
      const component: FormComponentTextVar = {
        ...textVarComponent,
        mode: 'output',
      };

      const { container } = await render(
        <MockFormProvider mockValues={{ someNameInData: '' }}>
          <Variable
            component={component}
            path='someNameInData'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      expect(container.innerHTML).toBe('');
    });

    it('renders nothing when mode is output and value is undefined', async () => {
      const component: FormComponentTextVar = {
        ...textVarComponent,
        mode: 'output',
      };

      const { container } = await render(
        <MockFormProvider>
          <Variable
            component={component}
            path='someNameInData'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      expect(container.innerHTML).toBe('');
    });

    it('renders the value when mode is output and value is present', async () => {
      const component: FormComponentTextVar = {
        ...textVarComponent,
        mode: 'output',
      };

      const screen = await render(
        <MockFormProvider mockValues={{ someNameInData: 'someDisplayValue' }}>
          <Variable
            component={component}
            path='someNameInData'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      await expect.element(screen.getByText('someDisplayValue')).toBeVisible();
    });

    it('renders the label when mode is output and showLabel is true', async () => {
      const component: FormComponentTextVar = {
        ...textVarComponent,
        mode: 'output',
      };

      const screen = await render(
        <MockFormProvider mockValues={{ someNameInData: 'someDisplayValue' }}>
          <Variable
            component={component}
            path='someNameInData'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      await expect.element(screen.getByText('someLabelTextId')).toBeVisible();
    });

    it('renders with inline variant when parentPresentationStyle is inline', async () => {
      const component: FormComponentTextVar = {
        ...textVarComponent,
        mode: 'output',
      };

      const { container } = await render(
        <MockFormProvider mockValues={{ someNameInData: 'someDisplayValue' }}>
          <Variable
            component={component}
            path='someNameInData'
            parentPresentationStyle='inline'
          />
        </MockFormProvider>,
      );

      expect(container.querySelector('[data-variant="inline"]')).not.toBeNull();
    });

    it('renders with block variant when parentPresentationStyle is undefined', async () => {
      const component: FormComponentTextVar = {
        ...textVarComponent,
        mode: 'output',
      };

      const { container } = await render(
        <MockFormProvider mockValues={{ someNameInData: 'someDisplayValue' }}>
          <Variable
            component={component}
            path='someNameInData'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      expect(container.querySelector('[data-variant="block"]')).not.toBeNull();
    });

    it('renders option label instead of raw value for a collectionVariable', async () => {
      const component = {
        type: 'collectionVariable',
        name: 'someNameInData',
        label: 'someLabelTextId',
        showLabel: true,
        mode: 'output',
        options: [
          { value: 'option1', label: 'Option One' },
          { value: 'option2', label: 'Option Two' },
        ],
      } as unknown as FormComponentCollVar;

      const screen = await render(
        <MockFormProvider mockValues={{ someNameInData: 'option2' }}>
          <Variable
            component={component}
            path='someNameInData'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      await expect.element(screen.getByText('Option Two')).toBeVisible();
    });
  });

  describe('finalValue', () => {
    it('renders output field when finalValue is set even in input mode', async () => {
      const component: FormComponentTextVar = {
        ...textVarComponent,
        mode: 'input',
        finalValue: 'someFinalValue',
      };

      const screen = await render(
        <MockFormProvider>
          <Variable
            component={component}
            path='someNameInData'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      await expect.element(screen.getByText('someFinalValue')).toBeVisible();
    });

    it('does not render input field when finalValue is set', async () => {
      const component: FormComponentTextVar = {
        ...textVarComponent,
        mode: 'input',
        finalValue: 'someFinalValue',
      };

      const { container } = await render(
        <MockFormProvider>
          <Variable
            component={component}
            path='someNameInData'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      expect(container.querySelector('input')).toBeNull();
    });
  });
});
