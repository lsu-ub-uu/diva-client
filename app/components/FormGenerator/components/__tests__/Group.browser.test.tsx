import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { Group } from '@/components/FormGenerator/components/Group';
import type { FormComponentGroup } from '@/components/FormGenerator/types';
import { MockFormProvider } from '@/utils/testUtils';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';

const groupComponentWithTooltip: FormComponentGroup = {
  type: 'group',
  name: 'someGroup',
  showLabel: false,
  label: 'someGroupLabelTextId',
  headlineLevel: 'h2',
  title: 'someGroupTitleTextId',
  tooltip: { title: 'tooltipTitle', body: 'tooltipBody' },
  components: [
    {
      type: 'textVariable',
      name: 'someVar',
      showLabel: true,
      label: 'someVarLabelTextId',
      placeholder: 'someEmptyTextId',
      inputType: 'input',
      mode: 'input',
    },
  ],
};

describe('Group', () => {
  it('renders with label when showLabel is true and title is not set', async () => {
    const component: FormComponentGroup = {
      type: 'group',
      name: 'someNameInData',
      showLabel: true,
      label: 'someGroupLabelTextId',
      headlineLevel: 'h2',
      title: undefined,
      components: [
        {
          type: 'textVariable',
          name: 'someNameInData',
          showLabel: true,
          label: 'someVarLabelTextId',
          placeholder: 'someEmptyTextId',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          validation: {
            type: 'regex',
            pattern: '^[a-zA-Z]$',
          },
          inputType: 'input',
          mode: 'input',
        },
      ],
    };

    const screen = await render(
      <MockFormProvider>
        <Group component={component} currentComponentNamePath='root' />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('region', { name: 'someGroupLabelTextId' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('heading', { name: 'someGroupLabelTextId' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('textbox', { name: 'someVarLabelTextId' }))
      .toBeVisible();
  });

  it('renders with label when showLabel is false and title is not set', async () => {
    const component: FormComponentGroup = {
      type: 'group',
      name: 'someNameInData',
      showLabel: false,
      label: 'someGroupLabelTextId',
      headlineLevel: 'h2',
      title: undefined,
      components: [
        {
          type: 'textVariable',
          name: 'someNameInData',
          showLabel: true,
          label: 'someVarLabelTextId',
          placeholder: 'someEmptyTextId',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          validation: {
            type: 'regex',
            pattern: '^[a-zA-Z]$',
          },
          inputType: 'input',
          mode: 'input',
        },
      ],
    };

    const screen = await render(
      <MockFormProvider>
        <Group component={component} currentComponentNamePath='root' />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('region', { name: 'someGroupLabelTextId' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('textbox', { name: 'someVarLabelTextId' }))
      .toBeVisible();
  });

  it('renders with title and no label', async () => {
    const component: FormComponentGroup = {
      type: 'group',
      name: 'someNameInData',
      showLabel: false,
      label: 'someGroupLabelTextId',
      headlineLevel: 'h2',
      title: 'someGroupTitleTextId',
      components: [
        {
          type: 'textVariable',
          name: 'someNameInData',
          showLabel: true,
          label: 'someVarLabelTextId',
          placeholder: 'someEmptyTextId',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          validation: {
            type: 'regex',
            pattern: '^[a-zA-Z]$',
          },
          inputType: 'input',
          mode: 'input',
        },
      ],
    };

    const { container, getByRole } = await render(
      <MockFormProvider>
        <Group component={component} currentComponentNamePath='root' />
      </MockFormProvider>,
    );

    await expect
      .element(getByRole('region', { name: 'someGroupTitleTextId' }))
      .toBeVisible();
    await expect
      .element(getByRole('heading', { name: 'someGroupTitleTextId' }))
      .toBeVisible();
    expect(
      container.querySelector('h2[aria-label="someGroupLabelTextId"]'),
    ).toBeNull();
    await expect
      .element(getByRole('textbox', { name: 'someVarLabelTextId' }))
      .toBeVisible();
  });

  it('renders with title and label', async () => {
    const component: FormComponentGroup = {
      type: 'group',
      name: 'someNameInData',
      showLabel: true,
      label: 'someGroupLabelTextId',
      headlineLevel: 'h2',
      title: 'someGroupTitleTextId',
      components: [
        {
          type: 'textVariable',
          name: 'someNameInData',
          showLabel: true,
          label: 'someVarLabelTextId',
          placeholder: 'someEmptyTextId',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          validation: {
            type: 'regex',
            pattern: '^[a-zA-Z]$',
          },
          inputType: 'input',
          mode: 'input',
        },
      ],
    };

    const screen = await render(
      <MockFormProvider>
        <Group component={component} currentComponentNamePath='root' />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('region', { name: 'someGroupTitleTextId' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('heading', { name: 'someGroupTitleTextId' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('heading', { name: 'someGroupLabelTextId' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('textbox', { name: 'someVarLabelTextId' }))
      .toBeVisible();
  });

  it('does not render when mode is output and no values are present', async () => {
    const component: FormComponentGroup = {
      type: 'group',
      name: 'someGroup',
      showLabel: true,
      label: 'someGroupLabelTextId',
      headlineLevel: 'h2',
      title: 'someGroupTitleTextId',
      mode: 'output',
      components: [
        {
          type: 'textVariable',
          name: 'someVar',
          showLabel: true,
          label: 'someVarLabelTextId',
          placeholder: 'someEmptyTextId',
          inputType: 'input',
          mode: 'input',
        },
      ],
    };

    const { container } = await render(
      <MockFormProvider
        mockValues={{
          someGroup: {
            someVar: '',
          },
        }}
      >
        <Group component={component} currentComponentNamePath='root' />
      </MockFormProvider>,
    );

    expect(container.innerHTML).toBe('');
  });

  it('does render when mode is output and values are present', async () => {
    const component: FormComponentGroup = {
      type: 'group',
      name: 'someGroup',
      showLabel: true,
      label: 'someGroupLabelTextId',
      headlineLevel: 'h2',
      title: 'someGroupTitleTextId',
      mode: 'output',
      components: [
        {
          type: 'textVariable',
          name: 'someVar',
          showLabel: true,
          label: 'someVarLabelTextId',
          placeholder: 'someEmptyTextId',
          inputType: 'input',
          mode: 'input',
        },
      ],
    };

    const { container } = await render(
      <MockFormProvider
        overrides={{
          getValues: vi
            .fn()
            .mockImplementation(() => ({ someVar: { value: 'someValue' } })),
        }}
      >
        <Group component={component} currentComponentNamePath='someGroup' />
      </MockFormProvider>,
    );

    expect(container.innerHTML).not.toBe('');
  });

  it('does render when mode is output and no values are present but is expandable', async () => {
    const component: FormComponentGroup = {
      type: 'group',
      name: 'someGroup',
      showLabel: true,
      label: 'someGroupLabelTextId',
      headlineLevel: 'h2',
      title: 'someGroupTitleTextId',
      mode: 'output',
      components: [
        {
          type: 'textVariable',
          name: 'someVar',
          showLabel: true,
          label: 'someVarLabelTextId',
          placeholder: 'someEmptyTextId',
          inputType: 'input',
          mode: 'input',
        },
      ],
    };

    const { container } = await render(
      <MockFormProvider
        mockValues={{
          someGroup: {
            someVar: '',
          },
        }}
      >
        <Group
          component={component}
          currentComponentNamePath='root'
          expanded={true}
          onExpandButtonClick={vi.fn()}
        />
      </MockFormProvider>,
    );

    expect(container.innerHTML).not.toBe('');
  });

  it('does not render when mode is output and no values are present for matching path', async () => {
    const component: FormComponentGroup = {
      type: 'group',
      name: 'someGroup',
      showLabel: true,
      label: 'someGroupLabelTextId',
      headlineLevel: 'h2',
      title: 'someGroupTitleTextId',
      mode: 'output',
      components: [
        {
          type: 'textVariable',
          name: 'someVar',
          showLabel: true,
          label: 'someVarLabelTextId',
          placeholder: 'someEmptyTextId',
          inputType: 'input',
          mode: 'input',
        },
      ],
    };

    const { container } = await render(
      <MockFormProvider mockValues={{ someGroup: { someVar: '' } }}>
        <Group component={component} currentComponentNamePath='someGroup' />
      </MockFormProvider>,
    );

    expect(container.innerHTML).toBe('');
  });

  it('is not expandable when only expanded is provided', async () => {
    const screen = await render(
      <MockFormProvider>
        <Group
          component={groupComponentWithTooltip}
          currentComponentNamePath='someGroup'
          expanded={true}
        />
      </MockFormProvider>,
    );

    const card = screen.getByRole('region', { name: 'someGroupTitleTextId' });
    await expect.element(card).not.toHaveAttribute('data-expandable');
  });

  it('is not expandable when only onExpandButtonClick is provided', async () => {
    const screen = await render(
      <MockFormProvider>
        <Group
          component={groupComponentWithTooltip}
          currentComponentNamePath='someGroup'
          onExpandButtonClick={vi.fn()}
        />
      </MockFormProvider>,
    );

    const card = screen.getByRole('region', { name: 'someGroupTitleTextId' });
    await expect.element(card).not.toHaveAttribute('data-expandable');
  });

  it('marks card as collapsed when expanded is false and expandable is enabled', async () => {
    const screen = await render(
      <MockFormProvider>
        <Group
          component={groupComponentWithTooltip}
          currentComponentNamePath='someGroup'
          expanded={false}
          onExpandButtonClick={vi.fn()}
        />
      </MockFormProvider>,
    );

    const card = screen.getByRole('region', { name: 'someGroupTitleTextId' });
    await expect.element(card).toHaveAttribute('data-expanded', 'false');
    await expect.element(card).toHaveAttribute('data-expandable', '');
  });

  it('calls onExpandButtonClick when expand button is clicked', async () => {
    const onExpandButtonClick = vi.fn();
    const screen = await render(
      <MockFormProvider>
        <Group
          component={groupComponentWithTooltip}
          currentComponentNamePath='someGroup'
          expanded={true}
          onExpandButtonClick={onExpandButtonClick}
        />
      </MockFormProvider>,
    );

    await screen.getByRole('button', { name: 'someGroupTitleTextId' }).click();
    expect(onExpandButtonClick).toHaveBeenCalledTimes(1);
  });

  it('does not show tooltip when cardTitle is undefined', async () => {
    const component: FormComponentGroup = {
      ...groupComponentWithTooltip,
      title: undefined,
      showLabel: false,
    };

    const { container } = await render(
      <FormGeneratorContext
        value={{ showDevInfo: false, boxGroups: false, showTooltips: true }}
      >
        <MockFormProvider>
          <Group component={component} currentComponentNamePath='someGroup' />
        </MockFormProvider>
      </FormGeneratorContext>,
    );

    expect(
      container.querySelector('[aria-label="divaClient_fieldInfoText"]'),
    ).toBeNull();
  });

  it('adds boxed marker when boxGroups is true and path is not root', async () => {
    const screen = await render(
      <FormGeneratorContext
        value={{ showDevInfo: false, boxGroups: true, showTooltips: true }}
      >
        <MockFormProvider>
          <Group
            component={groupComponentWithTooltip}
            currentComponentNamePath='root.someGroup'
          />
        </MockFormProvider>
      </FormGeneratorContext>,
    );

    const card = screen.getByRole('region', { name: 'someGroupTitleTextId' });
    await expect.element(card).toHaveAttribute('data-boxed', '');
  });

  it('propagates enhancement alert to both header and content', async () => {
    const { container } = await render(
      <FormGeneratorContext
        value={{
          showDevInfo: false,
          boxGroups: false,
          showTooltips: true,
          enhancedFields: {
            someGroup: { type: 'group', alert: true },
          },
        }}
      >
        <MockFormProvider>
          <Group
            component={groupComponentWithTooltip}
            currentComponentNamePath='someGroup'
          />
        </MockFormProvider>
      </FormGeneratorContext>,
    );

    expect(container.querySelectorAll('[data-alert="true"]').length).toBe(2);
  });

  it('uses titleHeadlineLevel when a title exists', async () => {
    const component: FormComponentGroup = {
      ...groupComponentWithTooltip,
      titleHeadlineLevel: 'h3',
    };

    const screen = await render(
      <MockFormProvider>
        <Group component={component} currentComponentNamePath='someGroup' />
      </MockFormProvider>,
    );

    await expect
      .element(
        screen.getByRole('heading', { name: 'someGroupTitleTextId', level: 3 }),
      )
      .toBeVisible();
  });

  it('uses headlineLevel when title is not set and showLabel is true', async () => {
    const component: FormComponentGroup = {
      ...groupComponentWithTooltip,
      title: undefined,
      showLabel: true,
      headlineLevel: 'h4',
    };

    const screen = await render(
      <MockFormProvider>
        <Group component={component} currentComponentNamePath='someGroup' />
      </MockFormProvider>,
    );

    await expect
      .element(
        screen.getByRole('heading', { name: 'someGroupLabelTextId', level: 4 }),
      )
      .toBeVisible();
  });

  it('renders inline layout and text style attributes', async () => {
    const component: FormComponentGroup = {
      ...groupComponentWithTooltip,
      textStyle: 'italicTextStyle',
    };

    const { container } = await render(
      <MockFormProvider>
        <Group
          component={component}
          currentComponentNamePath='someGroup'
          parentPresentationStyle='inline'
        />
      </MockFormProvider>,
    );

    const groupContainer = container.querySelector(
      '[data-layout="inline"][data-text-style="italicTextStyle"]',
    );
    expect(groupContainer).not.toBeNull();
  });

  it('renders grid layout when parentPresentationStyle is not inline', async () => {
    const component: FormComponentGroup = {
      ...groupComponentWithTooltip,
      textStyle: 'boldTextStyle',
    };

    const { container } = await render(
      <MockFormProvider>
        <Group component={component} currentComponentNamePath='someGroup' />
      </MockFormProvider>,
    );

    const groupContainer = container.querySelector(
      '[data-layout="grid"][data-text-style="boldTextStyle"]',
    );
    expect(groupContainer).not.toBeNull();
  });

  it('prefers component presentationStyle over parentPresentationStyle', async () => {
    const component: FormComponentGroup = {
      ...groupComponentWithTooltip,
      presentationStyle: 'frame',
    };

    const { container } = await render(
      <MockFormProvider>
        <Group
          component={component}
          currentComponentNamePath='someGroup'
          parentPresentationStyle='inline'
        />
      </MockFormProvider>,
    );

    const blockFieldset = container.querySelector('[data-variant="block"]');
    expect(blockFieldset).not.toBeNull();
  });

  it('supports anchorId and ref props on root element', async () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = await render(
      <MockFormProvider>
        <Group
          component={groupComponentWithTooltip}
          currentComponentNamePath='someGroup'
          anchorId='group-anchor'
          ref={ref}
        />
      </MockFormProvider>,
    );

    const groupRoot = container.querySelector('#group-anchor');
    expect(groupRoot).not.toBeNull();
    expect(ref.current?.id).toBe('group-anchor');
  });

  it('renders actionButtonGroup inside card header', async () => {
    const screen = await render(
      <MockFormProvider>
        <Group
          component={groupComponentWithTooltip}
          currentComponentNamePath='someGroup'
          actionButtonGroup={<button type='button'>group action</button>}
        />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('button', { name: 'group action' }))
      .toBeVisible();
  });

  it('forwards childrenHidden to card content', async () => {
    const { container } = await render(
      <MockFormProvider>
        <Group
          component={groupComponentWithTooltip}
          currentComponentNamePath='someGroup'
          childrenHidden={true}
        />
      </MockFormProvider>,
    );

    expect(container.querySelector('div[hidden]')).not.toBeNull();
  });

  it('renders without crashing when components are undefined', async () => {
    const component: FormComponentGroup = {
      ...groupComponentWithTooltip,
      components: undefined,
    };

    const screen = await render(
      <MockFormProvider>
        <Group component={component} currentComponentNamePath='someGroup' />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('region', { name: 'someGroupTitleTextId' }))
      .toBeVisible();
  });

  it('shows tooltip info when showTooltips is true', async () => {
    const screen = await render(
      <FormGeneratorContext
        value={{ showDevInfo: false, boxGroups: false, showTooltips: true }}
      >
        <MockFormProvider>
          <Group
            component={groupComponentWithTooltip}
            currentComponentNamePath='someGroup'
          />
        </MockFormProvider>
      </FormGeneratorContext>,
    );

    await expect
      .element(screen.getByRole('button', { name: 'divaClient_fieldInfoText' }))
      .toBeVisible();
  });

  it('does not show tooltip info when showTooltips is false', async () => {
    const { container } = await render(
      <FormGeneratorContext
        value={{ showDevInfo: false, boxGroups: false, showTooltips: false }}
      >
        <MockFormProvider>
          <Group
            component={groupComponentWithTooltip}
            currentComponentNamePath='someGroup'
          />
        </MockFormProvider>
      </FormGeneratorContext>,
    );

    expect(
      container.querySelector('[aria-label="divaClient_fieldInfoText"]'),
    ).toBeNull();
  });
});
