import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { formDefWithTwoTextVariableWithModeOutput } from '@/__mocks__/data/form/textVar';
import { OutputRecordLinkWithPresentation } from '../OutputRecordLinkWithPresentation';
import { createRoutesStub } from 'react-router';
import userEvent from '@testing-library/user-event';

describe('OutputRecordLinkWithPresentation', () => {
  it('renders a spinner while loading', () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <OutputRecordLinkWithPresentation
            linkedRecordId='someRecordId'
            linkedRecordType='someRecordType'
            presentationRecordLinkId='somePresentationRecordLinkId'
            hasReadAccess={true}
          />
        ),
      },
      {
        path: '/linkedRecord/:recordType/:recordId',
        loader: () => new Promise(() => {}),
      },
    ]);

    render(<RoutesStub />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders fallback ui when fetch fails', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <OutputRecordLinkWithPresentation
            linkedRecordId='someRecordId'
            linkedRecordType='someRecordType'
            presentationRecordLinkId='somePresentationRecordLinkId'
            hasReadAccess={true}
          />
        ),
      },
      {
        path: '/linkedRecord/:recordType/:recordId',
        loader: () => ({ error: true }),
      },
    ]);

    render(<RoutesStub />);

    expect(
      await screen.findByText('someRecordType/someRecordId'),
    ).toBeInTheDocument();
  });

  it('renders record data when fetch succeeds', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <OutputRecordLinkWithPresentation
            linkedRecordId='someRecordId'
            linkedRecordType='someRecordType'
            presentationRecordLinkId='somePresentationRecordLinkId'
            hasReadAccess={true}
          />
        ),
      },
      {
        path: '/linkedRecord/:recordType/:recordId',
        loader: () => ({
          presentation: formDefWithTwoTextVariableWithModeOutput,
          record: {
            record: {
              data: {
                name: 'someRootNameInData',
                children: [{ name: 'someTextVar', value: 'someValue' }],
              },
            },
          },
        }),
      },
    ]);

    render(<RoutesStub />);

    expect(await screen.findByText('someValue')).toBeInTheDocument();
  });

  it('renders fallback ui without a link when hasReadAccess is false and fetch fails', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <OutputRecordLinkWithPresentation
            linkedRecordId='someRecordId'
            linkedRecordType='someRecordType'
            presentationRecordLinkId='somePresentationRecordLinkId'
            hasReadAccess={false}
          />
        ),
      },
      {
        path: '/linkedRecord/:recordType/:recordId',
        loader: () => ({ error: true }),
      },
    ]);

    render(<RoutesStub />);

    const text = await screen.findByText('someRecordType/someRecordId');
    expect(text).toBeInTheDocument();
    expect(text.tagName).toBe('SPAN');
    expect(text.closest('a')).toBeNull();
  });

  it('renders record data without link icon when hasReadAccess is false', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <OutputRecordLinkWithPresentation
            linkedRecordId='someRecordId'
            linkedRecordType='someRecordType'
            presentationRecordLinkId='somePresentationRecordLinkId'
            hasReadAccess={false}
          />
        ),
      },
      {
        path: '/linkedRecord/:recordType/:recordId',
        loader: () => ({
          presentation: formDefWithTwoTextVariableWithModeOutput,
          record: {
            record: {
              data: {
                name: 'someRootNameInData',
                children: [{ name: 'someTextVar', value: 'someValue' }],
              },
            },
          },
        }),
      },
    ]);

    render(<RoutesStub />);

    expect(await screen.findByText('someValue')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('is possible to publish a linked binary record', async () => {
    const user = userEvent.setup();

    const publishActionSpy = vi.fn();
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <OutputRecordLinkWithPresentation
            linkedRecordType='binary'
            linkedRecordId='someRecordId'
            presentationRecordLinkId='somePresentationRecordLinkId'
            hasReadAccess={true}
            mode='input'
          />
        ),
      },
      {
        path: '/linkedRecord/binary/:recordId',
        loader: () => ({
          presentation: linkedBinaryPresentation,
          record: {
            record: {
              data: createLinkedBinaryData({ visibility: 'unpublished' }),
            },
          },
          userRights: ['publish'],
        }),
      },
      {
        path: '/:recordType/:recordId/publish',
        action: publishActionSpy,
      },
    ]);

    render(<RoutesStub />);

    await waitFor(() => expect(screen.getByRole('img')).toBeInTheDocument());

    await user.click(
      screen.getByRole('button', { name: 'divaClient_publishBinaryText' }),
    );
    expect(publishActionSpy).toHaveBeenCalled();
  });

  it('is possible to unpublish a linked binary record', async () => {
    const user = userEvent.setup();

    const unpublishActionSpy = vi.fn();
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <OutputRecordLinkWithPresentation
            linkedRecordType='binary'
            linkedRecordId='someRecordId'
            presentationRecordLinkId='somePresentationRecordLinkId'
            hasReadAccess={true}
            mode='input'
          />
        ),
      },
      {
        path: '/linkedRecord/binary/:recordId',
        loader: () => ({
          presentation: linkedBinaryPresentation,
          record: {
            record: {
              data: createLinkedBinaryData({ visibility: 'unpublished' }),
            },
          },
          userRights: ['unpublish'],
        }),
      },
      {
        path: '/:recordType/:recordId/unpublish',
        action: unpublishActionSpy,
      },
    ]);

    render(<RoutesStub />);

    await waitFor(() => expect(screen.getByRole('img')).toBeInTheDocument());

    await user.click(
      screen.getByRole('button', { name: 'divaClient_unpublishBinaryText' }),
    );
    expect(unpublishActionSpy).toHaveBeenCalled();
  });

  it('does not render publish or unpublish button for non-binary linked record', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <OutputRecordLinkWithPresentation
            linkedRecordType='someType'
            linkedRecordId='someRecordId'
            presentationRecordLinkId='somePresentationRecordLinkId'
            hasReadAccess={true}
            mode='input'
          />
        ),
      },
      {
        path: '/linkedRecord/:recordType/:recordId',
        loader: () => ({
          presentation: formDefWithTwoTextVariableWithModeOutput,
          record: {
            record: {
              data: {
                name: 'someRootNameInData',
                children: [{ name: 'someTextVar', value: 'someValue' }],
              },
            },
          },
          userRights: ['publish', 'unpublish'],
        }),
      },
    ]);

    render(<RoutesStub />);

    await waitFor(() =>
      expect(screen.getByText('someValue')).toBeInTheDocument(),
    );

    expect(
      screen.queryByRole('button', { name: 'divaClient_publishBinaryText' }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: 'divaClient_unpublishBinaryText' }),
    ).not.toBeInTheDocument();
  });

  it('does not render publish or unpublish binary button for linked binary record when user has no rights', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <OutputRecordLinkWithPresentation
            linkedRecordType='binary'
            linkedRecordId='someRecordId'
            presentationRecordLinkId='somePresentationRecordLinkId'
            hasReadAccess={true}
            mode='input'
          />
        ),
      },
      {
        path: '/linkedRecord/:recordType/:recordId',
        loader: () => ({
          presentation: linkedBinaryPresentation,
          record: {
            record: {
              data: createLinkedBinaryData({ visibility: 'published' }),
            },
          },
          userRights: [],
        }),
      },
    ]);

    render(<RoutesStub />);

    await waitFor(() => expect(screen.getByRole('img')).toBeInTheDocument());

    expect(
      screen.queryByRole('button', { name: 'divaClient_publishBinaryText' }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: 'divaClient_unpublishBinaryText' }),
    ).not.toBeInTheDocument();
  });

  it('does not show publish button when in output mode', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <OutputRecordLinkWithPresentation
            linkedRecordType='binary'
            linkedRecordId='someRecordId'
            presentationRecordLinkId='somePresentationRecordLinkId'
            hasReadAccess={true}
            mode='output'
          />
        ),
      },
      {
        path: '/linkedRecord/:recordType/:recordId',
        loader: () => ({
          presentation: linkedBinaryPresentation,
          record: {
            record: {
              data: createLinkedBinaryData({ visibility: 'published' }),
            },
          },
          userRights: ['publish'],
        }),
      },
    ]);

    render(<RoutesStub />);

    await waitFor(() => expect(screen.getByRole('img')).toBeInTheDocument());

    expect(
      screen.queryByRole('button', { name: 'divaClient_publishBinaryText' }),
    ).not.toBeInTheDocument();
  });
});

