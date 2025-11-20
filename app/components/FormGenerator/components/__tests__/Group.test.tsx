import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { describe } from 'vitest';
import { Group } from '../Group';
import type { FormComponentGroup } from '../../types';
import { MockFormProvider } from '@/utils/testUtils';

describe('Group', () => {
  it('Renders with label when showLabel is true and title is not set', () => {
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
    render(
      <MockFormProvider>
        <Group component={component} currentComponentNamePath='root' />
      </MockFormProvider>,
    );

    expect(
      screen.getByRole('region', { name: 'someGroupLabelTextId' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'someGroupLabelTextId' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'someVarLabelTextId' }),
    ).toBeInTheDocument();
  });

  it('Renders with label when showLabel is false and title is not set', () => {
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
    render(
      <MockFormProvider>
        <Group component={component} currentComponentNamePath='root' />
      </MockFormProvider>,
    );

    expect(
      screen.getByRole('region', { name: 'someGroupLabelTextId' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'someGroupLabelTextId' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'someVarLabelTextId' }),
    ).toBeInTheDocument();
  });

  it('Renders with title and no label', () => {
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
    render(
      <MockFormProvider>
        <Group component={component} currentComponentNamePath='root' />
      </MockFormProvider>,
    );

    expect(
      screen.getByRole('region', { name: 'someGroupTitleTextId' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'someGroupTitleTextId' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'someGroupLabelTextId' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'someVarLabelTextId' }),
    ).toBeInTheDocument();
  });

  it('Renders with title and label', () => {
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
    render(
      <MockFormProvider>
        <Group component={component} currentComponentNamePath='root' />
      </MockFormProvider>,
    );

    expect(
      screen.getByRole('region', { name: 'someGroupTitleTextId' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'someGroupTitleTextId' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'someGroupLabelTextId' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'someVarLabelTextId' }),
    ).toBeInTheDocument();
  });

  it('Does not render when mode is output and no values are present', () => {
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
    const { container } = render(
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

    expect(container).toBeEmptyDOMElement();
  });

  it('Does not render when mode is output and values are present', () => {
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
    const { container } = render(
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

    expect(container).not.toBeEmptyDOMElement();
  });

  it('Does render when mode is output and no values are present but is expandable', () => {
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
    const { container } = render(
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

    expect(container).not.toBeEmptyDOMElement();
  });
});
