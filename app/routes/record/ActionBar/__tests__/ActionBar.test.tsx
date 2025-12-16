import type { BFFDataRecord } from '@/types/record';
import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';
import { ActionBar } from '../ActionBar';

describe('ActionBar', () => {
  it('renders view record link and not update record link when on update page', () => {
    const record = {
      id: '1234',
      recordType: 'diva-person',
      validationType: 'diva-person',
      updated: [],
      userRights: ['read', 'update', 'delete'],
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
        id: 'routes/record/recordView',
        path: '/:recordType/:recordId',
        Component: () => <ActionBar record={record} />,
      },
      {
        id: 'routes/record/recordUpdate',
        path: '/:recordType/:recordId/update',
        Component: () => <ActionBar record={record} />,
      },
    ]);

    render(<RoutesStub initialEntries={['/someRecordType/123/update']} />);

    expect(
      screen.getByRole('link', { name: 'divaClient_viewRecordText' }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: 'divaClient_editRecordText' }),
    ).not.toBeInTheDocument();
  });

  it('renders update record link and not update record link when on view page', () => {
    const record = {
      id: '1234',
      recordType: 'diva-person',
      validationType: 'diva-person',
      updated: [],
      userRights: ['read', 'update', 'delete'],
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
        id: 'routes/record/recordView',
        path: '/:recordType/:recordId',
        Component: () => <ActionBar record={record} />,
      },
      {
        id: 'routes/record/recordUpdate',
        path: '/:recordType/:recordId/update',
        Component: () => <ActionBar record={record} />,
      },
    ]);

    render(<RoutesStub initialEntries={['/someRecordType/123']} />);

    expect(
      screen.getByRole('link', { name: 'divaClient_editRecordText' }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: 'divaClient_viewRecordText' }),
    ).not.toBeInTheDocument();
  });

  it('renders a delete button', async () => {
    const record = {
      id: '1234',
      recordType: 'diva-person',
      validationType: 'diva-person',
      updated: [],
      userRights: ['update', 'delete'],
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
        Component: () => <ActionBar record={record} />,
      },
    ]);

    render(<RoutesStub />);

    expect(
      screen.getByRole('button', { name: 'divaClient_deleteRecordText' }),
    ).toBeInTheDocument();
  });

  it('renders a trash button', () => {
    const record = {
      id: '1234',
      recordType: 'diva-person',
      validationType: 'diva-person',
      updated: [],
      userRights: ['update', 'trash'],
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
        Component: () => <ActionBar record={record} />,
      },
    ]);

    render(<RoutesStub />);

    expect(
      screen.getByRole('button', { name: 'divaClient_trashRecordText' }),
    ).toBeInTheDocument();
  });

  it('renders an untrash button', () => {
    const record = {
      id: '1234',
      recordType: 'diva-person',
      validationType: 'diva-person',
      updated: [],
      userRights: ['update', 'untrash'],
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
        Component: () => <ActionBar record={record} />,
      },
    ]);

    render(<RoutesStub />);

    expect(
      screen.getByRole('button', { name: 'divaClient_untrashButtonText' }),
    ).toBeInTheDocument();
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
        Component: () => <ActionBar record={record} apiUrl='someUrl/1234' />,
      },
    ]);

    render(<RoutesStub />);

    expect(screen.getByText('divaClient_viewInApiText')).toBeInTheDocument();
  });

  it('does not show view record link when user lacks read right', () => {
    const record = {
      id: '1234',
      recordType: 'diva-person',
      validationType: 'diva-person',
      updated: [],
      userRights: ['update', 'delete'],
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
        id: 'routes/record/recordView',
        path: '/:recordType/:recordId',
        Component: () => <ActionBar record={record} />,
      },
      {
        id: 'routes/record/recordUpdate',
        path: '/:recordType/:recordId/update',
        Component: () => <ActionBar record={record} />,
      },
    ]);

    render(<RoutesStub initialEntries={['/someRecordType/123/update']} />);

    expect(
      screen.queryByRole('link', { name: 'divaClient_viewRecordText' }),
    ).not.toBeInTheDocument();
  });

  it('does not show edit record link when user lacks update right', () => {
    const record = {
      id: '1234',
      recordType: 'diva-person',
      validationType: 'diva-person',
      updated: [],
      userRights: ['read', 'delete'],
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
        id: 'routes/record/recordView',
        path: '/:recordType/:recordId',
        Component: () => <ActionBar record={record} />,
      },
      {
        id: 'routes/record/recordUpdate',
        path: '/:recordType/:recordId/update',
        Component: () => <ActionBar record={record} />,
      },
    ]);

    render(<RoutesStub initialEntries={['/someRecordType/123']} />);

    expect(
      screen.queryByRole('link', { name: 'divaClient_editRecordText' }),
    ).not.toBeInTheDocument();
  });

  it('does not show delete button when user lacks delete right', () => {
    const record = {
      id: '1234',
      recordType: 'diva-person',
      validationType: 'diva-person',
      updated: [],
      userRights: ['update'],
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
        Component: () => <ActionBar record={record} />,
      },
    ]);

    render(<RoutesStub />);

    expect(
      screen.queryByRole('button', { name: 'divaClient_deleteRecordText' }),
    ).not.toBeInTheDocument();
  });

  it('does not show trash button when user lacks trash right', () => {
    const record = {
      id: '1234',
      recordType: 'diva-person',
      validationType: 'diva-person',
      updated: [],
      userRights: ['update'],
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
        Component: () => <ActionBar record={record} />,
      },
    ]);

    render(<RoutesStub />);

    expect(
      screen.queryByRole('button', { name: 'divaClient_trashRecordText' }),
    ).not.toBeInTheDocument();
  });

  it('does not show untrash button when user lacks untrash right', () => {
    const record = {
      id: '1234',
      recordType: 'diva-person',
      validationType: 'diva-person',
      updated: [],
      userRights: ['update'],
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
        Component: () => <ActionBar record={record} />,
      },
    ]);

    render(<RoutesStub />);

    expect(
      screen.queryByRole('button', { name: 'divaClient_untrashButtonText' }),
    ).not.toBeInTheDocument();
  });
});
