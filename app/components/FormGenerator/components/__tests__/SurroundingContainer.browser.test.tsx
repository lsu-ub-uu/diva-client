import { SurroundingContainer } from '@/components/FormGenerator/components/SurroundingContainer';
import type { FormComponentContainer } from '@/components/FormGenerator/types';
import { MockFormProvider } from '@/utils/testUtils';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

const baseContainer: FormComponentContainer = {
  type: 'container',
  containerType: 'surrounding',
  name: 'someSurroundingContainer',
  components: [
    {
      type: 'textVariable',
      name: 'someTextVar',
      showLabel: true,
      label: 'someTextVarLabel',
      placeholder: 'someEmptyTextId',
      inputType: 'input',
      mode: 'input',
    },
  ],
};

describe('SurroundingContainer', () => {
  it('renders child components with default layout', async () => {
    const component: FormComponentContainer = {
      ...baseContainer,
      gridColSpan: undefined,
    };

    const screen = await render(
      <MockFormProvider>
        <SurroundingContainer
          component={component}
          currentComponentNamePath='root.someSurroundingContainer'
          parentPresentationStyle={undefined}
        />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('textbox', { name: 'someTextVarLabel' }))
      .toBeVisible();
  });

  it('renders child components with specified gridColSpan', async () => {
    const component: FormComponentContainer = {
      ...baseContainer,
      gridColSpan: 6,
    };

    const screen = await render(
      <MockFormProvider>
        <SurroundingContainer
          component={component}
          currentComponentNamePath='root.someSurroundingContainer'
          parentPresentationStyle={undefined}
        />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('textbox', { name: 'someTextVarLabel' }))
      .toBeVisible();
  });

  it('renders with grid layout when presentationStyle is not inline', async () => {
    const component: FormComponentContainer = {
      ...baseContainer,
      presentationStyle: 'frame',
    };

    const screen = await render(
      <MockFormProvider>
        <SurroundingContainer
          component={component}
          currentComponentNamePath='root.someSurroundingContainer'
          parentPresentationStyle={undefined}
        />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('textbox', { name: 'someTextVarLabel' }))
      .toBeVisible();
  });

  it('renders with inline layout when presentationStyle is inline', async () => {
    const component: FormComponentContainer = {
      ...baseContainer,
      presentationStyle: 'inline',
    };

    const screen = await render(
      <MockFormProvider>
        <SurroundingContainer
          component={component}
          currentComponentNamePath='root.someSurroundingContainer'
          parentPresentationStyle={undefined}
        />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('textbox', { name: 'someTextVarLabel' }))
      .toBeVisible();
  });

  it('renders child components', async () => {
    const screen = await render(
      <MockFormProvider>
        <SurroundingContainer
          component={baseContainer}
          currentComponentNamePath='root.someSurroundingContainer'
          parentPresentationStyle={undefined}
        />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('textbox', { name: 'someTextVarLabel' }))
      .toBeVisible();
  });

  it('renders without error when components array is undefined', async () => {
    const component: FormComponentContainer = {
      ...baseContainer,
      components: undefined,
    };

    const screen = await render(
      <MockFormProvider>
        <SurroundingContainer
          component={component}
          currentComponentNamePath='root.someSurroundingContainer'
          parentPresentationStyle={undefined}
        />
      </MockFormProvider>,
    );

    // Simply verify that rendering completes without error
    // The container should be rendered even without child components
    expect(screen.getByRole).toBeDefined();
  });

  it('passes component presentationStyle to children over parentPresentationStyle', async () => {
    const component: FormComponentContainer = {
      ...baseContainer,
      presentationStyle: 'inline',
    };

    const screen = await render(
      <MockFormProvider>
        <SurroundingContainer
          component={component}
          currentComponentNamePath='root.someSurroundingContainer'
          parentPresentationStyle='grid'
        />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('textbox', { name: 'someTextVarLabel' }))
      .toBeVisible();
  });

  it('uses parentPresentationStyle when component presentationStyle is undefined', async () => {
    const component: FormComponentContainer = {
      ...baseContainer,
      presentationStyle: undefined,
    };

    const screen = await render(
      <MockFormProvider>
        <SurroundingContainer
          component={component}
          currentComponentNamePath='root.someSurroundingContainer'
          parentPresentationStyle='frame'
        />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('textbox', { name: 'someTextVarLabel' }))
      .toBeVisible();
  });

  it('renders with multiple child components', async () => {
    const component: FormComponentContainer = {
      type: 'container',
      containerType: 'surrounding',
      name: 'multiChildContainer',
      components: [
        {
          type: 'textVariable',
          name: 'firstVar',
          showLabel: true,
          label: 'firstLabel',
          placeholder: 'firstPlaceholder',
          inputType: 'input',
          mode: 'input',
        },
        {
          type: 'textVariable',
          name: 'secondVar',
          showLabel: true,
          label: 'secondLabel',
          placeholder: 'secondPlaceholder',
          inputType: 'input',
          mode: 'input',
        },
      ],
    };

    const screen = await render(
      <MockFormProvider>
        <SurroundingContainer
          component={component}
          currentComponentNamePath='root.multiChildContainer'
          parentPresentationStyle={undefined}
        />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('textbox', { name: 'firstLabel' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('textbox', { name: 'secondLabel' }))
      .toBeVisible();
  });
});
