import type {
  FormComponentText,
  FormSchema,
} from '@/components/FormGenerator/types';
import type { DataGroup } from '@/cora/cora-data/types.server';
import { renderWithRoutesStub } from '@/utils/testUtils';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OutputPresentation } from '../OutputPresentation';

describe('OutputPresentation', () => {
  it('renders a group with a text variable', () => {
    const formSchema = {
      form: {
        type: 'group',
        label: 'Person',
        name: 'person',
        showLabel: true,
        headlineLevel: 'h1',
        components: [
          {
            type: 'textVariable',
            label: 'Name',
            showLabel: true,
            name: 'name',
            attributes: [
              {
                name: 'type',
                options: [
                  { value: 'given', label: 'Given Name' },
                  { value: 'family', label: 'Family Name' },
                ],
              },
            ],
          },
        ],
      },
    } as FormSchema;

    const data = {
      name: 'person',
      children: [
        {
          name: 'name',
          value: 'Alice',
          attributes: { type: 'given' },
        },
      ],
    } as DataGroup;

    render(<OutputPresentation formSchema={formSchema} data={data} />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Person' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('renders a number variable', () => {
    const formSchema = {
      form: {
        type: 'group',
        label: 'Stats',
        name: 'stats',
        showLabel: true,
        headlineLevel: 'h2',
        components: [
          {
            type: 'numberVariable',
            label: 'Age',
            showLabel: true,
            name: 'age',
          },
        ],
      },
    } as FormSchema;

    const data = {
      name: 'stats',
      children: [
        {
          name: 'age',
          value: '42',
        },
      ],
    } as DataGroup;

    render(<OutputPresentation formSchema={formSchema} data={data} />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Stats' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders a collection variable', () => {
    const formSchema = {
      form: {
        type: 'group',
        label: 'Colors',
        name: 'colors',
        showLabel: true,
        headlineLevel: 'h3',
        components: [
          {
            type: 'collectionVariable',
            label: 'Favorite Color',
            showLabel: true,
            name: 'favoriteColors',
            options: [
              { value: 'red', label: 'Red' },
              { value: 'blue', label: 'Blue' },
            ],
          },
        ],
      },
    } as FormSchema;

    const data = {
      name: 'colors',
      children: [
        {
          name: 'favoriteColors',
          value: 'red',
        },
      ],
    } as DataGroup;

    render(<OutputPresentation formSchema={formSchema} data={data} />);
    expect(
      screen.getByRole('heading', { level: 3, name: 'Colors' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Favorite Color')).toBeInTheDocument();
    expect(screen.getByText('Red')).toBeInTheDocument();
  });

  it('renders a record link', () => {
    const formSchema = {
      form: {
        type: 'group',
        label: 'Links',
        name: 'links',
        showLabel: true,
        headlineLevel: 'h4',
        components: [
          {
            type: 'recordLink',
            label: 'Profile Link',
            showLabel: true,
            name: 'profileLink',
          },
        ],
      },
    } as FormSchema;

    const data = {
      name: 'links',
      children: [
        {
          name: 'profileLink',
          children: [
            { name: 'linkedRecordType', value: 'profile' },
            { name: 'linkedRecordId', value: 'record-123' },
          ],
        },
      ],
    } as DataGroup;

    renderWithRoutesStub(
      <OutputPresentation formSchema={formSchema} data={data} />,
    );

    expect(
      screen.getByRole('heading', { level: 4, name: 'Links' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Profile Link')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'profile/record-123' }),
    ).toHaveAttribute('href', '/profile/record-123');
  });

  it('renders a resource link', () => {
    const formSchema = {
      form: {
        type: 'group',
        label: 'Resources',
        name: 'resources',
        showLabel: true,
        headlineLevel: 'h5',
        components: [
          {
            type: 'resourceLink',
            label: 'Image',
            showLabel: true,
            name: 'image',
            outputFormat: 'image',
          },
        ],
      },
    } as FormSchema;

    const data = {
      name: 'resources',
      children: [
        {
          name: 'image',
          children: [
            { name: 'linkedRecordId', value: 'resource-123' },
            { name: 'mimeType', value: 'image/png' },
          ],
        },
      ],
    } as DataGroup;

    render(<OutputPresentation formSchema={formSchema} data={data} />);
    expect(
      screen.getByRole('heading', { level: 5, name: 'Resources' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'image' })).toHaveAttribute(
      'src',
      '/binary/resource-123/image',
    );
  });

  it('does not render a group with only text and no data', () => {
    const formSchema = {
      form: {
        type: 'group',
        label: 'Info',
        name: 'info',
        showLabel: true,
        headlineLevel: 'h6',
        components: [
          {
            type: 'text',
            name: 'infoText',
            label: 'Information',
            showLabel: true,
            finalValue: 'Some info',
          },
        ],
      },
    } as FormSchema;

    const data = {
      name: 'info',
      children: [],
    } as DataGroup;

    render(<OutputPresentation formSchema={formSchema} data={data} />);
    expect(
      screen.queryByRole('heading', { level: 6, name: 'Info' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Information')).not.toBeInTheDocument();
    expect(screen.queryByText('Some info')).not.toBeInTheDocument();
  });

  it('renders a group with text and data', () => {
    const formSchema = {
      form: {
        type: 'group',
        label: 'Info',
        name: 'info',
        showLabel: true,
        headlineLevel: 'h6',
        components: [
          {
            type: 'text',
            name: 'infoText',
          } as FormComponentText,
          {
            type: 'textVariable',
            name: 'infoVariable',
            label: 'Info Variable',
            showLabel: true,
          },
        ],
      },
    } as FormSchema;

    const data = {
      name: 'info',
      children: [
        {
          name: 'infoVariable',
          value: 'Variable info',
        },
      ],
    } as DataGroup;

    render(<OutputPresentation formSchema={formSchema} data={data} />);
    expect(
      screen.getByRole('heading', { level: 6, name: 'Info' }),
    ).toBeInTheDocument();
    expect(screen.getByText('infoText')).toBeInTheDocument();
  });

  it('renders nested groups', () => {
    const formSchema = {
      form: {
        type: 'group',
        label: 'Outer Group',
        name: 'outerGroup',
        showLabel: true,
        headlineLevel: 'h1',
        components: [
          {
            type: 'group',
            label: 'Inner Group',
            name: 'innerGroup',
            showLabel: true,
            headlineLevel: 'h2',
            components: [
              {
                type: 'textVariable',
                label: 'Inner Text',
                name: 'innerText',
                showLabel: true,
              },
            ],
          },
        ],
      },
    } as FormSchema;

    const data = {
      name: 'outerGroup',
      children: [
        {
          name: 'innerGroup',
          children: [
            {
              name: 'innerText',
              value: 'Hello from the inside!',
            },
          ],
        },
      ],
    } as DataGroup;

    render(<OutputPresentation formSchema={formSchema} data={data} />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Outer Group' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Inner Group' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Inner Text')).toBeInTheDocument();
    expect(screen.getByText('Hello from the inside!')).toBeInTheDocument();
  });

  it('renders a container', () => {
    const formSchema = {
      form: {
        type: 'group',
        label: 'Container Group',
        name: 'containerGroup',
        showLabel: true,
        headlineLevel: 'h1',
        components: [
          {
            type: 'container',
            name: 'container',
            showLabel: true,
            components: [
              {
                type: 'textVariable',
                label: 'Text in Container',
                name: 'textInContainer',
                showLabel: true,
              },
            ],
          },
        ],
      },
    } as FormSchema;

    const data = {
      name: 'containerGroup',
      children: [
        {
          name: 'textInContainer',
          value: 'Hello from the container!',
        },
      ],
    } as DataGroup;

    render(<OutputPresentation formSchema={formSchema} data={data} />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Container Group' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Text in Container')).toBeInTheDocument();
    expect(screen.getByText('Hello from the container!')).toBeInTheDocument();
  });

  it('renders a nested container', () => {
    const formSchema = {
      form: {
        type: 'group',
        label: 'Outer Group',
        name: 'outerGroup',
        showLabel: true,
        headlineLevel: 'h1',
        components: [
          {
            type: 'container',
            name: 'container',
            showLabel: true,
            components: [
              {
                type: 'container',
                name: 'nestedContainer',
                showLabel: true,
                components: [
                  {
                    type: 'textVariable',
                    label: 'Text in Container',
                    name: 'textInContainer',
                    showLabel: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    } as FormSchema;

    const data = {
      name: 'outerGroup',
      children: [
        {
          name: 'textInContainer',
          value: 'Hello from the nested container!',
        },
      ],
    } as DataGroup;

    render(<OutputPresentation formSchema={formSchema} data={data} />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Outer Group' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Text in Container')).toBeInTheDocument();
    expect(
      screen.getByText('Hello from the nested container!'),
    ).toBeInTheDocument();
  });

  it('renders repeating data', () => {
    const formSchema = {
      form: {
        type: 'group',
        label: 'Links',
        name: 'links',
        showLabel: true,
        headlineLevel: 'h4',
        components: [
          {
            type: 'recordLink',
            label: 'Profile Link',
            showLabel: true,
            name: 'profileLink',
            repeat: {
              repeatMin: 0,
              repeatMax: 5,
            },
          },
        ],
      },
    } as FormSchema;

    const data = {
      name: 'links',
      children: [
        {
          name: 'profileLink',
          children: [
            { name: 'linkedRecordType', value: 'profile' },
            { name: 'linkedRecordId', value: 'record-123' },
          ],
        },
        {
          name: 'profileLink',
          children: [
            { name: 'linkedRecordType', value: 'profile' },
            { name: 'linkedRecordId', value: 'record-456' },
          ],
        },
      ],
    } as DataGroup;

    renderWithRoutesStub(
      <OutputPresentation formSchema={formSchema} data={data} />,
    );

    expect(
      screen.getByRole('heading', { level: 4, name: 'Links' }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Profile Link')).toHaveLength(2);
    expect(
      screen.getByRole('link', { name: 'profile/record-123' }),
    ).toHaveAttribute('href', '/profile/record-123');
    expect(
      screen.getByRole('link', { name: 'profile/record-456' }),
    ).toHaveAttribute('href', '/profile/record-456');
  });

  it('renders repeating group', () => {
    const formSchema = {
      form: {
        type: 'group',
        label: 'People',
        name: 'people',
        showLabel: true,
        headlineLevel: 'h1',
        components: [
          {
            type: 'group',
            label: 'Person',
            name: 'person',
            showLabel: true,
            headlineLevel: 'h2',
            repeat: {
              repeatMin: 0,
              repeatMax: 5,
            },
            components: [
              {
                type: 'textVariable',
                label: 'Name',
                name: 'name',
                showLabel: true,
              },
            ],
          },
        ],
      },
    } as FormSchema;

    const data = {
      name: 'people',
      children: [
        {
          name: 'person',
          children: [
            {
              name: 'name',
              value: 'Alice',
            },
          ],
        },
        {
          name: 'person',
          children: [
            {
              name: 'name',
              value: 'Bob',
            },
          ],
        },
      ],
    } as DataGroup;

    render(<OutputPresentation formSchema={formSchema} data={data} />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'People' }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('heading', { level: 2, name: 'Person' }),
    ).toHaveLength(2);
    expect(screen.getAllByText('Name')).toHaveLength(2);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('doers not render a group with no data', () => {
    const formSchema = {
      form: {
        type: 'group',
        label: 'Empty Group',
        name: 'emptyGroup',
        showLabel: true,
        headlineLevel: 'h1',
        components: [
          {
            type: 'textVariable',
            label: 'Empty Variable',
            name: 'emptyVariable',
            showLabel: true,
          },
        ],
      },
    } as FormSchema;

    const data = {
      name: 'emptyGroup',
      children: [
        {
          name: 'emptyVariable',
          value: '',
        },
      ],
    } as DataGroup;

    render(<OutputPresentation formSchema={formSchema} data={data} />);
    expect(
      screen.queryByRole('heading', { level: 1, name: 'Empty Group' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Empty Variable')).not.toBeInTheDocument();
  });

  it('does not render a group with nested group with no data', () => {
    const formSchema = {
      form: {
        type: 'group',
        label: 'Outer Group',
        name: 'outerGroup',
        showLabel: true,
        headlineLevel: 'h1',
        components: [
          {
            type: 'group',
            label: 'Inner Group',
            name: 'innerGroup',
            showLabel: true,
            headlineLevel: 'h2',
            components: [
              {
                type: 'textVariable',
                label: 'Inner Text',
                name: 'innerText',
                showLabel: true,
              },
            ],
          },
        ],
      },
    } as FormSchema;

    const data = {
      name: 'outerGroup',
      children: [
        {
          name: 'innerGroup',
          children: [
            {
              name: 'innerText',
              value: '',
            },
          ],
        },
      ],
    } as DataGroup;

    render(<OutputPresentation formSchema={formSchema} data={data} />);
    expect(
      screen.queryByRole('heading', { level: 1, name: 'Outer Group' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Inner Group' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Inner Text')).not.toBeInTheDocument();
  });

  it('does not render accordion for a group with no data', () => {
    const formSchema = {
      form: {
        type: 'group',
        label: 'Accordion Group',
        name: 'accordionGroup',
        showLabel: true,
        headlineLevel: 'h1',
        title: 'Accordion Title',
        components: [
          {
            type: 'textVariable',
            label: 'Text',
            name: 'text',
            showLabel: true,
          },
        ],
      },
    } as FormSchema;

    const data = {
      name: 'accordionGroup',
      children: [
        {
          name: 'text',
          value: '',
        },
      ],
    };

    render(<OutputPresentation formSchema={formSchema} data={data} />);
    expect(
      screen.queryByRole('button', { name: 'Accordion Title' }),
    ).not.toBeInTheDocument();
  });

  it('does not render an accordion for container with no data', () => {
    const formSchema = {
      form: {
        type: 'group',
        label: 'Group with Container',
        name: 'groupWithContainer',
        showLabel: true,
        headlineLevel: 'h1',
        components: [
          {
            type: 'container',
            name: 'container',
            showLabel: true,
            title: 'Container Title',
            components: [
              {
                type: 'textVariable',
                label: 'Text in Container',
                name: 'textInContainer',
                showLabel: true,
              },
            ],
          },
          {
            type: 'textVariable',
            name: 'otherText',
            label: 'Other Text',
            showLabel: true,
          },
        ],
      },
    } as FormSchema;

    const data = {
      name: 'groupWithContainer',
      children: [
        {
          name: 'textInContainer',
          value: '',
        },
        {
          name: 'otherText',
          value: 'someValue',
        },
      ],
    };

    render(<OutputPresentation formSchema={formSchema} data={data} />);

    expect(
      screen.queryByRole('button', { name: 'Container Title' }),
    ).not.toBeInTheDocument();

    expect(screen.queryByText('Text in Container')).not.toBeInTheDocument();
    expect(screen.getByText('Other Text')).toBeInTheDocument();
  });
});
