import { describe, expect, it } from 'vitest';
import { ActionBar } from '../ActionBar';
import type { BFFDataRecord } from '@/types/record';
import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';

describe('ActionBar', () => {
  it('renders with a record', () => {
    const record = {
      id: '1234',
      recordType: 'diva-person',
      validationType: 'diva-person',
      updated: [],
      userRights: ['update', 'trash', 'delete'],
      actionLinks: {},
      data: {
        someRootGroup: {
          recordInfo: {
            id: {
              value: '1234',
              required: true,
            },
            type: {
              value: 'diva-person',
              required: true,
            },
            validationType: {
              value: 'diva-person',
              required: true,
            },
            inTrashBin: {
              value: 'false',
              required: true,
            },
            required: true,
          },
        },
      },
    } as BFFDataRecord;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <ActionBar record={record} outputPage={false} />,
      },
    ]);

    render(<RoutesStub />);

    expect(screen.getByText('divaClient_deleteRecordText')).toBeInTheDocument();
    expect(screen.getByText('divaClient_trashRecordText')).toBeInTheDocument();
  });

  it('renders with a record with a api path', () => {
    const record = {
      id: '1234',
      recordType: 'diva-person',
      validationType: 'diva-person',
      updated: [],
      userRights: [],
      actionLinks: {},
      data: {
        someRootGroup: {
          recordInfo: {
            id: {
              value: '1234',
              required: true,
            },
            type: {
              value: 'diva-person',
              required: true,
            },
            validationType: {
              value: 'diva-person',
              required: true,
            },
            inTrashBin: {
              value: 'false',
              required: true,
            },
            required: true,
          },
        },
      },
    } as BFFDataRecord;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <ActionBar record={record} apiUrl='someUrl/1234' outputPage={false} />
        ),
      },
    ]);

    render(<RoutesStub />);

    expect(screen.getByText('divaClient_viewInApiText')).toBeInTheDocument();
  });
});
