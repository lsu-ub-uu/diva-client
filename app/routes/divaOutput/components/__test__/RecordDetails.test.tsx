import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';
import { RecordDetails } from '../RecordDetails';

describe('RecordDetails', () => {
  it('is initially collapsed and can be expanded', async () => {
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
      },
    } as DivaOutputGroup;
    const RoutesStub = createRoutesStub([
      { path: '/', Component: () => <RecordDetails output={mockData} /> },
    ]);
    render(<RoutesStub />);

    expect(screen.queryByText('divaClient_createdText')).not.toBeVisible();
    await user.click(screen.getByText('divaClient_recordDetailsText'));
    expect(screen.getByText('divaClient_createdText')).toBeVisible();
  });

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
    expect(screen.getByText('01/01/2023, 13:00:00 (user1)')).toBeVisible();

    expect(screen.getByText('divaClient_updatedText')).toBeVisible();
    expect(screen.getByText('01/02/2023, 13:00:00 (user2)')).toBeVisible();

    expect(screen.getByText('Visibility')).toBeVisible();
    expect(screen.getByText('Public (01/03/2023, 13:00:00)')).toBeVisible();

    expect(screen.getByText('divaClient_memberText')).toBeVisible();
    expect(screen.getByText('Member A')).toBeVisible();
  });
});