const linkedBinaryPresentation = {
  form: {
    presentationId: 'imageGroupWhenLinkedOutputPGroup',
    type: 'group',
    name: 'binary',
    mode: 'output',
    tooltip: {
      title: 'binaryGroupText',
      body: 'binaryGroupDefText',
    },
    label: 'binaryGroupText',
    showLabel: true,
    attributes: [
      {
        type: 'collectionVariable',
        name: 'type',
        placeholder: 'initialEmptyValueText',
        mode: 'output',
        tooltip: {
          title: 'binaryTypeCollectionVarText',
          body: 'binaryTypeCollectionVarDefText',
        },
        label: 'binaryTypeCollectionVarText',
        showLabel: true,
        options: [
          {
            value: 'document',
            label: 'binaryTypeDocumentItemText',
          },
        ],
      },
    ],
    components: [
      {
        presentationId: 'thumbnailOnlyImageOutputPGroup',
        type: 'group',
        name: 'thumbnail',
        mode: 'output',
        tooltip: {
          title: 'thumbnailGroupText',
          body: 'thumbnailGroupDefText',
        },
        label: 'thumbnailGroupText',
        showLabel: false,
        components: [
          {
            presentationId: 'thumbnailImagePResLink',
            name: 'thumbnail',
            tooltip: {
              title: 'resourceLinkResLinkText',
              body: 'resourceLinkResLinkDefText',
            },
            label: 'resourceLinkResLinkText',
            showLabel: false,
            type: 'resourceLink',
            outputFormat: 'image',
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
          },
        ],
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1,
        },
        childStyle: [],
        gridColSpan: 12,
      },
    ],
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    gridColSpan: 12,
  },
};

const createLinkedBinaryData = ({
  visibility,
}: {
  visibility: 'published' | 'unpublished';
}) => {
  return {
    name: 'binary',
    attributes: { type: 'document' },
    children: [
      {
        name: 'recordInfo',
        children: [{ name: 'visibility', value: visibility }],
      },
      {
        name: 'thumbnail',
        children: [
          {
            name: 'thumbnail',
            children: [
              {
                name: 'linkedRecordType',
                value: 'binary',
              },
              {
                name: 'linkedRecordId',
                value: 'binary:123',
              },
              {
                name: 'mimeType',
                value: 'image/jpeg',
              },
            ],
          },
        ],
      },
    ],
  };
};
