import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { RecordDetails } from '../RecordDetails';

vi.mock('../../utils/format', () => {
  return {
    formatTimestamp: (timestamp: string) => new Date(timestamp).toISOString(),
  };
});

describe('RecordDetails', () => {
  it('displays record info expanded', async () => {
    const user = userEvent.setup();
    const mockData = {
      recordInfo: {
        createdBy: { __text: { en: 'Created By' }, value: 'user1' },
        tsCreated: {
          __text: { en: 'Created At' },
          value: '2023-01-01T12:00:00Z',
        },
        updated: [
          {
            updatedBy: { __text: { en: 'Updated By' }, value: 'user2' },
            tsUpdated: {
              __text: { en: 'Updated At' },
              value: '2023-02-01T12:00:00Z',
            },
          },
        ],
        visibility: {
          __text: { en: 'Visibility' },
          __valueText: { en: 'Public' },
        },
        tsVisibility: {
          __text: { en: 'Visibility Timestamp' },
          value: '2023-03-01T12:00:00Z',
        },
        permissionUnit: {
          __text: { en: 'Permission Unit' },
          value: 'Member A',
        },
      },
    } as DivaOutputGroup;
    const RoutesStub = createRoutesStub([
      { path: '/', Component: () => <RecordDetails output={mockData} /> },
    ]);
    render(<RoutesStub />);

    await user.click(screen.getByText('divaClient_recordDetailsText'));

    expect(screen.getByText('divaClient_createdText')).toBeVisible();
    expect(screen.getByText('2023-01-01T12:00:00.000Z (user1)')).toBeVisible();

    expect(screen.getByText('divaClient_updatedText')).toBeVisible();
    expect(screen.getByText('2023-02-01T12:00:00.000Z (user2)')).toBeVisible();

    expect(screen.getByText('Visibility')).toBeVisible();
    expect(screen.getByText('Public (2023-03-01T12:00:00.000Z)')).toBeVisible();

    expect(screen.getByText('divaClient_memberText')).toBeVisible();
    expect(screen.getByText('Member A')).toBeVisible();
  });

  it('displays adminInfo', async () => {
    const user = userEvent.setup();
    const mockData = {
      recordInfo: {
        createdBy: { __text: { en: 'Created By' }, value: 'user1' },
        tsCreated: {
          __text: { en: 'Created At' },
          value: '2023-01-01T12:00:00Z',
        },
        updated: [
          {
            updatedBy: { __text: { en: 'Updated By' }, value: 'user2' },
            tsUpdated: {
              __text: { en: 'Updated At' },
              value: '2023-02-01T12:00:00Z',
            },
          },
        ],
        visibility: {
          __text: { en: 'Visibility' },
          __valueText: { en: 'Public' },
        },
        tsVisibility: {
          __text: { en: 'Visibility Timestamp' },
          value: '2023-03-01T12:00:00Z',
        },
      },
      adminInfo: {
        note_type_internal: {
          __text: { en: 'Note' },
          value: 'Some internal note',
        },
        failed: {
          value: 'true',
          __text: { en: 'Failed' },
          __valueText: { en: 'Yes' },
        },
        reviewed: {
          value: 'true',
          __text: { en: 'Reviewed' },
          __valueText: { en: 'You betcha' },
        },
      },
    } as DivaOutputGroup;

    const RoutesStub = createRoutesStub([
      { path: '/', Component: () => <RecordDetails output={mockData} /> },
    ]);
    render(<RoutesStub />);

    await user.click(screen.getByText('divaClient_recordDetailsText'));

    expect(screen.getByText('Note')).toBeVisible();
    expect(screen.getByText('Some internal note')).toBeVisible();

    expect(screen.getByText('Failed')).toBeVisible();
    expect(screen.getByText('Yes')).toBeVisible();

    expect(screen.getByText('Reviewed')).toBeVisible();
    expect(screen.getByText('You betcha')).toBeVisible();
  });

  it('displays attachment details', async () => {
    const user = userEvent.setup();
    const mockData = {
      recordInfo: {
        createdBy: { __text: { en: 'Created By' }, value: 'user1' },
        tsCreated: {
          __text: { en: 'Created At' },
          value: '2023-01-01T12:00:00Z',
        },
        updated: [
          {
            updatedBy: { __text: { en: 'Updated By' }, value: 'user2' },
            tsUpdated: {
              __text: { en: 'Updated At' },
              value: '2023-02-01T12:00:00Z',
            },
          },
        ],
        visibility: {
          __text: { en: 'Visibility' },
          __valueText: { en: 'Public' },
        },
        tsVisibility: {
          __text: { en: 'Visibility Timestamp' },
          value: '2023-03-01T12:00:00Z',
        },
      },
      attachments: {
        note_type_attachment: {
          __text: { en: 'Note' },
          value: 'Some info about the attachment',
        },
        reviewed: {
          value: 'true',
          __text: { en: 'Reviewed' },
          __valueText: { en: 'Yes' },
        },
      },
    } as DivaOutputGroup;

    const RoutesStub = createRoutesStub([
      { path: '/', Component: () => <RecordDetails output={mockData} /> },
    ]);
    render(<RoutesStub />);

    await user.click(screen.getByText('divaClient_recordDetailsText'));

    expect(screen.getByText('Note')).toBeVisible();
    expect(screen.getByText('Some info about the attachment')).toBeVisible();

    expect(screen.getByText('Reviewed')).toBeVisible();
    expect(screen.getByText('Yes')).toBeVisible();
  });
});
