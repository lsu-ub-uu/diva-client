import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { describe } from 'vitest';
import { Group } from '../Group';
import type { FormComponentGroup } from '../../types';
import { MockFormProvider } from '@/utils/testUtils';
import userEvent from '@testing-library/user-event';

describe.only('Group', () => {
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

  it('Shows attributes and children when title is set and no alternativePresentation. Then hides children when title is clicked.', async () => {
    const user = userEvent.setup();

    const component: FormComponentGroup = {
      type: 'group',
      name: 'someNameInData',
      showLabel: false,
      label: 'someGroupLabelTextId',
      headlineLevel: 'h2',
      title: 'someGroupTitleTextId',
      attributes: [
        {
          label: 'exampleCollectionVarText',
          showLabel: true,
          mode: 'input',
          name: 'colour',
          options: [
            {
              label: 'exampleBlueItemText',
              value: 'blue',
            },
          ],
          placeholder: 'initialEmptyValueText',
          tooltip: {
            body: 'exampleCollectionVarDefText',
            title: 'exampleCollectionVarText',
          },
          type: 'collectionVariable',
        },
      ],
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
      screen.getByRole('combobox', { name: 'exampleCollectionVarText' }),
    ).toBeVisible();
    expect(
      screen.getByRole('textbox', { name: 'someVarLabelTextId' }),
    ).toBeVisible();

    await user.click(
      screen.getByRole('button', { name: 'someGroupTitleTextId' }),
    );

    expect(
      screen.getByRole('combobox', { name: 'exampleCollectionVarText' }),
    ).toBeVisible();
    expect(
      screen.queryByRole('textbox', { name: 'someVarLabelTextId' }),
    ).not.toBeInTheDocument();
  });

  it('Hides children intially when title is set and no alternativePresentation is set and presentationSize is singleInitiallyHidden. Then shows children when title is clicked.', async () => {
    const user = userEvent.setup();

    const component: FormComponentGroup = {
      type: 'group',
      name: 'someNameInData',
      showLabel: false,
      label: 'someGroupLabelTextId',
      headlineLevel: 'h2',
      title: 'someGroupTitleTextId',
      presentationSize: 'singleInitiallyHidden',
      attributes: [
        {
          label: 'exampleCollectionVarText',
          showLabel: true,
          mode: 'input',
          name: 'colour',
          options: [
            {
              label: 'exampleBlueItemText',
              value: 'blue',
            },
          ],
          placeholder: 'initialEmptyValueText',
          tooltip: {
            body: 'exampleCollectionVarDefText',
            title: 'exampleCollectionVarText',
          },
          type: 'collectionVariable',
        },
      ],
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
      screen.getByRole('combobox', { name: 'exampleCollectionVarText' }),
    ).toBeVisible();
    expect(
      screen.queryByRole('textbox', { name: 'someVarLabelTextId' }),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'someGroupTitleTextId' }),
    );

    expect(
      screen.getByRole('combobox', { name: 'exampleCollectionVarText' }),
    ).toBeVisible();
    expect(
      screen.getByRole('textbox', { name: 'someVarLabelTextId' }),
    ).toBeVisible();
  });

  it('Shows root presentation when title is set and alternativePresentation is set, then switches to alternativePresentation when title is clicked', async () => {
    const user = userEvent.setup();

    const component: FormComponentGroup = {
      type: 'group',
      name: 'someNameInData',
      showLabel: false,
      label: 'someGroupLabelTextId',
      headlineLevel: 'h2',
      title: 'someGroupTitleTextId',
      presentationSize: 'singleInitiallyHidden',
      attributes: [
        {
          label: 'exampleCollectionVarText',
          showLabel: true,
          mode: 'input',
          name: 'colour',
          options: [
            {
              label: 'exampleBlueItemText',
              value: 'blue',
            },
          ],
          placeholder: 'initialEmptyValueText',
          tooltip: {
            body: 'exampleCollectionVarDefText',
            title: 'exampleCollectionVarText',
          },
          type: 'collectionVariable',
        },
      ],
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
      alternativePresentation: {
        type: 'group',
        name: 'someNameInData',
        showLabel: false,
        label: 'someExpandedLabelTextId',
        headlineLevel: 'h2',
        title: 'someGroupTitleTextId',
        attributes: [
          {
            label: 'exampleCollectionVarText',
            showLabel: true,
            mode: 'input',
            name: 'colour',
            options: [
              {
                label: 'exampleBlueItemText',
                value: 'blue',
              },
            ],
            placeholder: 'initialEmptyValueText',
            tooltip: {
              body: 'exampleCollectionVarDefText',
              title: 'exampleCollectionVarText',
            },
            type: 'collectionVariable',
          },
        ],
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
      },
    };

    render(
      <MockFormProvider>
        <Group component={component} currentComponentNamePath='root' />
      </MockFormProvider>,
    );

    expect(
      screen.getByRole('combobox', { name: 'exampleCollectionVarText' }),
    ).toBeVisible();
    expect(
      screen.queryByRole('textbox', { name: 'someVarLabelTextId' }),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'someGroupTitleTextId' }),
    );

    expect(
      screen.getByRole('combobox', { name: 'exampleCollectionVarText' }),
    ).toBeVisible();
    expect(
      screen.getByRole('textbox', { name: 'someVarLabelTextId' }),
    ).toBeVisible();
  });
});
