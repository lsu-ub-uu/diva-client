import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { FormComponentRecordLink } from '../../types';
import { RecordLinkWithLinkedPresentation } from '../RecordLinkWithLinkedPresentation';

import { formDefWithTwoTextVariableWithModeOutput } from '@/__mocks__/data/form/textVar';
import { MockFormProvider } from '@/utils/testUtils';
import { createRoutesStub } from 'react-router';

describe('RecordLinkWithLinkedPresentation', () => {
  it('renders linked record presentation', async () => {
    const mockComponent = {
      linkedRecordPresentation: {
        presentedRecordType: 'someType',
        presentationId: 'somePresentationId',
      },
      showLabel: true,
      label: 'someLabel',
      mode: 'input',
      repeat: { repeatMin: 1, repeatMax: 1 },
    } as FormComponentRecordLink;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <MockFormProvider mockValues={{ 'some.name': 'someId' }}>
            <RecordLinkWithLinkedPresentation
              component={mockComponent}
              name='some.name'
            />
          </MockFormProvider>
        ),
      },
      {
        path: 'linkedRecord/:recordType/:recordId',
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

    await waitFor(() =>
      expect(screen.getByText('someValue')).toBeInTheDocument(),
    );
  });

  it('renders clear button when input mode and not repeating', () => {
    const mockComponent = {
      linkedRecordPresentation: {
        presentedRecordType: 'someType',
        presentationId: 'somePresentationId',
      },
      showLabel: true,
      label: 'someLabel',
      mode: 'input',
      repeat: { repeatMin: 1, repeatMax: 1 },
    } as FormComponentRecordLink;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <MockFormProvider mockValues={{ 'some.name': 'someId' }}>
            <RecordLinkWithLinkedPresentation
              component={mockComponent}
              name='some.name'
            />
          </MockFormProvider>
        ),
      },
      {
        path: 'linkedRecord/:recordType/:recordId',
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

    expect(
      screen.getByRole('button', { name: 'divaClient_clearRecordLinkText' }),
    ).toBeInTheDocument();
  });

  it('does not render clear button when not input mode', () => {
    const mockComponent = {
      linkedRecordPresentation: {
        presentedRecordType: 'someType',
        presentationId: 'somePresentationId',
      },
      showLabel: true,
      label: 'someLabel',
      mode: 'output',
      repeat: { repeatMin: 1, repeatMax: 1 },
    } as FormComponentRecordLink;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <MockFormProvider mockValues={{ 'some.name': 'someId' }}>
            <RecordLinkWithLinkedPresentation
              component={mockComponent}
              name='some.name'
            />
          </MockFormProvider>
        ),
      },
      {
        path: 'linkedRecord/:recordType/:recordId',
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

    expect(
      screen.queryByRole('button', { name: 'divaClient_clearRecordLinkText' }),
    ).not.toBeInTheDocument();
  });

  it('does not render clear button when repeating', () => {
    const mockComponent = {
      linkedRecordPresentation: {
        presentedRecordType: 'someType',
        presentationId: 'somePresentationId',
      },
      showLabel: true,
      label: 'someLabel',
      mode: 'input',
      repeat: { repeatMin: 0, repeatMax: 10 },
    } as FormComponentRecordLink;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <MockFormProvider mockValues={{ 'some.name': 'someId' }}>
            <RecordLinkWithLinkedPresentation
              component={mockComponent}
              name='some.name'
            />
          </MockFormProvider>
        ),
      },
      {
        path: 'linkedRecord/:recordType/:recordId',
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

    expect(
      screen.queryByRole('button', { name: 'divaClient_clearRecordLinkText' }),
    ).not.toBeInTheDocument();
  });

  it('renders nothing when no value', () => {
    const mockComponent = {
      linkedRecordPresentation: {
        presentedRecordType: 'someType',
        presentationId: 'somePresentationId',
      },
      showLabel: true,
      label: 'someLabel',
    } as FormComponentRecordLink;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <MockFormProvider mockValues={{ 'some.name': '' }}>
            <RecordLinkWithLinkedPresentation
              component={mockComponent}
              name='some.name'
            />
          </MockFormProvider>
        ),
      },
    ]);
    render(<RoutesStub />);

    expect(screen.queryByText('someLabel')).not.toBeInTheDocument();
  });
});
